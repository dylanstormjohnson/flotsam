import github from "../assets/github.png";
export default function Footer() {
  return (
    <footer>
      <h5 className="logo">FlotSam</h5>
      <a href="https://github.com/dylanstormjohnson/flotsam" target="_blank">
        <img src={github} alt="project repo" />
      </a>
    </footer>
  );
}
