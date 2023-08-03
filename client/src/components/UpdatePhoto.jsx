import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useMutation } from "@apollo/client";
import { SINGLE_UPLOAD_MUTATION } from "../graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setAuthenticatedUser } from "../redux/slices/userSlice";
import AuthService from "../utils/auth"

const fileTypes = ["image/png", "image/jpg", "image/jpeg"];

const UpdatePhoto = () => {
  const [err, setErr] = useState("");
   const [successMsg, setSuccessMsg] = useState("");
  const [photo, setPhoto] = useState({ preview: "", data: "" });

 const {userData}= useSelector(getUser())
 const dispatch = useDispatch()
  const [singleUpload, { loading }] = useMutation(
    SINGLE_UPLOAD_MUTATION
  );

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
    setErr("")

    if (!photo.data) return setErr("Choose a file");

    // submit to backend
    try {
      // Execute mutation and pass in defined parameter data as variables
      const {data} = await singleUpload({
        variables: { file: photo.data, id:userData._id }
      });
      
      setSuccessMsg("Successfully Uploaded Photo");
      setPhoto({preview:"",data:""});
      setTimeout(() => setSuccessMsg(''), 3000);
      // call redux set auth func
      dispatch(setAuthenticatedUser(data.singleUpload.user));
      AuthService.login(data.singleUpload.token);
      //
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
       {successMsg && (
        <Alert key="success" variant="success">
          {successMsg}
        </Alert>
      )}

      {photo.preview ? (
        <img className="profileImg" src={photo.preview} alt="profile" />
      ) 
      : userData?.profilePhoto ?  
      <img className="profileImg" src={require(`../assets/profileUploads/${userData.profilePhoto}`)} alt="user profile" /> : null}

      <Form.Control onChange={handleFileChange} type="file" />
      
       {loading ? (
        <Button type="submit" disabled={true}>
          Loading...
        </Button>
      ) : (
       <Button type="submit">Update Photo</Button>
      )}
    </form>
  );
};

export default UpdatePhoto;
