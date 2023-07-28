import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("Noemi");
  const [lastName, setLastName] = useState("Couch");
  const [bio, setBio] = useState("");
  const [err, setErr] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErr("");

    if (!firstName || !lastName) return setErr("No field should be empty");

    console.log(firstName, lastName, bio);
    // call backend to update profile
  };

  return (
    <form className="authForm" onSubmit={handleFormSubmit}>
      <h1>Update Profile</h1>
      {err && (
        <Alert key="danger" variant="danger">
          {err}
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
        onChange={(e) => setBio(e.target.value.trim())}
        as="textarea"
        rows={3}
        placeholder="some bio"
      />
      <Button type="submit">Update Profile</Button>
    </form>
  );
};

export default UpdateProfile;
