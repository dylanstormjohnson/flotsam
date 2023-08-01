import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Page404 from "./Page404";
import Stories from "./Stories";
import Profile from "./Profile";
import SignUp from "./SignUp";
import GamePlay from "./GamePlay";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stories" element={<Stories />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/gameplay/:gameId" element={<GamePlay />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
