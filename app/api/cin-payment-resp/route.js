
export async function POST(req) {
  try {
    const formData = await req.formData();
    const paramvalues = formData.get("paramvalues");

    if (!paramvalues) {
      return new Response("Missing paramvalues", { status: 400 });
    }

    const html = `
      <html>
        <body onload="document.forms[0].submit()">
          <form method="POST" action="https://securepay.staah.net/checkout_thirdparty.php">
            <input type="hidden" name="paramvalues" value='${paramvalues}' />
          </form>
        </body>
      </html>
    `;

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (err) {
    console.error("Server error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
