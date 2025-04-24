import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import userIcon from '../assets/user-icon.png';
import lockIcon from '../assets/lock-icon.png';
import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag"


// Update eye icon imports to match your files
import eyeOpenIcon from '../assets/eye-open.png';
import eyeClosedIcon from '../assets/eye-closed.png';
import styles from './Login.module.css';

const Login = () => {
    const { t, i18n } = useTranslation('translations');
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const lang = i18n.language;

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
            const response = await login(email, password, rememberMe);
            if (response.success) {
                navigate('/dashboard');
            } else {
                setError(response.error);
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const onLanguageChange = async (langCode) => {
        await i18n.changeLanguage(langCode);
        localStorage.setItem('language', langCode);
        document.documentElement.lang = langCode;
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <img src={logo} alt="NU Logo" className={styles.logo} />

               

                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{t('Welcome')}</h1>
                    <p className={styles.subtitle}>{t('Login info')}</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={`${styles.inputGroup} ${error ? styles.inputError : ''}`}>
                        <label className={styles.inputLabel}>{t('Email')}</label>
                        <div className={styles.inputWrapper}>
                            <img src={userIcon} alt="" className={styles.icon} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.styledInput}
                                placeholder={t("Email input")}
                                required
                            />
                        </div>
                    </div>

                    <div className={`${styles.inputGroup} ${error ? styles.inputError : ''}`}>
                        <label className={styles.inputLabel}>{t('Password')}</label>
                        <div className={styles.inputWrapper}>
                            <img src={lockIcon} alt="" className={styles.icon} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.styledInput}
                                placeholder={t("Password input")}
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
                            {t('Remember me')}
                        </label>
                        <a href="/forgot-password" className={styles.forgotPassword}>
                            {t('Forgot password')}
                        </a>
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : t('Login button')}
                    </button>
                </form>
                <div className={styles.languageSelect}>
                    <div className={styles.languageOptions}>
                        <button 
                            className={`${styles.languageButton} ${lang === 'ru' ? styles.active : ''}`}
                            onClick={() => onLanguageChange('ru')}
                        >
                            <ReactCountryFlag countryCode="RU" svg />
                            <span>Русский</span>
                        </button>
                        <button 
                            className={`${styles.languageButton} ${lang === 'en' ? styles.active : ''}`}
                            onClick={() => onLanguageChange('en')}
                        >
                            <ReactCountryFlag countryCode="US" svg />
                            <span>English</span>
                        </button>
                        <button 
                            className={`${styles.languageButton} ${lang === 'kz' ? styles.active : ''}`}
                            onClick={() => onLanguageChange('kz')}
                        >
                            <ReactCountryFlag countryCode="KZ" svg />
                            <span>Қазақша</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;