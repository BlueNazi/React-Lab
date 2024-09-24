import React, { useEffect, useState } from 'react';

const FrequentContacts = ({ refresh }) => {
  const [frequentContacts, setFrequentContacts] = useState([]);

  useEffect(() => {
    const visitedContacts = JSON.parse(localStorage.getItem('frequentContacts')) || [];
    setFrequentContacts(visitedContacts.slice(0, 4)); 
  }, [refresh]); 

  return (
    <div>
      <h2>Frequently Visited Contacts</h2>
      {frequentContacts.length > 0 ? (
        frequentContacts.map((contact, index) => (
          <div key={index}>
            <h4>{contact.name.first} {contact.name.last}</h4>
            <p>{contact.phone}</p>
          </div>
        ))
      ) : (
        <p>No recently visited contacts.</p> 
      )}
    </div>
  );
};

export default FrequentContacts;
