import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./utils/ProtectedRoute";

import Dashboard from "./components/layouts/Dashboard";
import Auth from "./components/layouts/Auth";
import Home from "./components/views/Home";
import Profile from "./components/views/Profile";
import Login from "./components/views/auth/Login";
import Register from "./components/views/auth/Register";

export default function App(props) {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route element={<Auth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
