import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaPaperclip, FaTrash } from "react-icons/fa";
import "./index.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/messages", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await response.json();

        const messagesWithAbout = data.map((message) => ({
          ...message,
          fromUser: message.user_id === 1,
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

  const handleToggleSelect = (id) => {
    const isSelected = selectedMessages.includes(id);

    if (isSelected) {
      setSelectedMessages(selectedMessages.filter((msgId) => msgId !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  const handleDeleteSelectedMessages = () => {
    const updatedMessages = messages.filter(
      (message) => !selectedMessages.includes(message.id)
    );
    setMessages(updatedMessages);
    setSelectedMessages([]);
    setIsSelectMode(false);
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedMessages([]);
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
                  } ${isSelectMode ? "select-mode" : ""} ${
                    selectedMessages.includes(message.id) ? "selected" : ""
                  }`}
                >
                  {isSelectMode && (
                    <input
                      type="checkbox"
                      onChange={() => handleToggleSelect(message.id)}
                      checked={selectedMessages.includes(message.id)}
                    />
                  )}
                  <strong>{message.fromUser ? "Bestie:" : " Me:"}</strong>{" "}
                  {message.message}
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
                <Col md={1}>
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
                <Col md={2}>
                  <Button
                    variant={isSelectMode ? "warning" : "danger"}
                    onClick={toggleSelectMode}
                  >
                    {isSelectMode ? (
                      "Cancel"
                    ) : (
                      <FaTrash style={{ color: "white" }} />
                    )}
                  </Button>
                  {isSelectMode && (
                    <Button
                      variant="danger"
                      onClick={handleDeleteSelectedMessages}
                    >
                      Delete
                    </Button>
                  )}
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