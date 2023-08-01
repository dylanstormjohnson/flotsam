import Page from "../components/Page";
import { useParams } from "react-router-dom";

const headContent = (
  <>
    <title>FlotSam - GamePlay</title>
    <meta name="description" content="This is the game play page of my app." />
  </>
);

export default function GamePlay() {
  const { gameId } = useParams();
  return (
    // add isProtected to this line
    <Page className="authContainer"  headContent={headContent}>
      <h1>Welcome to game play {gameId}</h1>
    </Page>
  );
}