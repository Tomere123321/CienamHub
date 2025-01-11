import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ControlPanel from "./Pages/ControlPanel";

export const App = () => {
  return <div>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signUp" element={<SignUp />} />
    <Route path="/ControlPanel" element={<ControlPanel />} />
   </Routes>
   <Toaster/>
  </div>;
};

export default App;
