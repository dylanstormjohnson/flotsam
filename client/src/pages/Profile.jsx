import Page from "../components/Page";
import UpdatePhoto from "../components/UpdatePhoto";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import ProfileStories from "../components/ProfileStories";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
const headContent = (
  <>
    <title>FlotSam - Profile</title>
    <meta name="description" content="This is the home page of my app." />
  </>
);

export default function Profile() {
  return (
    <Page
      className="authContainer"
      isProtected
      headContent={headContent}
    >
      <UpdatePhoto />
      <UpdateProfile />
      <UpdatePassword />
    </Page>
  );
}
