import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
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
  const [addUser, { error, data, loading }] = useMutation(ADD_USER);
  const { isAuthenticated } = useSelector(getUser());

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    /*try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      AuthService.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }*/
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
      <Register />
      <Login />
    </Page>
  );
}
