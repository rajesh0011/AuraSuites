import { NextResponse } from "next/server";
import axios from "axios";
import crypto from 'crypto';

export async function POST(req) {
  const { selectedPropertyId } = await req.json();
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
    const apiKey = process.env.NEXT_PUBLIC_API_KEY_GETDATA;
    if (!apiKey) {
      return new NextResponse(JSON.stringify({ error: "Missing API Key" }), {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
        },
      });
    }
    const response = await fetch(`https://csbe-api.staah.net/?RequestType=info&PropertyId=${selectedPropertyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });
    const result = await response.json();
    return new NextResponse(JSON.stringify(result.PropertyList || []), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Or your specific frontend domain
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
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
      },
    });
  }
}

// Explicitly handle OPTIONS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://brijhotels.cinuniverse.com", // Or your frontend domain
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
      "Access-Control-Max-Age": "86400",
    },
  });
}

