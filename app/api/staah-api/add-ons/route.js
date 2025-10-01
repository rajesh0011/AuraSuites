import { NextResponse } from "next/server";
import axios from "axios";
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { selectedPropertyId } = await req.json();
    const timestamp = req.headers.get('x-timestamp');
    const signature = req.headers.get('x-signature');
    const secret = process.env.BOOKING_API_SECRET_KEY;

    // const allowedOrigin = 'https://www.yourhotelsite.com';
    // const origin = req.headers.get('origin');
    // if (origin !== allowedOrigin) {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }
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
    const url = `https://csbe-api.staah.net/?RequestType=bedata&PropertyId=${parseInt(selectedPropertyId)}&Product=yes`;


    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY_GETRATE,
      },
    });

    const data = await response.json();

    return new NextResponse(JSON.stringify(data?.PropertyList || []), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Or your specific frontend domain
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
      },
    });
    // return new NextResponse(JSON.stringify(data?.PropertyList || []), {
    //   status: 200,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*", // Or your specific frontend domain
    //     "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    //     "Access-Control-Allow-Headers": "Content-Type, Authorization",
    //   },
    // });
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
      "Access-Control-Allow-Origin": "*", // Or your frontend domain
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
      "Access-Control-Max-Age": "86400",
    },
  });
}