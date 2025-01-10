import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputErrors = (userName, password) => {
    if (!userName || !password) {
      toast.error("Please fill all the fields");
      return true;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return true;
    }
    return false;
  };

  const checkLogin = async (e) => {
    e.preventDefault();

    if (handleInputErrors(userName, password)) return;

    try {
      const res = await axios.post(
        "http://localhost:8000/auth/login",
        { userName, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data;
      toast.success("Login successful");

      if (data.error) {
        toast.error(data.error);
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userName", data.userName);
      if (data.sessionTimeOut) {
        sessionStorage.setItem("sessionTimeOut", data.sessionTimeOut);
      } else {
        console.error("Session Timeout is missing");
      }

      navigate("/");
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        toast.error(e.response.data.error);
      } else {
        toast.error(e.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-white">
          Login
          <span className="text-red-500 ml-2">Page</span>
        </h1>

        <form onSubmit={checkLogin}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-white-600 mt-2 inline-block text-white"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
