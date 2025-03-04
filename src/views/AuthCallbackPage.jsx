import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const AuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("accessToken");
      const refreshToken = urlParams.get("refreshToken");

      if (accessToken && refreshToken) {
        // Store tokens in cookies
        Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); // 1 hour
        Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days

        // Set default authorization header for axios
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        try {
          // Fetch user data
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/auth/me`
          );
          const userData = response.data.user;

          // Store user data in local storage
          localStorage.setItem(
            "userData",
            JSON.stringify({
              id: userData.id,
              userName: userData.userName,
              email: userData.email,
              role: userData.role || "user",
              profileImage: userData.profileImage,
            })
          );

          // Redirect to home page
          navigate("/", { replace: true });
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/", { replace: true });
        }
      } else {
        navigate("/", { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div
      className="auth-callback-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "6px solid #ccc",
          borderTop: "6px solid #1d72b8",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <p style={{ marginTop: "20px", fontSize: "18px", color: "#333" }}>
        Completing authentication...
      </p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AuthCallbackPage;
