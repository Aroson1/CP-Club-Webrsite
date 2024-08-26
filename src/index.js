import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/css/base-theme.css";

import HomePage from "views/HomePage";
import BlogDetailsPage from "views/BlogDetailsPage.js";
import BlogsPage from "views/BlogsPage.js";
import ResourcesPage from "views/ResourcesPage";
import OurTeamPage from "views/OutTeamPage";
import ProfilePage from "views/ProfilePage";
import EventsPage from "views/EventsPage";
import LeaderboardPage from "views/LeaderboardPage";
import HallOfFamePage from "views/HallOfFamePage";

import AdminPage from "views/Admin/AdminPage";

import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primeicons/primeicons.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const userData = localStorage.getItem("userData");

ReactDOM.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog-details" element={<BlogDetailsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/team" element={<OurTeamPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/hall-of-fame" element={<HallOfFamePage />} />
          {userData && <Route path="/profile" element={<ProfilePage />} />}
          {userData && JSON.parse(userData).role === "ADMIN" && (
            <Route path="/admin" element={<AdminPage />} />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
