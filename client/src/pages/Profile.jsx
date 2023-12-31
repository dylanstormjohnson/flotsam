import Page from "../components/Page";
import UpdatePhoto from "../components/UpdatePhoto";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
const headContent = (
  <>
    <title>FlotSam - Profile</title>
    <meta name="description" content="This is the home page of my app." />
  </>
);

export default function Profile() {
  return (
    <Page
      className="authContainer normalBackground"
      isProtected
      headContent={headContent}
    >
      <UpdatePhoto />
      <UpdateProfile />
      <UpdatePassword />
    </Page>
  );
}
