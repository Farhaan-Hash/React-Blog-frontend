import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Create an Account  with Firebase

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Password and Confirm Password do not match");
      }
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Create Account</h1>
      {error && <p className="error">{error}</p>}
      <label>
        Email:{" "}
        <input
          type="text"
          placeholder="enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>password: </label>
      <input
        type="password"
        placeholder="enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={createAccount}>Create Account</button>
      {""} <br></br>
      <br></br>
      <Link to="/login">Already have an account? Login In here</Link>
    </>
  );
};

export default CreateAccountPage;
