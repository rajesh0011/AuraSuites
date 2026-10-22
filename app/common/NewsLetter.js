"use client";

import { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [tnc, setTnc] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      setIsSuccess(false);
      return;
    }

    if (!tnc) {
      setMessage("Please agree to the privacy policy.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://www.aurasuites.co.tz/Api/common/SubscribeNow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            tnc: true,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("🎉 Successfully subscribed!");
        setIsSuccess(true);
        setEmail("");
        setTnc(false);
      } else {
        setMessage(data?.message || "Subscription failed.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newslater mt-3">
      <h5>Join our newsletter</h5>

      <div className="input-btn">
        <input
          type="email"
          placeholder="Enter your email..."
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      <label className="agree mt-1">
        <input
          type="checkbox"
          className="checkbox-1"
          checked={tnc}
          onChange={(e) => setTnc(e.target.checked)}
        />
        &nbsp; I agree to the{" "}
        <a
          className="text-primary"
          href="/aura-suites-privacy-policy.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>
        .
      </label>

      {message && (
        <p
          className={`mt-2 text-sm ${
            isSuccess ? "text-success" : "text-danger"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsLetter;
