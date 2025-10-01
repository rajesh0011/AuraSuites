
import { NextResponse } from "next/server";
import crypto from 'crypto';
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // Replace with your frontend domain in production
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-signature, x-timestamp",
};

export async function POST(req) {
  //const { GuidIdTokenKey } = await req.json();
  const { respTokenKey } = await req.json();
  //const body = await req.json();
  //const GuidIdTokenKey = body.GuidIdTokenKey;
  const timestamp = req.headers.get('x-timestamp');
  const signature = req.headers.get('x-signature');
  //const secret = process.env.BOOKING_API_SECRET_KEY;
  const secret = "ABDEFGHJKLMOPQRSTUVWXYZ123456789";
  const body = { GuidIdTokenKey: respTokenKey }
  if (!signature || !timestamp || !respTokenKey) {
    return NextResponse.json({ error: "Invalid token received" }, { status: 400, headers: CORS_HEADERS });
  }
  // Prevent replay attacks (optional: allow 5 mins clock skew)
  const now = Date.now();
  if (Math.abs(now - parseInt(timestamp)) > 1 * 60 * 1000) {
    return NextResponse.json({ error: "Timestamp skew too large" }, { status: 403, headers: CORS_HEADERS });
  }

  const str = JSON.stringify(respTokenKey);
  // Recreate signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(str) + timestamp)
    .digest('hex');

  if (expectedSignature !== signature) {
    return NextResponse.json({
      error: "Invalid Signature received not equals",
      timestamp: timestamp, bodyData: respTokenKey, expectedSignature: expectedSignature, signatureFilterBar: signature
    },
      { status: 401, headers: CORS_HEADERS });
  }

  // if (expectedSignature == signature) {
  //   return NextResponse.json({
  //     error: "Invalid Signature received equals",
  //     bodyData: respTokenKey, expectedSignature: expectedSignature, signatureFilterBar: signature
  //   },
  //     { status: 401, headers: CORS_HEADERS });
  // }
  try {

    // Reservation API Call
    const reservationResponse = await fetch(process.env.VERIFY_GUID_TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });

    const paymentData = await reservationResponse.json();

    if (!reservationResponse.ok) {
      return NextResponse.json({ message: "Token verification failed", detail: paymentData },
        { status: 500, headers: CORS_HEADERS }
      );
    }
    const responseJson = JSON.parse(paymentData?.result[0]?.responseJson);
    return NextResponse.json(responseJson,
      { status: 200, headers: CORS_HEADERS }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Server Error", details: error.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
// Explicitly handle OPTIONS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...CORS_HEADERS,
      "Access-Control-Max-Age": "86400",
    },
  });
}