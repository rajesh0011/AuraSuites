
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
  try {
    const formData = await req.formData();
    const paramvalues = formData.get("paramvalues");
    const paramvaluesJson = JSON.parse(paramvalues);
    paramvaluesJson.partner_id = 5,
      paramvaluesJson.pg_name = "AIRPAY",
      paramvaluesJson.pg_id = 10,
      paramvaluesJson.currency = "INR";
    paramvaluesJson.commision_amount = "1";
    paramvaluesJson.return_url = "https://clarksdemo.cinuniverse.com/api/payment/th-response";

    const hashKey = encryptHash(
      process.env.NEXT_PUBLIC_API_KEY_PARTNERKEY,
      paramvaluesJson
    );

    paramvaluesJson.hash_key = hashKey;
    const finalParams = JSON.stringify(paramvaluesJson, null, 2)
    if (!paramvalues) {
      return new Response("Missing paramvalues", { status: 400 });
    }

    const html = `
      <html>
        <body onload="document.forms[0].submit()">
          <form method="POST" action="https://securepay.staah.net/checkout_thirdparty.php">
            <input type="hidden" name="paramvalues" value='${finalParams}' />
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
