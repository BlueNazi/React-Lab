import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ContactPage = ({ contacts }) => {
  const { id } = useParams(); 
  const contact = contacts[id];


  useEffect(() => {
    if (contact) {
      let visitedContacts = JSON.parse(localStorage.getItem('frequentContacts')) || [];
      visitedContacts = [contact, ...visitedContacts.filter(c => c.phone !== contact.phone)];
      localStorage.setItem('frequentContacts', JSON.stringify(visitedContacts));
    }
  }, [contact]);
  
  if (!contact) {
    return <p>Contact not found!</p>;
  }

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
