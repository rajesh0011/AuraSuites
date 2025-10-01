"use client";
//import ConfirmStep from "./app/Booking_engine/PaymentGateway/ConfirmStep";
import dynamic from "next/dynamic";
import ConfirmStep from "../../Booking_engine/PaymentGateway/ConfirmStep";

// Dynamic import with ssr: false is allowed in client components
// const ClientPaymentSuccess = dynamic(() => import("./ClientPaymentSuccess"), {
//   ssr: false,
// });

export default function ClientWrapper() {
  //return <ClientPaymentSuccess />;
  return <ConfirmStep />;
}
