import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./index.css";
import { BASE_URL } from "./utils";
import toast from "react-hot-toast";
import { FaPaperclip, FaTrash } from "react-icons/fa";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const loggedInUserId = localStorage.getItem("sender_id");
  const recipientId = localStorage.getItem("receiver_id");

  useEffect(() => {
    fetch(`${BASE_URL}/messages`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data));
    console.log(messages);
  }, []);

  let handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          sender_id: loggedInUserId,
          receiver_id: recipientId,
          message: newMessage,
          media: "",
        }),
      });
      let resJson = await res.json();
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const filteredMessages = [];

  messages.forEach((message) => {
    if (
      (message.sender_id == loggedInUserId &&
        message.receiver_id == recipientId) ||
      (message.receiver_id == loggedInUserId &&
        message.sender_id == recipientId)
    ) {
      filteredMessages.push(message);
    }
  });
  // console.log(filteredMessages);
  console.log(newMessage);

  return (
    <>
      {filteredMessages.map((message) => (
        <div
          className={
            message.sender_id == loggedInUserId ? "sender" : "receiver"
          }
          key={message.id}
        >
          {message.message}
        </div>
      ))}
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
        </Row>
      </Form>
    </>
  );
}

export default Messages;
