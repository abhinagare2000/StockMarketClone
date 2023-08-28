import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../PagesCss/LoginPageCss.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/Home");
    } catch (error) {
      if (error instanceof Error)
        setError(error.message);
    }
  };

  return (
    <div className="body">
      <div className="login-form">
        <h1 className="login-title">Login Form</h1>
        {error && <p>{error}</p>}
        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="inp"
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="inp"
        />
        <button className="btn" onClick={logIn}>
          Log In
        </button>
        <Link to="/createAccount" className="my-link">
          Don't have account? Create Account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
