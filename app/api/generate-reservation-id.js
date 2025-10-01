// app/api/generate-reservation-id.js

function generateNumericReservationId() {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { selectedPropertyId } = req.body;
    if (!selectedPropertyId) {
        return res.status(400).json({ error: "Missing selectedPropertyId" });
    }

    const reservationId = generateNumericReservationId();

    try {
        // 1. Generate token from /GenerateToken endpoint
        const tokenResponse = await fetch(process.env.TOKEN_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                UserId: process.env.TOKEN_USER_ID,
                Password: process.env.TOKEN_PASSWORD,
            }),
        });

        if (!tokenResponse.ok) {
            return res.status(500).json({ error: "Token generation failed" });
        }

        const tokenData = await tokenResponse.json();
        const token = tokenData.result?.[0]?.tokenKey;

        if (!token) {
            return res.status(500).json({ error: "Invalid token received" });
        }

        // 2. Call GenerateReservationId using the token
        const reservationResponse = await fetch(
            process.env.RESERVATION_API_URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    property_id: selectedPropertyId,
                    reservation_id: reservationId,
                }),
            }
        );

        if (!reservationResponse.ok) {
            return res.status(500).json({ error: "Reservation ID validation failed" });
        }

        const reservationData = await reservationResponse.json();
        const confirmedId = reservationData.result?.[0]?.reservation_id || reservationId;

        res.status(200).json({ reservation_id: confirmedId });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}
