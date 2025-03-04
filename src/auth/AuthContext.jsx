import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

const API_URL = 'http://localhost:3000/v1';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Setup axios interceptor for token refresh
  useEffect(() => {
    const setupAxiosInterceptors = () => {
      axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;

          // If error is 401 and not a retry and we have refresh token
          if (
            error.response?.status === 401 &&
            error.response?.data?.expired &&
            !originalRequest._retry &&
            Cookies.get('refreshToken')
          ) {
            originalRequest._retry = true;

            try {
              // Try to get new access token
              const { data } = await axios.post(`${API_URL}/auth/refresh-token`, {
                refreshToken: Cookies.get('refreshToken')
              });

              // Update cookies and headers
              Cookies.set('accessToken', data.accessToken, { expires: 1/24 });
              axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

              // Retry the original request
              return axios(originalRequest);
            } catch (refreshError) {
              // Refresh token invalid, logout user
              await logout();
              return Promise.reject(refreshError);
            }
          }

          return Promise.reject(error);
        }
      );
    };

    setupAxiosInterceptors();
  }, []);

  // Check for tokens and fetch user data on load
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = Cookies.get('accessToken');
      
      if (accessToken) {
        try {
          // Set default headers for all axios requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          
          const { data } = await axios.get(`${API_URL}/auth/me`);
          
          setUser(data.user);
          setIsAdmin(data.user.role === 'ADMIN');
          
          // Save user data to localStorage for persistence
          localStorage.setItem('userData', JSON.stringify({
            id: data.user.id,
            userName: data.user.userName,
            email: data.user.email,
            role: data.user.role,
            profileImage: data.user.profileImage,
          }));
        } catch (error) {
          console.error('Error fetching user data:', error);
          Cookies.remove('accessToken');
          localStorage.removeItem('userData');
        }
      } else {
        const storedUserData = localStorage.getItem('userData');
        const refreshToken = Cookies.get('refreshToken');
        
        if (storedUserData && refreshToken) {
          try {
            // Try to refresh token
            const { data } = await axios.post(`${API_URL}/auth/refresh-token`, {
              refreshToken
            });
            
            Cookies.set('accessToken', data.accessToken, { expires: 1/24 });
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
            
            // Fetch user data with new token
            const userResponse = await axios.get(`${API_URL}/auth/me`);
            setUser(userResponse.data.user);
            setIsAdmin(userResponse.data.user.role === 'ADMIN');
          } catch (error) {
            console.error('Error refreshing token:', error);
            Cookies.remove('refreshToken');
            localStorage.removeItem('userData');
          }
        }
      }
      
      setLoading(false);
    };
    
    initAuth();
  }, []);

  // Handle OAuth callback
  useEffect(() => {
    const handleOAuthCallback = () => {
      if (window.location.pathname === '/auth/callback') {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');
        
        if (accessToken && refreshToken) {
          Cookies.set('accessToken', accessToken, { expires: 1/24 }); // 1 hour
          Cookies.set('refreshToken', refreshToken, { expires: 7 }); // 7 days
          
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          
          // Clean URL and redirect
          window.history.replaceState({}, document.title, '/');
          window.location.href = '/';
        }
      }
    };
    
    handleOAuthCallback();
  }, []);

  // Start Google login
  const login = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  // Logout user
  const logout = async () => {
    try {
      if (Cookies.get('accessToken')) {
        await axios.get(`${API_URL}/auth/logout`);
      }
      
      // Clear cookies and local storage
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      localStorage.removeItem('userData');
      
      // Clear Authorization header
      delete axios.defaults.headers.common['Authorization'];
      
      setUser(null);
      setIsAdmin(false);
      
      // Redirect to home
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated: !!user, 
      isAdmin,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;