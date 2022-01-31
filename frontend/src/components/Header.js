import React from "react";
import {
  Container,
  Nav,
  Navbar,
  DropdownButton,
  Dropdown,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthTokenContext } from "../store";

function Header({ setMode, mode }) {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useContext(AuthTokenContext);

  const changeMode = (quizMode) => {
    setMode(quizMode);
    navigate("/");
  };

  const logoutHandler = () => {
    setAuthToken();
    localStorage.removeItem("token");
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
              {authToken ? (
                <NavDropdown title={"Admin"} id="admin">
                  <LinkContainer to="admin/question/">
                    <NavDropdown.Item>Add Question</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="admin/responses/">
                    <NavDropdown.Item>Responses</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/admin/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
          <DropdownButton
            className="pr-2"
            id="mode-selector"
            title={mode ? "Binary" : "Multiple Choice"}
          >
            <Dropdown.Item id="binary" onClick={(e) => changeMode(true)}>
              Binary
            </Dropdown.Item>
            <Dropdown.Item id="non-binary" onClick={(e) => changeMode(false)}>
              Multiple
            </Dropdown.Item>
          </DropdownButton>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
