import {useState, useEffect} from 'react';
import styled from 'styled-components';
import ContactList from './components/ContactList';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const App = () => {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    (async () => {
      let contactsData;
      try {
        const response = await fetch('https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts');
        contactsData = await response.json();
      } catch (error) {
        console.log(error)
        contactsData = [];
      }
    setContacts(contactsData)
    })();
  },[])

  return (
    <Wrapper>
      {contacts.map((contact, index) => (
        <ContactList contactData={contact} key={contact.id}/>
      ))}
  </Wrapper>
  );
};

export default App;
