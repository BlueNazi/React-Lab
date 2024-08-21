import React, { useState } from "react";
import './assets/style.css';
import Input from "./components/common/input";
import useInput from "./customHooks/useInput";

function App() {
  
  const email = useInput("");
  const password = useInput("");
  

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    

    const emailRegex = /\S+@\S+\.\S+/;
    const newErrors = { email: "", password: "" };

    if (!emailRegex.test(email.value)) {
      newErrors.email = "Please enter a valid email address.";
    }
    
    if (password.value.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
    } else {
  
      console.log("Form submitted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <Input        
            placeholder="Email"
            type="email"
            value={email.value}
            onChange={email.onChange}
            className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
          <Input
            placeholder="Password"
            type="password"
            value={password.value}
            onChange={password.onChange}
            className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
