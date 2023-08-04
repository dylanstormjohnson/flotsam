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
      <div className="homeContent">
        <h1>Sailing Close to the Wind</h1>
        <p>Jack is pushing his luck driving that car to the local garage on his own. The authorities suspended his license six months ago, and if you ask me, he is sailing close to the wind with that idea.</p>
      <Link to="/gameplay/000000000000">
        <Button>Play Game</Button>
      </Link>
      </div>
    </Page>
  );
}
