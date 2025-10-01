"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import crypto from 'crypto';

const About = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hash,setHash] = useState('abcd');
  const encrypt = (plainText, key) => {
    const hashedKey = crypto.createHash('md5').update(key).digest();
    const initVector = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
    
    const cipher = crypto.createCipheriv('aes-128-cbc', hashedKey, initVector);
    let encryptedText = cipher.update(plainText, 'utf8', 'hex');
    encryptedText += cipher.final('hex');
    
    return encryptedText;
};

const encryptHash = (partnerId, partnerKey, data) => {
    let text = Object.entries(data).map(([key, value]) => `${key}=${value}`).join('||');
    return encrypt(text, partnerKey);
    
};
//----------------------------------------------
  const generateHashKey = () => {
    const demoData = {
      description: "charge 120rs for booking",
      property_name: "clarksdemo",
      property_id: "1703",
      property_tel: "",
      partner_id: "5",
      pg_id: "10",
      cust_name: "ayaz",
      cust_email: "ayaz@staah.com",
      cust_phone: "7405343728",
      cust_address: "marwella business",
      cust_city: "surat",
      cust_state: "gujarat",
      cust_country: "india",
      cust_postalcode: "395009",
      reservation_id: "166176146140622",
      amount: "1200",
      currency: "INR",
      commission_amount: "120",
      request_type: ""
  };
    let text = demoData;
      let secret_key = '';
      let partner_key = '';
      const hashcount = encryptHash(partner_key,secret_key,text);
      setHash(hashcount);
      return hashcount;
  };

  const generateReservationId = () => {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  };

  useEffect(() => {
    // Check if we're on the return URL
    if (window.location.pathname === '/about') {
      const form = document.createElement('form');
      form.name = 'pghub';
      form.method = 'POST';
      form.action = '/your-return-url'; // Replace with your actual return URL

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'paramvalues';
      input.value = JSON.stringify(window.location.search); // Or your response JSON

      form.appendChild(input);
      document.body.appendChild(form);
      
      // Auto submit the form
      form.submit();
    }
  }, []);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const requestPayload = {
        property_id: "1703",
        property_name: "Test Property",
        partner_id: 5,
        pg_name: "AIRPAY",
        pg_id: 10,
        reservation_id: generateReservationId().toString(),
        amount: 10,
        currency: "INR",
        return_url: "/about",
        commision_amount: "12",
        hash_key: generateHashKey(),
      };


      const form = document.createElement("form");
      form.name = "pghub";
      form.method = "POST";
      form.action = "https://securepay.staah.net/checkout_thirdparty.php";

      const paramValuesInput = document.createElement("input");
      paramValuesInput.type = "hidden";
      paramValuesInput.name = "paramvalues";
      paramValuesInput.value = JSON.stringify(requestPayload);
      form.appendChild(paramValuesInput);

      // window.addEventListener('message', function(event) {
      //   if (event.origin === 'https://securepay.staah.net') {
      //   }
      // });

      document.body.appendChild(form);
      form.submit();
      
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-details primary-details">
      <h4 className="mb-3">MAKE PAYMENT</h4>
      <p className="mb-3">
        You will be redirected to a secure payment page to complete your transaction.
      </p>

      <div className="book-a-stay">
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={handlePayment}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "Redirecting..." : "Pay Now"}
        </button>
      </div>

      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
          <p className="loader-text">
            Please wait. Do not refresh or close your browser until we process your request.
          </p>
        </div>
      )}
    </div>
  );
};

export default About;