import React, { useState } from "react";
import { Button, Modal, Nav } from "react-bootstrap";

const handleLogout = () => {
  localStorage.clear();
  window.location = "/";
};

export const Logout = () => {
  const [show, setShow] = useState(false);
  const [textColor, setTextColor] = useState("text-white");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Nav.Link
        // href="#link"
        className={textColor}
        onClick={handleShow}
        onMouseEnter={() => setTextColor("text-primary")}
        onMouseLeave={() => setTextColor("text-white")}
      >
        Logout
      </Nav.Link>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
