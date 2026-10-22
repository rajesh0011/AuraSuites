import FAQClient from "./FaqClient";

export const metadata = {
  title:
    "FAQs | Aura Suites Dar es Salaam – Hotel Amenities, Services & Stay Information",
  description:
    "Find answers to common questions about Aura Suites. Learn about suites, amenities, airport transfers, dining, facilities, and services for a comfortable stay in Dar es Salaam.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  return (
    <>
      <FAQClient></FAQClient>
    </>
  );
}
