import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createRoot } from "react-dom/client";
import "rsuite/dist/rsuite.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Discover } from "./roots/Discover.jsx";
import Home from "./roots/Home.jsx";
import { Forum } from "./roots/Forum.jsx";
import { Login } from "./roots/Login.jsx";
import { Profile } from "./roots/Profile.jsx";
import { TopArtists } from "./roots/TopArtists.jsx";
import { TopSongs } from "./roots/TopSongs.jsx";
import MyNavbar from "./components/Navbar.jsx";
import { LikedSongs } from "./roots/LikedSongs.jsx";

import { AuthProvider } from "./components/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <MyNavbar></MyNavbar>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forum",
    element: <MyNavbar></MyNavbar>,
  },
  {
    path: "/discover",
    element: <MyNavbar></MyNavbar>,
  },
  {
    path: "/profile",
    element: <MyNavbar></MyNavbar>,
  },
  {
    path: "/top-artists",
    element: <MyNavbar></MyNavbar>,
  },
  {
    path: "/top-songs",
    element: <MyNavbar></MyNavbar>,
  },
  {
    path: "/liked-songs",
    element: <MyNavbar></MyNavbar>,
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
