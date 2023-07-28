import Page from "../components/Page";

const headContent = (
  <>
    <title>FlotSam - Stories</title>
    <meta name="description" content="This is the home page of my app." />
  </>
);

export default function Stories() {
  return (
    <Page isProtected={false} headContent={headContent}>
      <div>Stories</div>
    </Page>
  );
}
