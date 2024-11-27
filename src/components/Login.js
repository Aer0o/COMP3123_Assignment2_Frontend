import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/employees");
    } catch (error) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
      </form>

      <div className="mt-4">
        <p>Don't have an account?</p>
        <button
          onClick={() => navigate("/signup")}
          className="btn btn-secondary"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Login;