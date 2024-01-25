import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Image, Form, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './index.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch contacts and chats from the backend API
    const fetchContactsAndChats = async () => {
      try {
        const contactsResponse = await fetch('http://127.0.0.1:5555/contacts');
        const contactsData = await contactsResponse.json();
        setContacts(contactsData);

        const chatsResponse = await fetch('http://127.0.0.1:5555/messages');
        const chatsData = await chatsResponse.json();
        setChats(chatsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContactsAndChats();
  }, []);

  const handleExit = () => {
    if (window.confirm('Exiting Chit_chat?')) {
      navigate('/login');
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleSendMessage = () => {
    if (selectedContact) {
      const newChat = {
        userId: selectedContact.id,
        id: chats.length + 1,
        title: newMessage,
      };

      setChats([...chats, newChat]);
      setNewMessage('');
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100">
      {/* Navbar for Chit-Chat title and exit icon */}
      <Navbar bg="success" variant="dark" className="justify-content-between">
        <Navbar.Brand>Chit-Chat</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button variant="danger" onClick={handleExit}>
              <FaSignOutAlt />
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

      {/* Main content */}
      <Row className="h-100">
        <Col md={4} className="bg-success text-white p-3">
          {/* Sidebar with contacts */}
          <h3>Chit-Chat Contacts</h3>
          <ListGroup>
            {contacts.map((contact) => (
              <ListGroup.Item
                key={contact.id}
                active={selectedContact && selectedContact.id === contact.id}
                onClick={() => handleContactClick(contact)}
                className="border-0 contact-list-item"
              >
                <Image src={`https://i.pravatar.cc/30?u=${contact.id}`} roundedCircle width="30" height="30" className="mr-2 avatar" />
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
                  .filter((chat) => chat.userId === selectedContact.id)
                  .map((chat) => (
                    <div key={chat.id} className="chat-message">
                      <strong>{selectedContact.name}:</strong> {chat.title}
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
    </Container>
  );
};

export default Contacts;
