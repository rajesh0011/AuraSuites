

export async function POST(req) {
  try {
    const formData = await req.formData();
    const paramvalues = formData.get("paramvalues");
    const responseJson = JSON.parse(paramvalues);

    const html = `
      <html>
        <head>
          <script>
            sessionStorage.setItem('paymentResponse', JSON.stringify(${JSON.stringify(
              responseJson
            )}));
            window.location.href = '/';
          </script>
        </head>
        <body>Redirecting...</body>
      </html>
    `;

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("Error processing response:", error);

    return new Response(`
      <html>
        <head><title>Payment Failed</title></head>
        <body style="text-align: center; padding: 50px;">
          <h1 style="color: red; font-size: 24px;">Payment Failed At Route Catch</h1>
        </body>
      </html>
    `, {
      status: 500,
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
}
