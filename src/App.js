import { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import useLocalStorage from "./utils/LocalStorage";
import ProtectedRoute from "./utils/ProtectedRoute";

import Dashboard from "./components/layouts/Dashboard";
import Auth from "./components/layouts/Auth";
import Home from "./components/views/Home";
import Login from "./components/views/auth/Login";
import Register from "./components/views/auth/Register";

export default function App(props) {
  const [currentUser, setCurrentUser] = useLocalStorage("user");
  
  useEffect(() => {
    console.log("currentUser: " + JSON.stringify(currentUser));
  });
  
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={!!currentUser} />}>
        <Route element={<Dashboard />}>
          <Route path="/" element={<Home />} />
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
