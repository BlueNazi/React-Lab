import React, { useState, useEffect } from 'react';
import { fetchContacts } from '../services/api';
import SearchBar from '../components/SearchBar';
import ContactList from '../components/ContactList';
import FrequentContacts from '../components/FrequentContacts';

const HomePage = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadContacts = async () => {
      const fetchedContacts = await fetchContacts();
      setContacts(fetchedContacts);
    };
    loadContacts();
  }, []);

  const filteredContacts = contacts.filter(contact => 
    contact.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  return (
    <div>
      <h1>Contacts</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      <FrequentContacts contacts={contacts} />
      <ContactList contacts={filteredContacts} />
    </div>
  );
};

export default HomePage;
