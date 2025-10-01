"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { createSignature } from '../../../utilities/signature';

const ConfirmStep = ({ onClose, goNext, status }) => {
  const [responseObject, setResponseObject] = useState(null);
  const [reservationStatus, setReservationStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingResp, setLoadingResp] = useState(false);
  const [isNodata, setNodata] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage?.getItem("paymentResponse");
    if (storedData.length == 0) {
      setNodata(true);
      return;
    }
    try {
      const parsed = JSON.parse(storedData);
      parsed.partner_id = String(parsed.partner_id);
      if (parsed.status === "error") {
        parsed.currency = "INR";
        parsed.amount = "0.0";
        parsed.pg_transaction_id = "00";
      }
      setResponseObject(parsed);

    } catch (err) {
      console.error("Invalid JSON:", err);
    } finally {
      sessionStorage.removeItem("paymentResponse");
    }
  }, []);

  useEffect(() => {
    if (responseObject?.status === "success" || responseObject?.status === "paylater") {
      handleConfirm();
    }
  }, [responseObject]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const timestamp = Date.now().toString();
      const secret = "ABDEFGHJKLMOPQRSTUVWXYZ123456789";
      const signature = await createSignature(JSON.stringify(responseObject), timestamp, secret);
      //alert(signature);
      const res = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-timestamp': timestamp,
          'x-signature': signature,
        },
        body: JSON.stringify(responseObject),
      });

      const data = await res.json();
      //alert(`ResponseData ${JSON.stringify(data)}`);
      setReservationStatus(data.errorMessage);
    } catch (err) {
      //alert(err);
      console.error("Client error:", err);
      toast.error("An error occurred.");
    } finally {
      setTimeout(() => {
        //  goNext();
        //  onClose();
        setLoading(false);
        status(null);
      }, 5000);
    }
  };
  return (
    <>
      {isNodata ? (
        <>
          <i className="fa fa-times-circle text-red-600 text-4xl" aria-hidden="true"></i>
          <h3 className="text-2xl font-bold text-red-600 mt-4">Payment Failed</h3>
          <p className="mt-2 text-gray-700">Something went wrong.</p>
        </>
      ) : (
        <div>
          {!isNodata && responseObject?.status === "success" ? (
            <div className="booking-confirmed text-center p-10">
              {reservationStatus === null ? (
                <p className="text-center mt-4 text-blue-600 font-medium">
                  Payment successful! Confirming your room booking...
                </p>
              ) : reservationStatus === "success" ? (
                <>
                  <Image
                    src="/images/verified.gif"
                    height={100}
                    width={100}
                    alt="confirmation"
                    className="confirm-gif mx-auto"
                  />
                  <h3 className="text-2xl font-bold mt-4 text-green-700">Booking Confirmed</h3>
                  <p className="text-center mt-2">
                    Awesome! Your rooms are booked!
                    <br />
                    We've sent you a confirmation email with all the details.
                    <br />
                    <strong>Reservation ID:</strong> {responseObject?.reservation_id}
                  </p>
                </>
              ) : (
                <>
                  <i className="fa fa-times-circle text-red-600 text-4xl" aria-hidden="true"></i>
                  <h3 className="text-2xl font-bold text-red-600 mt-4">Booking Failed</h3>
                  <p className="mt-2 text-gray-700">We couldn't confirm your booking. Please try again or contact support.</p>
                </>
              )}

              <button
                onClick={() => {
                  onClose();
                  goNext();
                  status(responseObject?.status);
                }}
                disabled={loading}
                className="mt-6 btn btn-primary"
              >
                {loading ? "Saving..." : "Close"}
              </button>
            </div>
          ) : (!isNodata && responseObject?.status === "paylater" ? (
            <div className="booking-confirmed text-center p-10">
              {reservationStatus === null ? (
                <p className="text-center mt-4 text-blue-600 font-medium">
                  Payment successful2! Confirming your room booking...
                </p>
              ) : reservationStatus === "success" ? (
                <>
                  <Image
                    src="/images/verified.gif"
                    height={100}
                    width={100}
                    alt="confirmation"
                    className="confirm-gif mx-auto"
                  />
                  <h3 className="text-2xl font-bold mt-4 text-green-700">Booking Confirmed</h3>
                  <p className="text-center mt-2">
                    Awesome! Your rooms are booked!
                    <br />
                    We've sent you a confirmation email with all the details.
                    <br />
                    <strong>Reservation ID:</strong> {responseObject?.reservation_id}
                  </p>
                </>
              ) : (
                <>
                  <i className="fa fa-times-circle text-red-600 text-4xl" aria-hidden="true"></i>
                  <h3 className="text-2xl font-bold text-red-600 mt-4">Booking Failed</h3>
                  <p className="mt-2 text-gray-700">We couldn't confirm your booking. Please try again or contact support.</p>
                </>
              )}
            </div>
          ) : (
            <div className="booking-confirmed text-center p-10">
              {!isNodata ? (<div className="text-center p-10">
                <i className="fa fa-times-circle text-red-600 text-4xl" aria-hidden="true"></i>
                <h1 className="text-3xl font-bold text-red-600 mt-4">Payment Failed</h1>
                <p className="mt-2">
                  Something went wrong during the payment. Please try again or contact support.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    goNext();
                    status(responseObject?.error_msg);
                  }}
                  disabled={loading}
                  className="mt-6 btn btn-primary"
                >
                  {loading ? "Saving..." : "Close"}
                </button>
              </div>) : (
                <div className="text-center p-10">
                  <i className="fa fa-times-circle text-red-600 text-4xl" aria-hidden="true"></i>
                  <h1 className="text-3xl font-bold text-red-600 mt-4">Step Jumped</h1>
                  <p className="mt-2">
                    Please fill your details at Details Step first and then proceed to Payment.
                  </p>

                  <button
                    onClick={() => {
                      onClose();
                      goNext();
                      status(responseObject?.error_msg);
                    }}
                    disabled={loading}
                    className="mt-6 btn btn-primary"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </>
  );
};

export default ConfirmStep;