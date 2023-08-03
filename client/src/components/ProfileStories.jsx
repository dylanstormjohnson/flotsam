import Card from "react-bootstrap/Card";
import React from "react";
import { Link } from "react-router-dom"

const ProfileStories = () => {
  return (
    <div>
      <Link
        to="/gameplay/1"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}>
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
      </Link>
      <Link
        to="/gameplay/2"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}>
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
      </Link>
    </div>
  );
};

export default ProfileStories;
