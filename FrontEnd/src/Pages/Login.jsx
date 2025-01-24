import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkLogin = async (event) => {
    event.preventDefault();
    try {

      const { data: users } = await axios.get("http://localhost:8000/users");
      const loggedInUser = users.find((user) => user.userName === userName);

      if (!loggedInUser) {
        toast.error("User not found.");
        return;
      }

      const { _id: userId } = loggedInUser;

      if (!password || !userName) {
        toast.error("Please fill in all fields");
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

    
      const response = await axios.post("http://localhost:8000/auth/login", {
        userName,
        password,
      });
      
      const { token, sessionTimeOut, userName: returnedUserName } = response.data;
      
      localStorage.setItem("userName", returnedUserName);
      localStorage.setItem("token", token);
      localStorage.setItem("sessionTimeOut", sessionTimeOut);
      localStorage.setItem("userId", userId);
      
      toast.success("Login successful");
     
      navigate("/ControlPanel");
    
    } catch (error) {
      toast.error(error.response?.data?.message || 'login failed. Contact The Admin.');
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 text-white"
      style={{
        backgroundImage: "url('src/assets/CinemaBG.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="w-full max-w-md shadow-md rounded-lg p-6"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome back To CINEMAHUB!
        </h1>

        <form onSubmit={checkLogin}>
          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-400">UserName</span>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="text"
                placeholder="John Doe"
                className="grow bg-transparent text-white placeholder-gray-400 border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-400">Password</span>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="password"
                placeholder="Your password"
                className="grow bg-transparent text-white placeholder-gray-400 border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>

          <button type="submit" className="btn btn-primary w-full mb-4">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
