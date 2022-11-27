import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "next";

import { useAppContext } from "@/context/AppContext";
import { Logout } from "./Logout";

export const Header = () => {
  const [textColor, setTextColor] = useState("text-white");
  const { state } = useAppContext();
  const username = state.user.userName;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          href="/home"
          as={Link}
          className={`me-auto ${textColor}`}
          onMouseEnter={() => setTextColor("text-primary")}
          onMouseLeave={() => setTextColor("text-white")}
        >
          MK-KPS
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            {/* <Nav.Link href="/home">Home</Nav.Link> */}
            <Nav.Link href="/History">History</Nav.Link>

            <Nav.Link href="/Summary">Summary</Nav.Link>
          </Nav>{" "}
          {username ? (
            <Nav className="ms-auto">
              <Logout />
            </Nav>
          ) : null}
        </Navbar.Collapse>
        <Nav.Link href="#" className="text-warning me-2">
          {username.toUpperCase()}
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
      </Container>
    </Navbar>
  );
};
