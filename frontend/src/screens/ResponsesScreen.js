import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useContext } from "react";
import { AuthTokenContext } from "../store";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function ResponsesScreen() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [authToken] = useContext(AuthTokenContext);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    if (!authToken) {
      navigate("/");
    } else {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: authToken,
        },
      };
      axios.get(`/api/admin/responses/`, config).then((response) => {
        setResponses(response.data);
        setLoader(false);
      });
    }
  }, [authToken, navigate]);

  return loader ? (
    <Loader />
  ) : (
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ResponsesScreen;
