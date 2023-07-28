import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [err, setErr] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErr("");

    if (!password) return setErr("Password shoundn't be empty");
    if (password !== confirmPass) return setErr("Passwords must match");

    // call backend to update password
  };
  return (
    <form className="authForm" onSubmit={handleFormSubmit}>
      <h1>Update Password</h1>
      {err && (
        <Alert key="danger" variant="danger">
          {err}
        </Alert>
      )}
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
      <Button type="submit">Update Password</Button>
    </form>
  );
};

export default UpdatePassword;
