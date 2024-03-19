import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./hooks/AuthProvider";
import ProtectedRoute from "./hooks/ProtectedRoute";

import Auth from "./components/layouts/Auth";
import Login from "./components/views/auth/Login";
import Dashboard from "./components/layouts/Dashboard";

export default function App(props) {
  const { user } = useAuth();
  
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route element={<Auth />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
