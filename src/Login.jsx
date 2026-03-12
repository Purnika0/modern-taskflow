import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import "./Login.css";

export default function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
        setError("Enter a valid email address.");
        return;
        }

        if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
        }

        setLoading(true);

        setTimeout(() => {

        if (rememberMe) {
            localStorage.setItem("USER_EMAIL", email);
        }

        setLoading(false);
        onLogin(email);

        }, 1000);
    };

    return (
        <div className="login-container">

        <div className="login-card">

            <header className="login-header">

            <div className="brand-icon">
                <ShieldCheck size={32} />
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
                Sign in to TaskFlow
            </h1>

            
            </header>

            <form onSubmit={handleLogin}>

            <div className="input-group">

                <label className="field-label">
                Email
                </label>

                <input
                type="email"
                className="text-input"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                }}
                required
                />

            </div>

            <div className="input-group">

                <label className="field-label">
                Password
                </label>

                <input
                type="password"
                className="text-input"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                }}
                required
                />

                <div className="footer-links">

                <label className="checkbox-group">

                    <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    />

                    <span className="text-xs text-slate-500">
                    Remember me
                    </span>

                </label>

                <button
                    type="button"
                    className="link-text"
                >
                    Forgot password
                </button>

                </div>

            </div>

            {error && (
                <p className="text-red-500 text-xs font-medium mb-4">
                {error}
                </p>
            )}

            <button
                type="submit"
                className="auth-button flex items-center justify-center gap-2"
                disabled={loading}
            >

                {loading ? (
                <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in
                </>
                ) : (
                "Sign in"
                )}

            </button>

            </form>

        </div>

        </div>
    );
}