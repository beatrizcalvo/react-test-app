import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./hooks/AuthProvider";
import ProtectedRoute from "./hooks/ProtectedRoute";

import Auth from "./components/layouts/Auth";
import Login from "./components/views/auth/Login";
import Dashboard from "./components/layouts/Dashboard";
import Home from "./components/views/Home";
import Profile from "./components/views/Profile";

export default function App(props) {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={!!user} />}>
        <Route element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route element={<Auth />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
