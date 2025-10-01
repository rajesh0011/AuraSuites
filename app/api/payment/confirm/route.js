import { NextResponse } from "next/server";
import crypto from 'crypto';
const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*", // Replace with your frontend domain in production
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
};

export async function POST(req) {
    //const result = {};
    try {
        const responseObject = await req.json();
        if (!responseObject) {
            return NextResponse.json({ message: "Missing data" }, { status: 400, headers: CORS_HEADERS });
        }
        const timestamp = req.headers.get('x-timestamp');
        const signature = req.headers.get('x-signature');
        // const allowedOrigin = 'https://www.yourhotelsite.com';
        // if (req.headers.origin !== allowedOrigin && req.headers.referer?.indexOf(allowedOrigin) === -1) {
        //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        // }
        const secret = process.env.BOOKING_API_SECRET_KEY;


        if (!signature || !timestamp || !responseObject) {
            return NextResponse.json({ error: "Invalid token received-ALL" }, { status: 400, headers: CORS_HEADERS });
        }
        // Prevent replay attacks (optional: allow 5 mins clock skew)
        const now = Date.now();
        if (Math.abs(now - parseInt(timestamp)) > 1 * 60 * 1000) {
            return NextResponse.json({ error: "Invalid token received-timestamp" }, { status: 403, headers: CORS_HEADERS });
        }
        // Recreate signature
        const jsonString = JSON.stringify(responseObject);

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(JSON.stringify(jsonString) + timestamp)
            .digest('hex');

        if (expectedSignature !== signature) {
            return NextResponse.json({ error: expectedSignature }, { status: 401, headers: CORS_HEADERS });
        }
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
            console.error("Invalid token received");
            return NextResponse.json({ error: "Invalid token received" }, { status: 500, headers: CORS_HEADERS });
        }

        // Post payment response
        const paymentRes = await fetch(`${process.env.STAAHBE_API_URL}/PaymentResponse`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(responseObject),
        });

        const paymentData = await paymentRes.json();
        if (!paymentRes.ok || (responseObject.status !== "success" && responseObject.status !== "paylater")) {

            return NextResponse.json({ message: "Payment failed", detail: paymentData }, { status: 500, headers: CORS_HEADERS });
        }
        const reservationJson = JSON.parse(paymentData?.result[0]?.reservationJson);
        const reservationRes = await fetch("https://csbe-api.staah.net/?RequestType=reservation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": process.env.NEXT_PUBLIC_API_KEY_POSTDATA,
            },
            body: JSON.stringify(reservationJson),
        });
        const reservationResult = await reservationRes.json();

        if (reservationResult.data === "Booking Post Successfully.") {
            const confirmObj = {
                reservation_id: paymentData.result[0].reservation_id,
                ReservationStatus: "success",
            };

            const confirmRes = await fetch(`${process.env.STAAHBE_API_URL}/ReservationResponse`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(confirmObj),
            });

            const confirmData = await confirmRes.json();


            return NextResponse.json(confirmData, { status: 200, headers: CORS_HEADERS });
        }

        return NextResponse.json({ message: "Booking failed else", status: "failed", detail: reservationResult }, { status: 501, headers: CORS_HEADERS });

    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ message: "Internal server error Catch", status: "failed", error: error.message }, { status: 500, headers: CORS_HEADERS });
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
