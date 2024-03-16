import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./utils/AuthProvider";
import ProtectedRoute from "./utils/ProtectedRoute";

import Dashboard from "./components/layouts/Dashboard";
import Auth from "./components/layouts/Auth";
import Home from "./components/views/Home";
import Profile from "./components/views/Profile";
import Login from "./components/views/auth/Login";
import Register from "./components/views/auth/Register";

export default function App(props) {
  const currentUser = null;
  
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={!!currentUser} />}>
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
    </AuthProvider>
  );
}
