import React from "react";
import "./Header.css";

const Header = ({ phoneNumber }) => {
  return (
    <header className="header">
      <div className="header-container">
        <img src="./src/assets/public/logo1.png" alt="Logo" className="logo" />
        <nav>
          <ul className="nav-links">
            <li>کشورهای مهاجرت تحصیلی</li>
            <li>خدمات</li>
            <li>درباره ما</li>
            <li>تماس با ما</li>
            <li>بلاگ</li>
          </ul>
        </nav>
        {phoneNumber ? (
          <div className="phone-number-display">{phoneNumber}</div> 
        ) : (
          <button className="login-button">ورود / ثبت‌نام</button>
        )}
      </div>
    </header>
  );
};

export default Header;