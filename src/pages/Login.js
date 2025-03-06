import React, { useState } from "react";  // ✅ Import useState
import "./Login.css";
import logo from "../assets/logo.png";
import UserIcon from "../assets/user-icon.png";
import EyeIcon from "../assets/eye-icon.png";
import LockIcon from "../assets/lock-icon.png";



const Login = () => {
    const [email, setEmail] = useState("");         // ✅ State for email
    const [password, setPassword] = useState("");   // ✅ State for password
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });

    // ✅ Form Validation
    const validateForm = () => {
        let newErrors = { email: "", password: "" };
        let isValid = true;

        // Email validation (simple check for @ and .)
        if (!email.includes("@") || !email.includes(".")) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }

        // Password validation (at least 8 characters)
        if (password.length < 8) {
            newErrors.password = "Must be at least 8 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // ✅ Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Login successful!"); // Replace with real login logic
        }
    };

    return (
        <div className="login-container">
            <div className="title-with-logo">
                <img src={logo} alt="Logo" className="logo" />
                <div className="title-container">
                    <h1 className="title">Welcome to HR portal of Nazarbayev University!</h1>
                    <p className="subtitle">Please enter your e-mail and password to log in</p>
                </div>
            </div>

            {/* ✅ Wrap Inputs in Form */}
            <form onSubmit={handleSubmit} className="actions-container">
                <div className="extra-tab">
                    {/* Email Field */}
                    <div className="input-group">
                        <label htmlFor="email" className="input-label">E-mail</label>
                        <div className="input-wrapper">
                            <img src={UserIcon} alt="User Icon" className="input-icon user-icon" />
                            <input
                                type="email"
                                id="email"
                                placeholder="alex.matthew@nu.edu.kz"
                                value={email}  // ✅ Controlled Input
                                onChange={(e) => setEmail(e.target.value)}  // ✅ Update State
                                className="styled-input"
                            />
                        </div>
                        {errors.email && <p className="input-error">{errors.email}</p>}  {/* ✅ Show Error */}
                    </div>

                    {/* Password Field */}
                    <div className="input-group">
                        <label htmlFor="password" className="input-label">Password</label>
                        <div className="input-wrapper">
                            <img src={LockIcon} alt="Lock Icon" className="input-icon lock-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                value={password}  // ✅ Controlled Input
                                onChange={(e) => setPassword(e.target.value)}  // ✅ Update State
                                className="styled-input"
                            />
                            
                            <img 
                                src={EyeIcon} 
                                alt="Eye Icon" 
                                className="input-icon eye-icon" 
                                onClick={() => setShowPassword(!showPassword)}
                            />

                        </div>
                        {errors.password && <p className="input-error">{errors.password}</p>}  {/* ✅ Show Error */}
                    </div>
                </div>

                {/* Remember Me + Forgot Password */}
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <a href="#">Forgot password?</a>
                </div>

                {/* ✅ Submit Button (Inside Form) */}
                <button type="submit" className="submit-button">Sign-in</button>
            </form>
        </div>
    );
};

export default Login;
