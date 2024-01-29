import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Navbar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Messages from "./Messages";
import "./index.css";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchContactsAndChats = async () => {
      try {
        const contactsResponse = await fetch("http://127.0.0.1:5555/contacts");
        const contactsData = await contactsResponse.json();
        setContacts(contactsData);

        const chatsResponse = await fetch("http://127.0.0.1:5555/messages");
        const chatsData = await chatsResponse.json();
        setChats(chatsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContactsAndChats();
  }, []);

  const handleExit = () => {
    if (window.confirm("Exiting Chit_chat?")) {
      navigate("/login");
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleAddContact = () => {
    if (newContactName.trim() !== "") {
      const newContact = {
        id: contacts.length + 1,
        first_name: newContactName,
      };

      setContacts([...contacts, newContact]);
      setNewContactName("");
    }
  };

  return (
      <Container fluid className="bg-light min-vh-100">
      <Navbar bg="success" variant="dark" className="justify-content-between">
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button variant="danger" onClick={handleExit}>
              <FaSignOutAlt />
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

      <Row className="h-100">
        <Col md={4} className="bg-success text-white p-3">
          <h3>
            Chit-Chat Contacts{" "}
            <span className="ml-2">
              <Button variant="light" onClick={handleAddContact}>
                <strong>+</strong>
              </Button>
            </span>
          </h3>
          <ListGroup>
            {contacts.map((contact) => (
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
          <Row className="bg-secondary text-white p-2 mb-2">
            <Col>
              <h4>
                {selectedContact ? selectedContact.name : "Select a contact"}
              </h4>
            </Col>
          </Row>

          <div className="chat-container">
            <div className="chat-messages">
              {selectedContact &&
                chats
                  .filter((chat) => chat.userId === selectedContact.id)
                  .map((chat) => (
                    <div key={chat.id} className="chat-message">
                      <strong>{selectedContact.name}:</strong> {chat.title}
                    </div>
                  ))}

              <Col md={17} className="bg-success text-white p-3">
                <Messages />
              </Col>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacts;
