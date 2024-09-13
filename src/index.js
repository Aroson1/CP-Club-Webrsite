import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

// Importing CSS files for styling
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/css/base-theme.css";

// Importing page components
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

// Importing PrimeReact styles
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primeicons/primeicons.css";

// Importing Google OAuth provider
import { GoogleOAuthProvider } from "@react-oauth/google";

// Getting Google Client ID from environment variables
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// Retrieving user data from local storage
const userData = localStorage.getItem("userData");

// Rendering the application
ReactDOM.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          {/* Defining application routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog-details" element={<BlogDetailsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/team" element={<OurTeamPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/hall-of-fame" element={<HallOfFamePage />} />

          {/* Conditional rendering for profile and admin routes based on user data */}
          {userData && <Route path="/profile" element={<ProfilePage />} />}
          {userData && JSON.parse(userData).role === "ADMIN" && (
            <Route path="/admin" element={<AdminPage />} />
          )}

          {/* Redirecting any unknown routes to the home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  </GoogleOAuthProvider>,
  document.getElementById("root") // Mounting the app to the root element
);
