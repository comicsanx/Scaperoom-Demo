// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Credits } from "./pages/Credits";
import GameContainer from "./pages/GameContainer";
import GameContainer2 from "./pages/GameContainer2";
import { PassRecovery } from "./pages/PassRecovery";
import { ResetPassword } from "./pages/NewPasswordForm";
import { GameVictory } from "./pages/GameVictory";
import { LevelVictory } from "./pages/LevelVictory";
import HowToPlay from "./components/HowToPlay";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/level-1" element={<GameContainer />} />
      <Route path="/level-2" element={<GameContainer2 />} />
      <Route path="/forgot-password" element={<PassRecovery />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/level-victory" element={<LevelVictory />} />
      <Route path="/game-victory" element={<GameVictory />} />
      <Route path="/how-to-play" element={<HowToPlay />} />
    </Route>
  )
);