import React, { useState } from "react";
import "./Login.css"; 

const Login = ({ setPhoneNumber }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState("");

  const validatePhone = (phone) => {
    const phoneRegex = /^09\d{9}$/;
    return phoneRegex.test(phone);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!isCodeSent) {
      if (!validatePhone(phone)) {
        setError("شماره تماس نامعتبر است");
        return;
      }
      setIsCodeSent(true);
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otpCode);
      console.log("کد تایید: " + otpCode);
    } else {
      if (otp === generatedOtp) {
        setPhoneNumber(phone); 
      } else {
        setError("کد تایید نامعتبر است");
      }
    }
  };

  return (
    <div className="login-container">
      {!isCodeSent ? (
        <form onSubmit={onSubmit}>
          <h2>ورود یا ثبت نام</h2>
          <p>برای دریافت مشاوره شماره تماس خود را ارد کنید.</p>
          <label>شماره تماس:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">دریافت کد تایید</button>
        </form>
      ) : (
        <form onSubmit={onSubmit}>
          <p>کد تایید به شماره {phone} ارسال شده است</p>
          <label>کد تایید</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">تایید کد</button>
        </form>
      )}
    </div>
  );
};

export default Login;