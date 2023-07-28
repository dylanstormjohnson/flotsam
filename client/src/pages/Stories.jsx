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
      <div class='roomContainer'>
        <img src="./assets/images/Logo/Flotsam_Background_Image.png" alt="Logo" id="gameSpace" user_id="{{user_id}}" class=""></img>
      </div>
    </Page>
  );
}
