import Page from "../components/Page";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const headContent = (
  <>
    <title>FlotSam - Profile</title>
    <meta name="description" content="This is the home page of my app." />
  </>
);

export default function Profile() {
  return (
    <Page
      className="authContainer"
      isProtected={false}
      headContent={headContent}
    >
      <form className="authForm">
        <h1>Change Password</h1>
        <Form.Control type="text" placeholder="First Name" name="firstName" />
        <Form.Control placeholder="Last Name" name="lastName" type="text" />

        <Form.Control placeholder="Password" name="password" type="password" />
        <Form.Control
          placeholder="Re-Enter Password"
          name="re-password"
          type="password"
        />
        <Button type="submit">Update Profile</Button>
      </form>
      <div>
        <Card style={{ width: "18rem", height: "5rem", marginBottom: "10px" }}>
          <Card.Body>
            <Card.Title>Sample Story Title</Card.Title>
            <Card.Text>Endings Found:3</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", height: "5rem", marginBottom: "10px" }}>
          <Card.Body>
            <Card.Title>Sample Story Title</Card.Title>
            <Card.Text>Endings Found:3</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", height: "5rem", marginBottom: "10px" }}>
          <Card.Body>
            <Card.Title>Sample Story Title</Card.Title>
            <Card.Text>Endings Found:3</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Page>
  );
}
