import Button from "react-bootstrap/Button";
import Page from "../components/Page";
import { Link } from "react-router-dom";

const headContent = (
  <>
    <title>FlotSam - Home</title>
    <meta name="description" content="This is the home page of my app." />
  </>
);

export default function Home() {
  return (
    <Page
      className="homeContainer"
      isProtected={false}
      headContent={headContent}
    >
      <div>Home</div>
      {/* remove this button later */}
      <Link to="/gameplay/1">
        <Button>Play Game</Button>
      </Link>
    </Page>
  );
}
