"use client";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "Where is Aura Suites located in Dar es Salaam?",
    answer:
      "Aura Suites is located in the Upanga area of Dar es Salaam, offering convenient access to business districts, shopping areas, and major attractions. It is also within a comfortable driving distance from Julius Nyerere International Airport, making it a great option for travelers arriving or departing from the city.",
  },
  {
    id: 2,
    question: "Does Aura Suites provide airport transfer services?",
    answer:
      "Yes, Aura Suites offers airport transfer services for guests traveling to or from Julius Nyerere International Airport. This service ensures a smooth and hassle-free arrival or departure experience, especially for international travelers and business guests.",
  },
  {
    id: 3,
    question: "What types of rooms or suites are available at Aura Suites ?",
    answer: {
      text: "Aura Suites provides luxury serviced suites designed for comfort and extended stays. Guests can choose from :",
      points: [
        "One-Bedroom Deluxe Suites.",
        "Two-Bedroom Club Suites.",
        "Three-Bedroom Platinum Suites.",
      ],
      lastText:
        "Each suite features modern interiors, spacious living areas, fully equipped kitchens, high-speed Wi-Fi, and stylish furnishings that create a home-like yet luxurious environment.",
    },
  },
  {
    id: 4,
    question: "What dining options are available at Aura Suites ?",
    answer:
      "Guests can dine at Kinaya Restaurant, the rooftop restaurant located inside Aura Suites, offering Indian, African, and international cuisine along with scenic city skyline views.",
  },
  {
    id: 5,
    question: "What amenities does Aura Suites offer to guests ?",
    answer: {
      text: "Aura Suites offers a wide range of amenities designed to enhance comfort and relaxation, including :",
      points: [
        "Outdoor swimming pool.",
        "Fully equipped fitness center and gym.",
        "Jogging track.",
        "Kids’ play area.",
        "Secure parking and 24/7 security.",
        "High-speed Wi-Fi throughout the property.",
      ],
      lastText:
        "These facilities make it ideal for both business and leisure travelers.",
    },
  },
  {
    id: 6,
    question: "Is Aura Suites suitable for business travelers ?",
    answer:
      "Yes, Aura Suites is well suited for business travelers. The hotel provides meeting and event spaces, high-speed internet, and easy access to Dar es Salaam’s commercial areas. The spacious suites also provide a comfortable environment for working or hosting small meetings.",
  },
  {
    id: 7,
    question: "Are the suites at Aura Suites suitable for families?",
    answer:
      "Absolutely. Aura Suites offers large multi-bedroom suites, making it an excellent choice for families traveling together. The hotel also includes a kids’ play area and spacious living areas, ensuring comfort and convenience for family stays.",
  },
  {
    id: 8,
    question:
      "What makes Aura Suites different from other hotels in Dar es Salaam ?",
    answer:
      "Aura Suites stands out because it combines the luxury of a hotel with the comfort of serviced apartments. Guests enjoy spacious suites, elegant interiors, premium amenities, rooftop dining, and attentive hospitality — making it ideal for both short visits and long stays.",
  },
  {
    id: 9,
    question: "Does Aura Suites have recreational facilities ?",
    answer:
      "Yes, guests can enjoy various recreational facilities such as a swimming pool, fitness center, and jogging track. These amenities allow travelers to relax and stay active during their stay.",
  },
  {
    id: 10,
    question: "Is Aura Suites a good choice for long stays in Dar es Salaam ?",
    answer:
      "Yes. With fully furnished suites, kitchen facilities, spacious interiors, and comprehensive amenities, Aura Suites is ideal for extended stays, corporate travelers, and families visiting Dar es Salaam.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(1);
  return (
    <section className="container py-5">
      <h4 className="text-center mb-4">Frequently Asked Questions</h4>

      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={faq.id}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faq${faq.id}`}
                onClick={() => setActive(faq.id)}
                style={{
                  outline: "none",
                  boxShadow: "none",
                  backgroundColor: active === faq.id ? "#f5f5f5" : "#ffffff",
                  color: active === faq.id ? "#000" : "#333",
                }}
              >
                {index + 1}. {faq.question}
              </button>
            </h2>

            <div
              id={`faq${faq.id}`}
              className={`accordion-collapse collapse ${
                index === 0 ? "show" : ""
              }`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-start">
                {typeof faq.answer === "string" ? (
                  faq.answer
                ) : (
                  <>
                    <p>{faq?.answer?.text}</p>
                    <ul style={{ listStyleType: "disc", paddingLeft: "30px", }}>
                      {faq?.answer?.points?.map((point, i) => (
                        <li key={i} className="my-2">{point}</li>
                      ))}
                    </ul>
                    <p>{faq?.answer?.lastText}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
