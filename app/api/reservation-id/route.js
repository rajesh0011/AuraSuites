
import { NextResponse } from "next/server";
import crypto from 'crypto';

export async function POST(req) {
  const { selectedPropertyId } = await req.json();
  const timestamp = req.headers.get('x-timestamp');
  const signature = req.headers.get('x-signature');
  const secret = process.env.BOOKING_API_SECRET_KEY;

  if (!signature || !timestamp || !selectedPropertyId) {
    return NextResponse.json({ error: "Invalid token received" }, { status: 400 });
  }
  // Prevent replay attacks (optional: allow 5 mins clock skew)
  const now = Date.now();
  if (Math.abs(now - parseInt(timestamp)) > 1 * 60 * 1000) {
    return NextResponse.json({ error: "Invalid token received" }, { status: 403 });
  }
  // Recreate signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(selectedPropertyId) + timestamp)
    .digest('hex');

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid token received-Signature" }, { status: 401 });
  }

  try {

    // Generate Token
    const tokenResponse = await fetch(process.env.TOKEN_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserId: process.env.TOKEN_USER_ID,
        Password: process.env.TOKEN_PASSWORD,
      }),
    });

    const tokenText = await tokenResponse.text();
    const tokenData = JSON.parse(tokenText);
    const token = tokenData.result?.[0]?.tokenKey;

    if (!token) {
      return NextResponse.json({ error: "Invalid token received" }, { status: 500 });
    }

    // Reservation API Call
    const reservationResponse = await fetch(process.env.RESERVATION_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const reservationText = await reservationResponse.text();

    if (!reservationResponse.ok) {
      return NextResponse.json({ error: "Reservation ID validation failed", response: reservationText },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*", // Or your specific frontend domain
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
          },
        });
    }

    const reservationData = JSON.parse(reservationText);
    const confirmedId = reservationData.result?.[0]?.reservation_id;
    return NextResponse.json({ reservation_id: confirmedId }, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Or your specific frontend domain
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Server Error", details: error.message },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // Or your specific frontend domain
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
        },
      }
    );
  }
}
// Explicitly handle OPTIONS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*", // Or your frontend domain
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
      "Access-Control-Max-Age": "86400",
    },
  });
}