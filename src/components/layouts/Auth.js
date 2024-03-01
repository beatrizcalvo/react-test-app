import { Outlet, useLocation } from "react-router-dom";

export default function Auth(props) {
  return (
    <>
	  <h1>Hello from Auth!!</h1>
	  <Outlet />
    </>
  );
}
