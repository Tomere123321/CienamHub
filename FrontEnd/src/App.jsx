import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Main from "./Pages/Main";
import UsersManagement from "./Pages/UsersManagement";
import Allusers from "./Components/Allusers";
import Adduser from "./Components/Adduser";
import Movies from "./Pages/Movies";

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Main />}>
          <Route path="manageusers" element={<UsersManagement />}>
            <Route index element={<Navigate to="add" replace />} />
            <Route path="all" element={<Allusers />} />
            <Route path="add" element={<Adduser />} />
          </Route>
          <Route path="movies" element={<Movies />}>
            <Route index element={<Navigate to="add" replace />} />
            <Route path="all" element={<Allusers />} />
            <Route path="add" element={<Adduser />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
