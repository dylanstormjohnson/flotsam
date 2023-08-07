import Page from "../components/Page";
import ProfileStories from "../components/ProfileStories";

const headContent = (
  <>
    <title>FlotSam - Stories</title>
    <meta name="description" content="This is the home page of my app." />
  </>
);

export default function Stories() {
  return (
    <Page className="normalBackground" isProtected headContent={headContent}>
      <div className="profileStories">
        <h1>Stories Completed</h1>
        <ProfileStories />
      </div>
    </Page>
  );
}
