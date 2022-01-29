import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function ResponsesScreen() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/admin/responses/`)
      .then((response) => setResponses(response.data))
  }, []);

  return (
    <div>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz</th>
            <th>Email</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>TotalScore</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response) => (
            <tr key={response.id}>
              <td>{response.id}</td>
              <td>{response.quiz_name}</td>
              <td>{response.email}</td>
              <td>{response.firstname}</td>
              <td>{response.lastname}</td>
              <td>{response.totalScore}/{response.total_qty}</td>
              <td>{response.submitDate}</td>
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
