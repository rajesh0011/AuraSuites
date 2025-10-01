
"use client";
import React, { useState } from "react";
import WizardSidebar from "../../Booking_engine/PaymentGateway/WizardForm";
//import { WizardSidebar } from "../../WizardSidebar";


export default function PaymentFailed() {
  const [isWizardVisible, setIsWizardVisible] = useState(false);
    return (
        <>
        <section>
          <div className="text-center p-10">
            <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
            <p>There was a problem with your payment. Please try again.</p>
          </div>
        </section>
        {/* <WizardSidebar isVisible={true}  /> */}
        </>
    );
}