import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdatePhoto = () => {
  return (
    <form className="authForm">
      <h1>Update Photo</h1>
      <Form.Control type="file" />
      <Button type="submit">Update Photo</Button>
    </form>
  );
}

export default UpdatePhoto