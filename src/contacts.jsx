import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Image, Form } from 'react-bootstrap';
import './App.css';

const contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch contacts from the backend API 
    // fetch('')
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error));

    // Fetch chats from the backend API
    fetch('')
      .then(response => response.json())
      .then(data => setChats(data))
      .catch(error => console.error('Error fetching chats:', error));
  }, []);

  const handleExit = () => {
    
    alert('Exiting Chit_chat...');
  };

  const handleContactClick = (contact) => {
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
        <Col md={8} className="d-flex flex-column bg-white">
          <Row className="bg-secondary text-white p-2 mb-2">
            <Col>
              <h4>{selectedContact ? selectedContact.name : 'Select a contact'}</h4>
            </Col>
          </Row>

          <ListGroup className="overflow-auto flex-grow-1" style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            {selectedContact &&
              chats
                .filter((chat) => chat.userId === selectedContact.id)
                .map((chat) => (
                  <ListGroup.Item key={chat.id} className="border-0">
                    <strong>{selectedContact.name}:</strong> {chat.title}
                  </ListGroup.Item>
                ))}
          </ListGroup>

          <Form className="p-2" style={{ borderTop: '1px solid #ddd' }}>
            <Form.Row>
              <Col md={10}>
                <Form.Control
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Button variant="primary" onClick={handleSendMessage}>
                  Send
                </Button>
              </Col>
            </Form.Row>
          </Form>

        </Col>
        <Col md={4} className="bg-success text-white p-3">
          <h3>Contacts</h3>
          <ListGroup>
            {contacts.map((contact) => (
              <ListGroup.Item
                key={contact.id}
                active={selectedContact && selectedContact.id === contact.id}
                onClick={() => handleContactClick(contact)}
                style={{ cursor: 'pointer', backgroundColor: selectedContact && selectedContact.id === contact.id ? '#28a745' : '' }}
                className="border-0"
              >
                <Image src={`https://i.pravatar.cc/30?u=${contact.id}`} roundedCircle width="30" height="30" className="mr-2" />
                {contact.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
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

export default contacts;
