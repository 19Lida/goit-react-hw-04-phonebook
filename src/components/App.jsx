import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const contactsRef = useRef(contacts.lenght);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts([...savedContacts]);
    }
  }, []);
  useEffect(() => {
    if (contactsRef.current === contacts.length) {
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
    contactsRef.current = contacts.length;
  }, [contacts]);
  const handleSubmit = data => {
    const name = data.name;

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);

      return;
    }
    setContacts(prevState => {
      const number = data.number;
      const id = nanoid();
      const contact = { id, name, number };
      return [contact, ...prevState];
    });
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onDeleting = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onHandleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactList contacts={getVisibleContacts()} deleting={onDeleting} />
    </>
  );
};
