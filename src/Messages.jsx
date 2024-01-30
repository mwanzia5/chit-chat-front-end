import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaPaperclip } from "react-icons/fa";
import "./index.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/messages");
        const data = await response.json();

        const messagesWithAbout = data.map((message) => ({
          ...message,
          fromUser: message.user_id === 1,
          about: "Some about information", // Replace with the actual "about" property from the API
        }));

        setMessages(messagesWithAbout);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = () => {
    const newMessageObj = {
      id: messages.length + 1,
      contact_id: 1,
      user_id: 1,
      message: newMessage,
      media: null,
      about: "Some about information for the new message",
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  const handleAttachFile = () => {
    console.log("Implement file attachment logic here");
  };

  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  };

  return (
    <Container fluid className="bg-light min-vh-100">
      <Row className="h-100">
        <Col className="mx-auto mt-5">
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${
                    message.fromUser ? "from-user" : "from-other"
                  }`}
                >
                  <strong>{message.fromUser ? "Bestie:" : " Me:"}</strong>{" "}
                  {message.message}
                  <button
                    onClick={() => handleDeleteMessage(message.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <Form className="p-2 chat-input-form">
              <Row>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </Col>
                <Col md={1}>
                  <Button variant="primary" onClick={handleSendMessage}>
                    Send
                  </Button>
                </Col>
                <Col md={2}>
                  <label htmlFor="file-upload" className="attach-icon">
                    <FaPaperclip style={{ color: "black" }} />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleAttachFile}
                  />
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Messages;