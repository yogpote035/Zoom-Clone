import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthenticationContext = createContext();

const client = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
});

export const AuthenticationProvider = ({ children }) => {
  const navigate = useNavigate(); // ✅ Now inside Router
  const [userData, setUserdata] = useState(null);

  const handleRegister = async (name, email, password) => {
    try {
      const request = await client.post("/signup", { name, email, password });

      if (request.status === 201) {
        navigate("/login"); // ✅ Navigate after registration
        return request.data.message;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const request = await client.post("/login", { email, password });

      if (request.status === 200) {
        localStorage.setItem("token", request.data.token);
        setUserdata(request.data.user); // If your backend returns user
        navigate("/"); // ✅ Navigate to home/dashboard
        return request.data.user;
      }
    } catch (error) {
      throw error;
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

// Hook to use the context
export const useAuth = () => useContext(AuthenticationContext);
