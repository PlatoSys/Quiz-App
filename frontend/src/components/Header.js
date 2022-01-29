import React from "react";
import {
  Container,
  Nav,
  Navbar,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

function Header({ setMode }) {
  const navigate = useNavigate();

  const changeMode = (quizMode) => {
    setMode(quizMode);
    navigate("/");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand href="/">
              <h2>QuizY</h2>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/admin">
                <Nav.Link>Admin</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
          <DropdownButton id="mode-selector" title="Select Mode">
            <Dropdown.Item id="binary" onClick={(e) => changeMode("True")}>
              Binary
            </Dropdown.Item>
            <Dropdown.Item id="non-binary" onClick={(e) => changeMode("False")}>
              Multi Choice
            </Dropdown.Item>
          </DropdownButton>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
