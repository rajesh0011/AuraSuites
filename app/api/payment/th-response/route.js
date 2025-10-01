export async function POST(req) {
  let queryParams = ""; // declare it at the top

  try {
    const formData = await req.formData();
    const paramvalues = formData.get("paramvalues");
    const responseJson = JSON.parse(paramvalues);
    const GuidIdString = {
      GuidIdString: JSON.stringify(responseJson)
    };

    // Call your internal/external API here
    const apiResponse = await fetch("https://staahbe.cinuniverse.com/GetGuidToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(GuidIdString), // MUST stringify the JSON body
    });

    if (!apiResponse.ok) {
      // fallback query params in case of error
      queryParams = new URLSearchParams({
        status: "failed",
        reason: "apiError"
      }).toString();
    } else {
      const result = await apiResponse.json();

      queryParams = new URLSearchParams({
        tokenKey: result?.result?.[0]?.tokenKey || "",
        status: "success",
        result: result
      }).toString();
    }
  } catch (error) {
    console.error("Error processing response:", error);

    // fallback query params in case of catch
    queryParams = new URLSearchParams({
      status: "failed",
      reason: "exception"
    }).toString();
  }

  const html = `
    <html>
      <head>
        <script>
          window.location.href = 'https://brijhotels.cinuniverse.com?${queryParams}';
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
}
