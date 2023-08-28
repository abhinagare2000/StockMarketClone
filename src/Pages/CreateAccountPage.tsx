import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../PagesCss/LoginPageCss.css";

const CreateAccountPage: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const createtAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Password and Confirm Password do not match!");
        return;
      }

      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        // 'error' is now of type 'Error'
        setError(error.message);
      }
    }
  };

  return (
    <div className="login-form">
      <h1>Create Account</h1>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Your Email Address"
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
      <input
        placeholder="Re-enter Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        className="inp"
      />
      <button className="btn" onClick={createtAccount}>
        Create Account
      </button>
      <Link to="/" className="my-link">
        Already have account? Log In Here
      </Link>
    </div>
  );
};

export default CreateAccountPage;
