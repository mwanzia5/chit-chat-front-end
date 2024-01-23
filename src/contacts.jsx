import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// const App = () => {
//     const [contacts, setContacts] = useState([]);
//     const [selectedContact, setSelectedContact] = useState(null);
//     useEffect(() => {
//     // Fetch the API 
//           .then(response => setContacts(response.data))
//           .catch(error => console.error('Error fetching contacts:', error));
//       }, []);

      const handleContactClick = (contact) => {
      const previousSelectedContact = document.querySelector('.list-group-item.selected');
        if (previousSelectedContact) {
          previousSelectedContact.classList.remove('selected');
        }

        const clickedContact = document.querySelector(`.list-group-item[data-id="${contact.id}"]`);
        if (clickedContact) {
          clickedContact.classList.add('selected');
        }

        setSelectedContact(contact);
    };
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              {/* Contacts List */}
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title">Contacts</h5>
                  <ul className="list-group">
                    {contacts.map((contact) => (
                      <li
                        key={contact.id}
                        data-id={contact.id}
                        onClick={() => handleContactClick(contact)}
                        className="list-group-item d-flex align-items-center cursor-pointer"
                      >
                        <img
                          src={`https://i.pravatar.cc/50?img=${contact.id}`}
                          alt={contact.name}
                          className="rounded-circle mr-2"
                        />
                        {contact.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              {/* Selected Contact Details */}
              <div className="card mt-4">
                <div className="card-body">
                  {selectedContact ? (
                    <div>
                      <h5 className="card-title">{selectedContact.name}</h5>
                      <img
                        src={`https://i.pravatar.cc/100?img=${selectedContact.id}`}
                        alt={selectedContact.name}
                        className="rounded-circle mb-4"
                      />
                      {/* Add chat messages here */}
                    </div>
                  ) : (
                    <p className="text-center">Select a contact to start chatting.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
                  

    export default contacts;