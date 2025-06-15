// AuthenticationContext.jsx
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Context
const AuthenticationContext = createContext();

// Axios client
const client = axios.create({
  baseURL: "http://localhost:3000",
});

// Provider component
const AuthenticationProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserdata] = useState(null);

  const handleRegister = async (name, email, password) => {
    try {
      const response = await client.post("/signup", { name, email, password });
      if (response.status === 201) {
        navigate("/login");
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await client.post("/login", { email, password });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setUserdata(response.data.user);
        navigate("/");
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        userData,
        setUserdata,
        handleRegister,
        handleLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

// Hook
const useAuth = () => useContext(AuthenticationContext);

// ✅ Export all at once (this is important for Vite HMR)
export {
  AuthenticationContext,
  AuthenticationProvider,
  useAuth,
};
