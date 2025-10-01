// app/api/staah-api/reservation/route.js

export async function POST(req) {
  try {
    const payload = await req.json();

    const response = await fetch("https://csbe-api.staah.net/?RequestType=reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_API_KEY_POSTDATA,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
        "Access-Control-Max-Age": "86400",
      },
    });
  }
}

// Handle preflight OPTIONS request
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-signature, x-timestamp",
      "Access-Control-Max-Age": "86400",
    },
  });
}
