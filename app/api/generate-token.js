// app/api/generate-token.js

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const response = await fetch(process.env.TOKEN_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                UserId: process.env.TOKEN_USER_ID,
                Password: process.env.TOKEN_PASSWORD,
            }),
        });

        if (!response.ok) {
            return res.status(500).json({ error: "Failed to fetch token" });
        }

        const data = await response.json();
        const token = data.result?.[0]?.tokenKey;

        if (!token) {
            return res.status(500).json({ error: "Token not found in response" });
        }

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}
