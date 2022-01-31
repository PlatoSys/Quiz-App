import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { AuthTokenContext } from "../store";
import { useNavigate } from "react-router-dom";

function ResponsesScreen() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [authToken] = useContext(AuthTokenContext);

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    } else {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: authToken,
        },
      };
      axios
        .get(`/api/admin/responses/`, config)
        .then((response) => setResponses(response.data));
    }
  }, [authToken, navigate]);

  return (
    <div>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>TotalScore</th>
            <th>DateTime</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response) => (
            <tr key={response.id}>
              <td>{response.id}</td>
              <td>{response.email}</td>
              <td>{response.firstname}</td>
              <td>{response.lastname}</td>
              <td>
                {response.totalScore}/{response.totalQuestion}
              </td>
              <td>{response.submitDate.substring(0, 19).replace("T", "-")}</td>
              <td>
                <LinkContainer to={`/quiz/${response.quiz}`}>
                  <Button variant="primary" className="btn">
                    Take Quiz
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ResponsesScreen;
