import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const Status = () => {
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/statuses", {
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

  return (
    <>
      <Carousel>
        {statuses.map((status) => (
          <Carousel.Item key={status.id}>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
            <Card>
              <Card.Title>{`USER:${status.user_id}`}</Card.Title>
              <Card.Body>
                <h2>{status.status_text}</h2>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default Status;