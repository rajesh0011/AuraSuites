import CryptoJS from 'crypto-js';
import md5 from 'md5';

export async function POST(req) {
    try {
        const { totalPrice } = await req.json(); // Get totalPrice from the request

        // Function to generate a unique reservation ID
        const generateReservationId = () => {
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2, 8);
            return `${timestamp}-${randomString}`;
        };

        // Function to encrypt data into a hash
        const encryptHash = (partnerKey, data) => {
            let text = '';

            Object.keys(data).forEach(key => {
                text += `${key}=${data[key]}||`;
            });

            text = text.slice(0, -2); // Remove trailing "||"
            return encrypt(text, partnerKey);
        };

        // AES encryption using CryptoJS
        const encrypt = (plainText, key) => {
            const keyHex = CryptoJS.enc.Hex.parse(md5(key));
            const iv = CryptoJS.lib.WordArray.create([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f], 16);
            
            const encrypted = CryptoJS.AES.encrypt(plainText, keyHex, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
        };

        // Payment request data
        const requestData = {
            property_id: "1703",
            property_name: "RMS Property",
            property_tel: "123456",
            partner_id: 5,
            pg_name: "AIRPAY",
            pg_id: 10,
            cust_name: "Rajesh",
            cust_email: "rajesh@gmail.com",
            cust_phone: "0212345678",
            cust_address: "456 Elm Street",
            cust_city: "Wellington",
            cust_state: "Wellington",
            cust_country: "New Zealand",
            cust_postalcode: "6011",
            reservation_id: generateReservationId(),
            amount: totalPrice,
            currency: "INR",
            return_url: "https://sdsfoundation.com/webdemo/clarks-hotel/response.php",
            commision_amount: "1"
        };

        // Partner key (should be stored in an environment variable)
        const partnerKey = process.env.PARTNER_KEY || "WHMqhDEyVhDemo21fx";

        // Generate hash key
        requestData.hash_key = encryptHash(partnerKey, requestData);

        // Send request to the payment gateway
        const response = await fetch("https://securepay.staah.net/checkout_thirdparty.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        const responseData = await response.text(); // Handle response from the gateway

        return Response.json({ success: true, data: responseData });

    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
