import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErr("");

    if (!email || !password) return setErr("No field should be empty");

    console.log(email, password);
    // call backend to login
  };
  return (
    <form className="authForm" onSubmit={handleFormSubmit}>
      <h1>Sign In</h1>
      {err && (
        <Alert key="danger" variant="danger">
          {err}
        </Alert>
      )}
      <Form.Control
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
      />
      <Form.Control
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Login;
