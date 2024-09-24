import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ContactPage = ({ contacts, onUpdateVisited }) => {
  const { id } = useParams(); 
  const contact = contacts[id];

  if (!contact) {
    return <p>Contact not found!</p>;
  }

  useEffect(() => {
    let visitedContacts = JSON.parse(localStorage.getItem('frequentContacts')) || [];

    visitedContacts = visitedContacts.filter(c => c.phone !== contact.phone);

    visitedContacts.unshift(contact);

    localStorage.setItem('frequentContacts', JSON.stringify(visitedContacts));

    onUpdateVisited(); 
  }, [contact, onUpdateVisited]);

  return (
    <div>
      <h1>{contact.name.first} {contact.name.last}</h1>
      <img src={contact.picture.large} alt={`${contact.name.first} ${contact.name.last}`} />
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>City:</strong> {contact.location.city}</p>
      <p><strong>Email:</strong> {contact.email}</p>
    </div>
  );
};

export default ContactPage;
