import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminRoute from "./auth/AdminRoute";

// Importing CSS files for styling
import "./assets/css/nucleo-icons.css";
import "./assets/scss/blk-design-system-react.scss";
import "./assets/css/base-theme.css";

// Importing page components
import HomePage from "./views/HomePage";
import BlogDetailsPage from "./views/BlogDetailsPage";
import BlogsPage from "./views/BlogsPage";
import ResourcesPage from "./views/ResourcesPage";
import OurTeamPage from "./views/OutTeamPage";
import ProfilePage from "./views/ProfilePage";
import EventsPage from "./views/EventsPage";
import LeaderboardPage from "./views/LeaderboardPage";
import HallOfFamePage from "./views/HallOfFamePage";
import AdminPage from "./views/Admin/AdminPage";
import AuthCallbackPage from "./views/AuthCallbackPage";
// import UnauthorizedPage from "./views/UnauthorizedPage";

// Importing PrimeReact styles
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primeicons/primeicons.css";


// Getting Google Client ID from environment variables
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const root = createRoot(document.getElementById("root")); // Mounting the app to the root element
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <PrimeReactProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blog-details" element={<BlogDetailsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/team" element={<OurTeamPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/hall-of-fame" element={<HallOfFamePage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/unauthorized" element={<Navigate to="/" replace />} />

            {/* Protected routes (require authentication) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Admin-only routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            {/* Redirecting any unknown routes to the home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </PrimeReactProvider>
  </GoogleOAuthProvider>
);