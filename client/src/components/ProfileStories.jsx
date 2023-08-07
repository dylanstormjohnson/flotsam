import Card from "react-bootstrap/Card";
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_STORIES } from "../graphql/queries";

const ProfileStories = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_STORIES);

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
    return `Error! ${error.message}`;
  }

  return (
    <div className="storiesCon">
      {data?.allStories.map((story) => (
        <Link
          key={story._id}
          to={"/gameplay/" + story._id}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Card
            style={{
              width: "18rem",
              height: "5rem",
              marginBottom: "10px",
              cursor: "pointer",
              backgroundImage: `url(${story.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="shadow"
          >
            <Card.Body className="d-flex align-items-center justify-content-center">
              <Card.Title style={{
                  color: "white",
                  textShadow: "1px 1px 2px black",
                }}>{story.name}</Card.Title>
              {/* <Card.Text>Endings Found: #</Card.Text> */}
            </Card.Body>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ProfileStories;
