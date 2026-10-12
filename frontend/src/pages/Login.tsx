import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../App.css";
import Navbar from "../components/Navbar";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setLoading(true);
    }

    return (
        <>
            <Navbar />
            <div className="login-container">
                <div className="login-card">

                    <h1>Login</h1>

                    <p>Sign in to access the Ticket System</p>

                    <form onSubmit={handleLogin} className="login-form">

                        <div className="form-group">
                            <label htmlFor="username">Username</label>

                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <p className="login-error" role="alert">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="nav-button login-button"
                            disabled={loading}
                            onClick={() => navigate("/get-ticket")}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>

                    <Link to="/" className="back-link">
                        ← Back to Home
                    </Link>

                </div>
            </div>
        </>
    );
}

export default Login;