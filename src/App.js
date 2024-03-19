import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./hooks/AuthProvider";
import ProtectedRoute from "./hooks/ProtectedRoute";

export default function App(props) {
  const { user } = useAuth();
  
  return (
    <AuthProvider>
      <Routes>
      </Routes>
    </AuthProvider>
  );
}
