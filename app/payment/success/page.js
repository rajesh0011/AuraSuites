"use client"; // ✅ This must be first

export const dynamic = "force-dynamic"; // ✅ Then this

import ClientWrapper from "./ClientWrapper";

export default function PaymentSuccessPage() {
  return <ClientWrapper />;
}
