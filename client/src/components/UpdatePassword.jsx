import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setAuthenticatedUser } from "../redux/slices/userSlice";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../graphql/mutations";
import AuthService from "../utils/auth";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { userData } = useSelector(getUser());
  const dispatch = useDispatch();
  const [updateUser, { loading }] = useMutation(UPDATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErr("");
    setSuccessMsg("");

    if (!password) return setErr("Password shouldn't be empty");
    if (password !== confirmPass) return setErr("Passwords must match");

    const info = {
      id: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      bio: userData.bio,
      password,
    };

    // call backend to update password
    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await updateUser({
        variables: info,
      });
      // call redux set auth func
      dispatch(setAuthenticatedUser(data.updateUser.user));
      AuthService.login(data.updateUser.token);
      setSuccessMsg("Successfully Updated Password");
    } catch (err) {
      setErr(err.message);
      console.log("ERROR: ", err);
    }
  };
  return (
    <form className="authForm" onSubmit={handleFormSubmit}>
      <h1>Update Password</h1>
      {err && (
        <Alert key="danger" variant="danger">
          {err}
        </Alert>
      )}
      {successMsg && (
        <Alert key="success" variant="success">
          {successMsg}
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
      {loading ? (
        <Button type="submit" disabled={true}>
          Loading...
        </Button>
      ) : (
        <Button type="submit">Update Password</Button>
      )}
    </form>
  );
};

export default UpdatePassword;
