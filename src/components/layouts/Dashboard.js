import { useEffect } from "react";

import NavbarDashboard from "../navbars/NavbarDashboard";

export default function Dashboard(props) {

  useEffect(() => {
    document.body.classList.add("bg-gray-200");
  });
  
  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100">
        <NavbarDashboard />
      </main>
    </>
  );
}