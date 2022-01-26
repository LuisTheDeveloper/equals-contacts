import {createContext, useState, useEffect} from 'react';
import styled from 'styled-components';
import {ContactList} from './components/ContactList';
import { fetchWrapper } from './services/fetch';
import { getNewId } from './services/utils';

export const Container = styled.div`
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    max-width: 1140px;
    width: 100%;
`;

export const TableTitle = styled.div`
    background: #435d7d;
    border-radius: 3px 3px 0 0;
    color: #fff;
    font-size: 2rem;
    font-weight: 800;
    min-width: 100%;
    padding: 16px 30px;
    text-align: center;
`;

export const Wrapper = styled.div`
    align-items: center;
    background: #ffffff;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgb(0 0 0 / 5%);  
    display: flex;
    flex-direction: column;
    min-width: 1000px;
    padding: 2rem;
`;

export const IdContext = createContext(0);

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      let contactsData;
      try {
        return fetchWrapper
          .get('contacts')
          .then((response) => {
            contactsData = response
            setContacts(contactsData)
            setRefresh(false);
            return contactsData;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
      } catch (error) {
        console.log(error)
        contactsData = [];
      }
    })();
  },[refresh])

  const newId = getNewId(contacts);

  return (
    <Container>
      <Wrapper>
        <TableTitle>Contacts List</TableTitle>
        {contacts.map((contact, index) => (
          <IdContext.Provider value={newId}>
            <ContactList contactData={contact} key={contact.id} refresh={() => setRefresh(true)}/>
          </IdContext.Provider>
        ))}
    </Wrapper>
  </Container>
  );
};

export default App;
