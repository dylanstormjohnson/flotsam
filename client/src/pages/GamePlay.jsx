import Page from "../components/Page";

const headContent = (
  <>
    <title>FlotSam - GamePlay</title>
    <meta name="description" content="This is the game play page of my app." />
  </>
);

export default function GamePlay() {
  return (
    <Page className="authContainer" isProtected headContent={headContent}>
      <h1>Welcome to game play</h1>
    </Page>
  );
}
