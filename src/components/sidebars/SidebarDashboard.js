import { Navbar } from "react-bootstrap";

export default function SidebarDashboard(props) {
  return (
    <>
      <Navbar
        as="aside"
        expand="xs"
        variant="vertical"
        className="sidenav border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
      >
        <div class="sidenav-header">

        </div>
        <hr class="horizontal light mt-0 mb-2" />
      </Navbar>
    </>
  );
};
