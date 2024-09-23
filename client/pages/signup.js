import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const [mobile, setMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

  const handleSendOtp = async () => {
    // Send OTP to the mobile number
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/send-otp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      }
    );

    if (response.ok) {
      setIsOtpSent(true);
      alert("OTP sent to your mobile number");
    } else {
      alert("Failed to send OTP");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Verify OTP and signup the user
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, firstName, lastName, otp }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <button type="button" onClick={handleSendOtp}>
            Send OTP
          </button>
        </div>
        {isOtpSent && (
          <div>
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
