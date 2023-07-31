import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticatedUser } from "../redux/slices/userSlice";
import AuthService from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const [loginUser, { error, loading }] = useMutation(LOGIN_USER);
  const dispatch = useDispatch();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErr("");

    if (!email || !password) return setErr("No field should be empty");

    // call backend to login
    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await loginUser({
        variables: { email, password },
      });

      // call redux set auth func
      dispatch(setAuthenticatedUser(data.loginUser.user));
      AuthService.login(data.loginUser.token);
    } catch (err) {
      setErr(err.message);
      console.log(err.message);
    }
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

export default Login;
