import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./hooks/providers/AuthProvider";
import ProtectedRoute from "./hooks/ProtectedRoute";

import Auth from "./components/layouts/Auth";
import Login from "./components/views/auth/Login";
import Register from "./components/views/auth/Register";
import Dashboard from "./components/layouts/Dashboard";
import Profile from "./components/views/users/Profile";
import Settings from "./components/views/users/Settings";

export default function App(props) {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={!!user} />}>
        
      </Route>
      <Route element={<Auth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
