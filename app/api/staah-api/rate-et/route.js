// app/api/staah-api/rate-et/route.js
import { NextResponse } from "next/server";
import crypto from 'crypto';

export async function POST(req) {
  const { selectedPropertyId, fromDate, toDate } = await req.json();
  const timestamp = req.headers.get('x-timestamp');
  const signature = req.headers.get('x-signature');
  const secret = process.env.BOOKING_API_SECRET_KEY;

  if (!signature || !timestamp || !selectedPropertyId) {
    return NextResponse.json({ error: "Invalid token received-ALL" }, { status: 400 });
  }
  // Prevent replay attacks (optional: allow 5 mins clock skew)
  const now = Date.now();
  if (Math.abs(now - parseInt(timestamp)) > 1 * 60 * 1000) {
    return NextResponse.json({ error: "Invalid token received-timestamp" }, { status: 403 });
  }
  const str = JSON.stringify(selectedPropertyId)
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(str) + timestamp)
    .digest('hex');

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid token received-signature" }, { status: 401 });
  }
  try {

    const url = `https://csbe-api.staah.net/?RequestType=BeRate&PropertyId=${selectedPropertyId}&FromDate=${fromDate}&ToDate=${toDate}&Product=no`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY_GETRATEET,
      },
    });

    const data = await response.json();

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
      },
    });
  } catch (error) {
    console.error("Error in rate API:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

// Explicitly handle OPTIONS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
      "Access-Control-Max-Age": "86400",
    },
  });
}

