import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [err, setErr] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErr("");

    if (!firstName || !lastName || !email || !password)
      return setErr("No field should be empty");
    if (password !== confirmPass) return setErr("Paswords must match");

    const data = { firstName, lastName, email, password };
    console.log(data);
    // call backend to register
  };
  return (
    <form className="authForm" onSubmit={handleFormSubmit}>
      <h1>Sign Up</h1>
      {err && (
        <Alert key="danger" variant="danger">
          {err}
        </Alert>
      )}

      <Form.Control
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value.trim())}
      />
      <Form.Control
        placeholder="Last Name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value.trim())}
      />

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
      <Form.Control
        placeholder="Re-Enter Password"
        type="password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />
      <Button type="submit" disabled={true}>
        Loading...
      </Button>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Register;
