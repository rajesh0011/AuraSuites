
import 'server-only'
import crypto from 'crypto';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { paramvalues } = req.body;

        try {
            const responseData = JSON.parse(paramvalues);

            const partnerKey = "process.env.NEXT_PUBLIC_API_KEY_PARTNERKEY";

            // Decrypt the hash key to verify the response
            const decryptedData = decryptHash(responseData['partner_id'], partnerKey, responseData['hash_key'].trim());

            // Process the response data
            const {
                partner_id: partnerId,
                property_id: propertyId,
                reservation_id: reservationId,
                pg_transaction_id: pgTransactionId,
                status_code: statusCode,
                status,
                error_msg: errorMsg,
                amount,
                currency,
                ipn_flag: ipnFlag
            } = responseData;

            // Additional logic based on the transaction status
            let statusMessage = '';
            if (status === 'success') {
                statusMessage = 'Transaction was successful!';
            } else if (status === 'fail') {
                statusMessage = `Transaction failed: ${errorMsg}`;
            } else if (status === 'pending') {
                statusMessage = 'Transaction is pending.';
            }

            // Send response
            res.status(200).json({
                decryptedData,
                partnerId,
                propertyId,
                reservationId,
                pgTransactionId,
                statusCode,
                status,
                errorMsg,
                amount,
                currency,
                ipnFlag,
                statusMessage
            });
        } catch (error) {
            res.status(400).json({ error: 'Error decoding JSON response.' });
        }
    } else {
        res.status(405).json({ error: 'No response data received.' });
    }
}

function decryptHash(partnerId, partnerKey, data) {
    const decryptData = decrypt(data, partnerKey);
    const array = decryptData.split('||');
    const returnArray = {};

    array.forEach(value => {
        const [indexKey, indexValue] = value.split("=");
        returnArray[indexKey] = indexValue;
    });

    return returnArray;
}

function decrypt(encryptedText, key) {
    const keyBuffer = Buffer.from(md5(key), 'hex');
    const initVector = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);

    const encryptedTextBuffer = Buffer.from(encryptedText, 'hex');

    const decipher = crypto.createDecipheriv('aes-128-cbc', keyBuffer, initVector);
    let decrypted = decipher.update(encryptedTextBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

function md5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}