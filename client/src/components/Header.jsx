import { Link } from "react-router-dom";
import AuthServices from "../utils/auth";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import Button from "react-bootstrap/Button";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: "0",
    width: "100%",
    backgroundColor: "#003559",
    padding: "0px 40px",
  },
  buttonDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    margin: "0.5rem",
  },
  undecoratedLink: {
    textDecoration: "none",
  },
};

export default function Header() {
  const { isAuthenticated } = useSelector(getUser());

  const handleLogout = (e) => {
    AuthServices.logout();
  };

  return (
    <nav style={styles.container}>
      <Link to="/" style={styles.undecoratedLink}>
        <h1 className="logo">FlotSam</h1>
      </Link>
      <div style={styles.buttonDiv}>
        <Link to="/stories">
          <Button style={styles.button}>Stories</Button>
        </Link>
        <Link to="/profile">
          <Button style={styles.button}>Profile</Button>
        </Link>
        {isAuthenticated && (
          <Button
            variant="success"
            onClick={handleLogout}
            style={styles.button}
          >
            Logout
          </Button>
        )}
        {!isAuthenticated && (
          <Link to="/signup">
            <Button style={styles.button}>Sign Up / Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
