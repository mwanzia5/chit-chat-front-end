import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { useNavigate } from "react-router-dom";
import { FaPaperclip } from 'react-icons/fa';
import './index.css'; 

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  // const navigate = useNavigate();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/messages'); 
        const data = await response.json();
        setMessages(data);
        setMessages(data.map(message => ({ ...message, fromUser: message.user_id === 1 })));
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
    };

setMessages([...messages, newMessageObj]);
setNewMessage('');
  };

  const handleAttachFile = () => {
    console.log('Implement file attachment logic here');
  };

  return (
    <Container fluid className="bg-light min-vh-100">
      <Row className="h-100">
        <Col md={8} className="mx-auto mt-5">
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((message) => (
               <div key={message.id} className={`chat-message ${message.fromUser ? 'from-user' : 'from-other'}`}>
               <strong>{message.fromUser ? 'Bestie:' : '  Me:'}</strong> {message.message}
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
              <FaPaperclip style={{ color: 'black' }} />
              </label>
              <input
                id="file-upload"
                type="file"
                style={{ display: 'none' }}
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