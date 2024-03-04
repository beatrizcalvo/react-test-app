import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import useLocalStorage from "./utils/LocalStorage";
import ProtectedRoute from "./utils/ProtectedRoute";

import Dashboard from "./components/layouts/Dashboard";
import Auth from "./components/layouts/Auth";
import Login from "./components/views/auth/Login";
import Register from "./components/views/auth/Register";

export default function App(props) {
  const [currentUser, setCurrentUser] = useLocalStorage("user");
  
  useEffect(() => {
    console.log("currentUser: " + JSON.stringify(currentUser));
  }, []);
  
  return (
    <Routes>
      /*<Route element={<ProtectedRoute isAllowed={!!currentUser} />}>*/
        <Route path="/" element={<Dashboard />} />
      /*</Route>*/
      <Route element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
