import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  // const [contacts, setContacts] = localStorage('contacts', [
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ]);

  const contactsRef = contacts.lenght;
  // componentDidMount() {
  //   // з локалсторедж
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     // запис в локалсторедж
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts([...savedContacts]);
    }
  }, [setContacts]);
  useEffect(() => {
    if (contactsRef.current === contacts.length) {
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
    contactsRef.current = contacts.length;
  }, [contacts, contactsRef]);
  const handleSubmit = data => {
    const name = data.name;
    // const number = data.number;
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

  // const newContact = { id: nanoid(), name, number };
  // this.setState(prevState => ({
  //   contacts: [newContact, ...prevState.contacts],
  // }));

  const changeFilter = e => {
    setFilter(e.target.value);
  };
  const getVisibleContacts = () => {
    // const { contacts, filter } = this.state;
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
  // render() {
  //   const { filter } = this.state;
  //   const visibleContacts = this.getVisibleContacts();
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onHandleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactList contacts={getVisibleContacts} deleting={onDeleting} />
    </>
  );
};
