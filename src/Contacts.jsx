import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Image, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch contacts from the backend API
    fetch('http://127.0.0.1:5555/contacts')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the data to the console
        setContacts(data);
      })
      .catch(error => console.log(error));

    // Fetch chats from the backend API
    fetch('http://127.0.0.1:5555/messages')
      .then(response => response.json())
      .then(data => setChats(data))
      .catch(error => console.log(error));
  }, []);

  const navigate = useNavigate();

  const handleExit = () => {
    alert('Exiting Chit_chat?');
    navigate('/');
  };

  const handleContactClick = contact => {
    setSelectedContact(contact);
  };

  const handleSendMessage = () => {
    if (selectedContact) {
      setChats([
        ...chats,
        {
          userId: selectedContact.id,
          id: chats.length + 1,
          title: newMessage,
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100">
      <Row className="h-100">
        <Col md={4} className="bg-success text-white p-3">
          {/* Sidebar with contacts */}
          <h3>Chit-Chat Contacts</h3>
          <ListGroup>
            {contacts.map(contact => (
              <ListGroup.Item
                key={contact.id}
                active={selectedContact && selectedContact.id === contact.id}
                onClick={() => handleContactClick(contact)}
                className="border-0 contact-list-item"
              >
                <Image
                  src={`https://i.pravatar.cc/30?u=${contact.id}`}
                  roundedCircle
                  width="30"
                  height="30"
                  className="mr-2 avatar"
                />
                <span className="first-name">{contact.first_name}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8} className="d-flex flex-column bg-white">
          {/* Chat area */}
          <Row className="bg-secondary text-white p-2 mb-2">
            <Col>
              <h4>{selectedContact ? selectedContact.name : 'Select a contact'}</h4>
            </Col>
          </Row>

          <div className="chat-container">
            <div className="chat-messages">
              {/* Display chat messages */}
              {selectedContact &&
                chats
                  .filter(chat => chat.userId === selectedContact.id)
                  .map(chat => (
                    <div key={chat.id} className="chat-message">
                      <strong>{selectedContact.name}:</strong> {chat.title}
                    </div>
                  ))}
            </div>

            {/* Message input form */}
            <Form className="p-2 chat-input-form">
              <Row>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                  />
                </Col>
                <Col md={2}>
                  <Button variant="primary" onClick={handleSendMessage}>
                    Send
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Button variant="danger" onClick={handleExit}>
            Exit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacts;
