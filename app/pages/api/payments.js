// PaymentGateway.js (Create this new file and paste the code below)
import 'server-only'
import React from 'react';
import CryptoJS from 'crypto-js';
import md5 from 'md5';

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

    text = text.slice(0, -2);
    const encrypted = encrypt(text, partnerKey);
    return encrypted;
};

// AES encryption using CryptoJS
const encrypt = (plainText, key) => {
    const keyHex = CryptoJS.enc.Hex.parse(md5(key));
    const iv = CryptoJS.lib.WordArray.create([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f], 16);

    const encrypted = CryptoJS.AES.encrypt(plainText, keyHex, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
};

const PaymentGateway = () => {
    const handlePayment = () => {
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
            amount: "10",
            currency: "INR",
            return_url: "https://sdsfoundation.com/webdemo/clarks-hotel/response.php",
            commision_amount: "1"
        };

        const partnerKey = "process.env.NEXT_PUBLIC_API_KEY_PARTNERKEY";
        const hashKey = encryptHash(partnerKey, requestData);
        requestData.hash_key = hashKey;
        const requestJson = JSON.stringify(requestData);

        const form = document.createElement('form');
        form.method = 'post';
        form.action = 'https://securepay.staah.net/checkout_thirdparty.php';

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'paramvalues';
        input.value = requestJson;

        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    };

    return { handlePayment };
};

export default PaymentGateway;