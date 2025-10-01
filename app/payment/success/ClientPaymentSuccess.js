"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateToken } from "../../../utilities/tokenService";

export default function ClientPaymentSuccess() {
  const [responseObject, setResponseObject] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedData = sessionStorage.getItem("paymentResponse");
    if (storedData) {
        const parsed = JSON.parse(storedData);
        // Convert partner_id to string explicitly
        parsed.partner_id = String(parsed.partner_id);

      setResponseObject(parsed);
    } else {
      router.replace("/payment/failed"); // fallback
    }
  }, []);
  const handleReturnHome = async () => {
    if (!responseObject) return;
    setLoading(true);
    const token = await generateToken();

    try {
      const res = await fetch("https://staahbe.cinuniverse.com/PaymentResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(responseObject),
      });

      if (res.ok) {
        router.push("/");
      } else {
        alert("Failed to save payment. Please try again.");
      }
    } catch (err) {
      console.error("Error posting to API:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!responseObject) return <p className="text-center p-10">Loading...</p>;

   return (
     <div className="text-center p-10">
       <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
       <pre className="mt-4 text-left inline-block bg-gray-100 p-4 rounded text-sm">
         <p>Reservation ID: {responseObject.reservation_id}</p>
         <p>Amount Paid: {responseObject.amount}</p>
       </pre>
    
       <button
         onClick={handleReturnHome}
         disabled={loading}
         className="mt-6 btn btn-primary"
       >
         {loading ? "Saving..." : "Return to Home"}
       </button>
     </div>
   );
}
