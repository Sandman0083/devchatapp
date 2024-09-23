import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [mobile, setMobile] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verify OTP and log the user in
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
