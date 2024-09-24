import React from 'react';
import { Link } from 'react-router-dom';
import './ContactList.css';

const ContactList = ({ contacts }) => {
  return (
    <div className="contact-list">
      {contacts.map((contact, index) => (
        <div key={index} className="contact-card">
          <img src={contact.picture.thumbnail} alt={`${contact.name.first} ${contact.name.last}`} />
          <h3>{contact.name.first} {contact.name.last}</h3>
          <p>{contact.phone}</p>
          <p>{contact.location.city}</p>
          <Link to={`/contact/${index}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
