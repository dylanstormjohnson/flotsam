import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useMutation } from "@apollo/client";
import { UPDATE_PHOTO } from "../graphql/mutations";

const fileTypes = ["image/png", "image/jpg", "image/jpeg"];

const UpdatePhoto = () => {
  const [err, setErr] = useState("");
  const [photo, setPhoto] = useState({ preview: "", data: "" });

  // const [updatePhoto, { loading }] = useMutation(UPDATE_PHOTO);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setErr("");

    if (!fileTypes.includes(file.type))
      return setErr("wrong file type, chose (jpg, png or jpeg");

    const img = {
      data: file,
      preview: URL.createObjectURL(e.target.files[0]),
    };
    setPhoto(img);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", photo.data);

    // submit to backend
    try {
      // Execute mutation and pass in defined parameter data as variables
      /*const { data } = await updatePhoto({
        variables: { file: photo.data },
      });*/
      // console.log(data);
      // call redux set auth func
      //dispatch(setAuthenticatedUser(data.updateUser.user));
      //AuthService.login(data.updateUser.token);
      //setSuccessMsg("Successfully Updated Password");
    } catch (err) {
      setErr(err.message);
      console.log("ERROR: ", err);
    }
  };

  return (
    <form className="authForm" onSubmit={handleFormSubmit}>
      <h1>Update Photo</h1>
      {err && (
        <Alert key="danger" variant="danger">
          {err}
        </Alert>
      )}

      {photo && (
        <img className="profileImg" src={photo.preview} alt="profile photo" />
      )}

      <Form.Control onChange={handleFileChange} type="file" />
      <Button type="submit">Update Photo</Button>
    </form>
  );
};

export default UpdatePhoto;
