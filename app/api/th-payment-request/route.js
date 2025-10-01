
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import md5 from "md5";
import crypto from 'crypto';

const encryptHash = (partnerKey, data) => {
  let text = "";
  Object.keys(data).forEach((key) => {
    text += `${key}=${data[key]}||`;
  });
  text = text.slice(0, -2);
  return encrypt(text, partnerKey);
};

const encrypt = (plainText, key) => {
  const keyHex = CryptoJS.enc.Hex.parse(md5(key));
  const iv = CryptoJS.lib.WordArray.create(
    [
      0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
      0x0c, 0x0d, 0x0e, 0x0f,
    ],
    16
  );
  return CryptoJS.AES.encrypt(plainText, keyHex, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).ciphertext.toString(CryptoJS.enc.Hex);
};


export async function POST(req) {
  const { finalRequestData2 } = await req.json();
  const timestamp = req.headers.get('x-timestamp');
  const signature = req.headers.get('x-signature');
  // const allowedOrigin = 'https://www.yourhotelsite.com';
  // if (req.headers.origin !== allowedOrigin && req.headers.referer?.indexOf(allowedOrigin) === -1) {
  //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // }
  const secret = process.env.BOOKING_API_SECRET_KEY;


  if (!signature || !timestamp || !finalRequestData2) {
    return NextResponse.json({ error: "Invalid token received-ALL" }, { status: 400 });
  }
  // Prevent replay attacks (optional: allow 5 mins clock skew)
  const now = Date.now();
  if (Math.abs(now - parseInt(timestamp)) > 1 * 60 * 1000) {
    return NextResponse.json({ error: "Invalid token received-timestamp" }, { status: 403 });
  }
  // Recreate signature
  const jsonString = JSON.stringify(finalRequestData2.ReservationJson);

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(jsonString) + timestamp)
    .digest('hex');

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid token received-signature" }, { status: 401 });
  }
  finalRequestData2.partner_id = 5,
    finalRequestData2.pg_name = "AIRPAY",
    finalRequestData2.pg_id = 10,
    finalRequestData2.return_url = "https://clarksdemo.cinuniverse.com/api/payment/th-response"
  finalRequestData2.commision_amount = "1"
  finalRequestData2.currency = "INR"

  const hashKey = encryptHash(
    process.env.NEXT_PUBLIC_API_KEY_PARTNERKEY,
    finalRequestData2
  );
  finalRequestData2.hash_key = hashKey

  const jsonStr = finalRequestData2.ReservationJson;
  const ReservationJsonData = JSON.parse(jsonStr);
  ReservationJsonData.apikey = process.env.NEXT_PUBLIC_API_KEY_GETDATA;
  ReservationJsonData.action = "reservation_info";

  finalRequestData2.ReservationJson = JSON.stringify(ReservationJsonData);

  try {
    // 1. Generate token
    const tokenResponse = await fetch(process.env.TOKEN_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserId: process.env.TOKEN_USER_ID,
        Password: process.env.TOKEN_PASSWORD,
      }),
    });

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: "Token generation failed" }, { status: 500 });
    }
    const tokenData = await tokenResponse.json();
    const token = tokenData.result?.[0]?.tokenKey;

    if (!token) {
      return NextResponse.json({ error: "Invalid token received" }, { status: 500 });
    }

    // 2. Call PaymentRequest API
    const paymentResponse = await fetch(process.env.PAYMENTREQUEST_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(finalRequestData2),
    });

    if (!paymentResponse.ok) {
      return NextResponse.json({ error: "Payment request failed" }, { status: 500 });
    }

    const paymentResult = await paymentResponse.json();

    return new Response(JSON.stringify(paymentResult), {
      status: paymentResponse.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
      },
    });

  } catch (error) {

    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
        "Access-Control-Max-Age": "86400",
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