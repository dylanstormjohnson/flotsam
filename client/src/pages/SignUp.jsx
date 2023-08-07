import { useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import { Navigate } from "react-router-dom";

import Page from "../components/Page";
import AuthService from "../utils/auth";
import Register from "../components/Register";
import Login from "../components/Login";

const headContent = (
  <>
    <title>FlotSam - Sign Up</title>
    <meta
      name="description"
      content="Sign Up page for Project-3 Starter Code."
    />
  </>
);

export default function SignUp() {
  const { isAuthenticated } = useSelector(getUser());

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Page
      className="authContainer normalBackground"
      isProtected={false}
      headContent={headContent}
    >
      <Register />
      <Login />
    </Page>
  );
}
