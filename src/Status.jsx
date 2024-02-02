import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { BASE_URL } from "./utils";

const Status = () => {
  const loggedInUserId = localStorage.getItem("sender_id");
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/statuses`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const statusData = await response.json();
        setStatuses(statusData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatuses();
  }, []);

  let handleAddStatus = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${BASE_URL}/statuses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          user_id: loggedInUserId,
          status_text: newStatus,
          media: "",
        }),
      });
      let resJson = await res.json();
      setNewStatus("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Carousel>
        {statuses.map((status) => (
          <Carousel.Item key={status.id}>
            <Card>
              <Card.Title className="card-title">{`USER:${status.user_id}`}</Card.Title>
              <Card.Body>
                <h2>{status.status_text}</h2>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
      <Form className="p-2 chat-input-form">
        <Row>
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Type your status update here"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
          </Col>
          <Col md={1}>
            <Button variant="primary" onClick={handleAddStatus}>
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Status;
