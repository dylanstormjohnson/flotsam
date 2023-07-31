import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import { setAuthenticatedUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import AuthService from "../utils/auth";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [err, setErr] = useState("");

  const [addUser, { error, loading }] = useMutation(ADD_USER);
  const dispatch = useDispatch();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErr("");

    if (!firstName || !lastName || !email || !password)
      return setErr("No field should be empty");
    if (password !== confirmPass) return setErr("Paswords must match");

    // call backend to register
    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await addUser({
        variables: { email, password, firstName, lastName },
      });

      // call redux set auth func
      dispatch(setAuthenticatedUser(data.addUser.user));
      AuthService.login(data.addUser.token);
    } catch (err) {
      setErr(err.message);
      console.error(err);
    }
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
      {loading ? (
        <Button type="submit" disabled={true}>
          Loading...
        </Button>
      ) : (
        <Button type="submit">Submit</Button>
      )}
    </form>
  );
};

export default Register;
