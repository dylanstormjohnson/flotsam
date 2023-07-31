import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../utils/auth";
import { getUser, setAuthenticatedUser } from "../redux/slices/userSlice";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { userData } = useSelector(getUser());
  const dispatch = useDispatch();
  const [updateUser, { loading }] = useMutation(UPDATE_USER);

  useEffect(() => {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setBio(userData.bio);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErr("");
    setSuccessMsg("");

    if (!firstName || !lastName) return setErr("No field should be empty");

    const info = { id: userData._id, firstName, lastName, bio };

    // call backend to update profile
    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await updateUser({
        variables: info,
      });

      // call redux set auth func
      dispatch(setAuthenticatedUser(data.updateUser.user));
      AuthService.login(data.updateUser.token);
      setSuccessMsg("Successfully Updated Profile");
    } catch (err) {
      setErr(err.message);
      console.log("ERROR: ", err);
    }
  };

  return (
    <form className="authForm" onSubmit={handleFormSubmit}>
      <h1>Update Profile</h1>
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
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value.trim())}
        placeholder="First Name"
      />
      <Form.Control
        value={lastName}
        onChange={(e) => setLastName(e.target.value.trim())}
        placeholder="Last Name"
        type="text"
      />
      <Form.Control
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        as="textarea"
        rows={3}
        placeholder="some bio"
      />
      {loading ? (
        <Button type="submit" disabled={true}>
          Loading...
        </Button>
      ) : (
        <Button type="submit">Update Profile</Button>
      )}
    </form>
  );
};

export default UpdateProfile;
