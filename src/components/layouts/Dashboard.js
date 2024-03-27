import { useEffect, useRef, useState } from "react";

import Button from 'react-bootstrap/Button';

export default function Dashboard(props) {

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>
      <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark">
        AAAAAAAAAAAAAAAAAAAAA
      </aside>
    </>
  );
}
