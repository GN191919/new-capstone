import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import userIcon from '../assets/user-icon.png';
import lockIcon from '../assets/lock-icon.png';
// Remove unused import
// import eyeIcon from '../assets/eye-icon.png';

// Update eye icon imports to match your files
import eyeOpenIcon from '../assets/eye-open.png';
import eyeClosedIcon from '../assets/eye-closed.png';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password, rememberMe);
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <img src={logo} alt="NU Logo" className={styles.logo} />
                
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Welcome to HR portal of Nazarbayev University!</h1>
                    <p className={styles.subtitle}>Please enter your e-mail and password to log in</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>E-mail</label>
                        <div className={styles.inputWrapper}>
                            <img src={userIcon} alt="" className={styles.icon} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.styledInput}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Password</label>
                        <div className={styles.inputWrapper}>
                            <img src={lockIcon} alt="" className={styles.icon} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.styledInput}
                                placeholder="Enter your password"
                                required
                            />
                            <img
                                src={showPassword ? eyeClosedIcon : eyeOpenIcon}
                                alt="Toggle password visibility"
                                className={styles.eyeIcon}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.rememberForgot}>
                        <label className={styles.rememberMe}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className={styles.checkbox}
                            />
                            Remember me
                        </label>
                        <a href="/forgot-password" className={styles.forgotPassword}>
                            Forgot password?
                        </a>
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;