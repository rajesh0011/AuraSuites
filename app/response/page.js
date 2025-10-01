"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CryptoJS from 'crypto-js';
import "./response-style.css";

export default function PaymentResponse() {
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);

  // Partner key (should be stored securely, preferably in environment variables)
  const PARTNER_KEY = process.env.NEXT_PUBLIC_API_KEY_PARTNERKEY;

  // Hex to binary conversion with better error handling
  const hexToBin = (hexString) => {
    if (!hexString) {
      throw new Error('Empty hex string provided');
    }
    if (hexString.length % 2 !== 0) {
      throw new Error('Hex string length must be even');
    }
    try {
      return CryptoJS.enc.Hex.parse(hexString);
    } catch (e) {
      throw new Error(`Hex parsing failed: ${e.message}`);
    }
  };

  // Improved decryption function
  const decrypt = (encryptedText, key) => {
    try {
      if (!encryptedText || !key) {
        throw new Error('Missing required parameters for decryption');
      }
      
      const keyHash = CryptoJS.MD5(key).toString();
      const keyBinary = hexToBin(keyHash);
      const iv = CryptoJS.lib.WordArray.create([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
      const encryptedBytes = hexToBin(encryptedText);

      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: encryptedBytes },
        keyBinary,
        { 
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      );

      const result = decrypted.toString(CryptoJS.enc.Utf8);
      if (!result) {
        throw new Error('Decryption returned empty result - check encryption key');
      }
      return result;
    } catch (e) {
      throw new Error(`Decryption failed: ${e.message}`);
    }
  };

  // Enhanced hash decryption and parsing
  const decryptHash = (partnerId, partnerKey, data) => {
    try {
      if (!partnerId || !partnerKey || !data) {
        throw new Error('Missing required parameters for hash decryption');
      }

      const decryptedData = decrypt(data, partnerKey);
      if (!decryptedData) {
        throw new Error('Decryption returned no data');
      }

      const array = decryptedData.split('||');
      const returnObj = {};

      array.forEach(value => {
        if (value && value.includes('=')) {
          const [key, val] = value.split('=', 2);
          if (key && val) {
            returnObj[key.trim()] = val.trim();
          }
        }
      });

      if (Object.keys(returnObj).length === 0) {
        throw new Error('No valid data found after decryption');
      }

      return returnObj;
    } catch (e) {
      throw new Error(`Hash decryption failed: ${e.message}`);
    }
  };

  // Process the payment response with better error handling
  const processPaymentResponse = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Check if we're in the browser environment
      if (typeof window === 'undefined') {
        throw new Error('This component must run in the browser');
      }

      // Get the response data from URL params
      const params = new URLSearchParams(window.location.search);
      const paramValues = params.get('paramvalues');

      if (!paramValues) {
        throw new Error('No payment data received in URL parameters');
      }

      // Try to parse the JSON data
      let responseData;
      try {
        responseData = JSON.parse(decodeURIComponent(paramValues));
      } catch (parseError) {
        throw new Error(`Failed to parse payment data: ${parseError.message}`);
      }

      // Verify required fields exist
      const requiredFields = ['partner_id', 'hash_key', 'reservation_id', 'status'];
      const missingFields = requiredFields.filter(field => !responseData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Decrypt and verify the hash key
      const decryptedData = decryptHash(
        responseData.partner_id, 
        PARTNER_KEY, 
        responseData.hash_key?.trim() || ''
      );
      

      // Validate that decrypted data matches response data
      if (decryptedData.reservation_id !== responseData.reservation_id) {
        throw new Error('Reservation ID verification failed');
      }

      if (parseFloat(decryptedData.amount) !== parseFloat(responseData.amount)) {
        throw new Error('Amount verification failed');
      }

      // Prepare transaction details
      const details = {
        partner_id: responseData.partner_id,
        property_id: responseData.property_id || 'N/A',
        reservation_id: responseData.reservation_id,
        pg_transaction_id: responseData.pg_transaction_id || 'N/A',
        status_code: responseData.status_code || 'N/A',
        status: responseData.status.toLowerCase(),
        error_msg: responseData.error_msg || '',
        amount: parseFloat(responseData.amount) || 0,
        currency: responseData.currency || 'INR',
        ipn_flag: responseData.ipn_flag || 0,
        timestamp: new Date().toISOString()
      };

      setTransactionDetails(details);
      setIsProcessing(false);

      // Store in session storage
      sessionStorage.setItem('payment_response', JSON.stringify(details));

    } catch (err) {
      
      console.error('Payment processing error:', err);
      setError(err.message);
      setIsProcessing(false);
      
      // Log the error to your error tracking service if available
      // logErrorToService(err);
    }
  };

  // Prevent back navigation to payment gateway
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, null, window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, null, window.location.href);
      };
      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, []);

  // Process payment when component mounts
  useEffect(() => {
    processPaymentResponse();
  }, []);

  if (isProcessing) {
    return (
      <div className='payment-processing'>
        <div className="container">
          <h1>Processing Payment...</h1>
          <p>Please wait while we verify your payment details.</p>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='payment-error'>
        <div className="container">
          <h1>Payment Processing Error</h1>
          <div className="error-message">
            <p>{error}</p>
            <p>Please contact our support team with your reservation details.</p>
          </div>
          <div className="action-buttons">
            <Link href="/" className="btn btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!transactionDetails) {
    return (
      <div className="payment-invalid-request">
        <div className="container">
          <h1>Invalid Request</h1>
          <div className="error-message">
            <p>No payment data received or incorrect request method.</p>
            <p>Please complete your payment through the proper channels.</p>
          </div>
          <div className="action-buttons">
            <Link href="/" className="btn btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusClass = transactionDetails.status.toLowerCase();

  return (
    <div className={`payment-response-container ${statusClass}`}>
      <div className="container">
        <h1>Payment Receipt</h1>
        
        {statusClass === 'success' && (
          <div className="status-banner success">
            <h2>Payment Successful!</h2>
            <p>Your booking is now confirmed. A receipt has been sent to your email.</p>
          </div>
        )}

        {statusClass === 'fail' && (
          <div className="status-banner fail">
            <h2>Payment Failed</h2>
            <p>We could not process your payment. Please try again or contact support.</p>
          </div>
        )}

        {statusClass === 'pending' && (
          <div className="status-banner pending">
            <h2>Payment Processing</h2>
            <p>Your payment is being processed. We will notify you when completed.</p>
          </div>
        )}

        <div className="transaction-details">
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className={`detail-value status-${statusClass}`}>
              {transactionDetails.status.charAt(0).toUpperCase() + transactionDetails.status.slice(1)}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Reservation ID:</span>
            <span className="detail-value">{transactionDetails.reservation_id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Transaction ID:</span>
            <span className="detail-value">{transactionDetails.pg_transaction_id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Amount:</span>
            <span className="detail-value">
              {transactionDetails.amount.toFixed(2)} {transactionDetails.currency}
            </span>
          </div>
          {transactionDetails.error_msg && (
            <div className="detail-row">
              <span className="detail-label">Message:</span>
              <span className="detail-value">{transactionDetails.error_msg}</span>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <Link href="/" className="btn btn-primary">
            Return to Home
          </Link>
          {statusClass === 'success' && (
            <Link href={`/bookings/${transactionDetails.reservation_id}`} className="btn btn-secondary">
              View Booking Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}