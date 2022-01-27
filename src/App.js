import {createContext, useState, useEffect} from 'react';
import styled from 'styled-components';
import {ContactList} from './components/ContactList';
import { fetchWrapper } from './services/fetch';
import { getNewId } from './services/utils';
import TextField from '@mui/material/TextField';

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

export const FilterDiv = styled.div`
  padding: 1rem;
`;

export const IdContext = createContext(0);

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    (async () => {
      try {
        return fetchWrapper
          .get('contacts')
          .then((response) => {
            setContacts(response)
            setRefresh(false);
            return response;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
      } catch (error) {
        console.log(error)
        return error;
      }
    })();
  },[refresh])

  useEffect(() => {
    if( Array.isArray(contacts) && contacts.length > 0) {
      const filteredData = contacts.filter((item) => item.name.toLowerCase().includes(searchTerm));
      setContacts(filteredData);
    }

    if(searchTerm === '') setRefresh(true);

  }, [searchTerm]);

  const newId = getNewId(contacts);

  return (
    <Container>
      <Wrapper>
        <TableTitle>Contacts List</TableTitle>
        <FilterDiv>
          <TextField
            placeholder="Search Contact Name"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </FilterDiv>        
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
