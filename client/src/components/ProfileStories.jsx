import Card from "react-bootstrap/Card";
import React from "react";

const ProfileStories = () => {
  return (
    <div>
      <Card
        style={{
          width: "18rem",
          height: "5rem",
          marginBottom: "10px",
          cursor: "pointer",
        }}
      >
        <Card.Body>
          <Card.Title>Sample Story Title</Card.Title>
          <Card.Text>Endings Found:3</Card.Text>
        </Card.Body>
      </Card>
      <Card
        style={{
          width: "18rem",
          height: "5rem",
          marginBottom: "10px",
          cursor: "pointer",
        }}
      >
        <Card.Body>
          <Card.Title>Sample Story Title</Card.Title>
          <Card.Text>Endings Found:3</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileStories;
