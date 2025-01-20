import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import ControlPanel from "./Pages/ControlPanel";
import Subscriptions from "./Pages/Subscriptions";
import Usersmanagement from "./Pages/Usersmanagement";
import Movies from "./Pages/Movies";
import Sidebar from "./Components/SideBar";
import MovieDetails from "./Components/MovieDetails";
import ViewSubscriptions from "./Components/ViewSubscriptions";
import EditUsers from "./Components/EditUsers";
import EditPermissions from "./Components/EditPermissions";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Navigate to="/controlpanel" />} /> 
          <Route path="controlpanel" element={<ControlPanel />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:id" element={<MovieDetails />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="subscriptions/:id" element={<ViewSubscriptions />} />
          <Route path="usersManagement" element={<Usersmanagement />} />
          <Route path="usersManagement/:id" element={<EditUsers />} />
          <Route path="usersManagement/permissions/:id" element={<EditPermissions />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
