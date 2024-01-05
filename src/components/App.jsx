// App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { addContact, deleteContact, setFilter } from './contactsSlice';

const Heading = styled.h1`
  font-size: 2em;
  color: #333;
`;

const AppContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      dispatch(addContact(JSON.parse(savedContacts)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContactHandler = ({ name, number, id }) => {
    dispatch(addContact({ name, number, id }));
  };

  const deleteContactHandler = contactId => {
    dispatch(deleteContact(contactId));
  };

  const changeFilterHandler = e => {
    dispatch(setFilter(e.target.value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      contact =>
        contact.name?.toLowerCase().includes(normalizedFilter) ||
        contact.number?.includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <AppContainer>
      <Heading>Phonebook</Heading>
      <ContactForm onSubmit={addContactHandler} />
      <Heading>Contacts</Heading>
      <Filter value={filter} onChange={changeFilterHandler} />
      <ContactList contacts={visibleContacts} onDelete={deleteContactHandler} />
    </AppContainer>
  );
};

export default App;
