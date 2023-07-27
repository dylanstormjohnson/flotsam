import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import { Navigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

import Page from "../components/Page";
import AuthService from "../utils/auth";
import Button from "react-bootstrap/Button";

const headContent = (
  <>
    <title>Change Me! - Sign Up</title>
    <meta
      name="description"
      content="Sign Up page for Project-3 Starter Code."
    />
  </>
);

export default function SignUp() {
  const [addUser, { error, data, loading }] = useMutation(ADD_USER);
  const { isAuthenticated } = useSelector(getUser());

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      AuthService.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Page
      className="authContainer"
      isProtected={false}
      headContent={headContent}
    >
      <form className="authForm" onSubmit={handleFormSubmit}>
        <h1>Sign Up</h1>
        <Form.Control
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
        />
        <Form.Control
          placeholder="Last Name"
          name="lastName"
          type="text"
          value={formState.lastName}
          onChange={handleChange}
        />

        <Form.Control
          placeholder="Email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <Form.Control
          placeholder="Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <Form.Control
          placeholder="Re-Enter Password"
          name="re-password"
          type="password"
        />
        {loading ? (
          <Button type="submit" disabled={true}>
            Loading...
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
        {error && <h3>{error.message}</h3>}
      </form>

      <form className="authForm" onSubmit={handleFormSubmit}>
        <h1>Login</h1>
        <Form.Control
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
        />
        <Form.Control
          placeholder="Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        {loading ? (
          <Button type="submit" disabled={true}>
            Loading...
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
        {error && <h3>{error.message}</h3>}
      </form>
    </Page>
  );
}
