import React, {createContext, useState} from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import Button from './Button';
import Modal from '@mui/material/Modal';
import EditForm from './EditForm';

export const Card = styled.div`
  border-radius: 3px 3px 0 0;
  box-shadow: 0 0 28px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 2rem 2rem 0.5rem 0;
  padding: 1.5rem;
  transition: transform .3s ease;
  width: 250px;

  &:hover {
    transform: scale(1.1);
  }
`;

export const CardButtons = styled.div`
  border-radius: 3px 3px 0 0;
  box-shadow: 0 0 28px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0.5rem;
  width: 17.7rem;

`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
`;

export const StyledImage = styled.img`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 50%;
  margin-top: 1rem;
  width: 50%;
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EditModeContext = createContext(null);

const ContactList = ({contactData, refresh}) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [mode, setMode] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const displayDetails = (details) => {
    setMode(null);
    setEdit(false);
    setOpen(true);
  }
  
  const editDetails = (details) => {
    setMode("edit");
    setEdit(true);
    setOpen(true);
  }

  const deleteContact = () => {
    setMode("delete");
    setEdit(false);
    setOpen(true);
  }

  const addContact = () => {
    setMode("add");
    setEdit(true);
    setOpen(true);
  }

  return (
    <div>
      <Card>
        <Title>
          {contactData.name}
        </Title>
        <Tooltip title="Click for contact details">
          <Wrapper onClick={() => displayDetails(contactData)}>
            <StyledImage src={contactData.avatar}/>
          </Wrapper>
        </Tooltip>
      </Card>
      <CardButtons>
        <Button
            cursor="default"
            variant="transparent"
            height="2rem"
            title="Edit Contact"
            width="3rem"
            onClick={() => editDetails(contactData)}
          ><EditIcon/></Button>
        <Button
            cursor="default"
            variant="transparent"
            height="2rem"
            title="Delete Contact"
            width="3rem"
            onClick={() => deleteContact(contactData)}
          ><DeleteIcon/>
        </Button>
        <Button
            cursor="default"
            variant="transparent"
            height="2rem"
            title="Add Contact"
            width="3rem"
            onClick={() => addContact(contactData)}
          ><AddIcon/>
        </Button>                    
      </CardButtons>
      <Modal
        open={open}
        onClose={handleClose}  
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"  
      >
        <div>
        <EditModeContext.Provider value={mode}>
          <EditForm contact={contactData} edit={edit} close={() => setOpen(false)} refresh={refresh}/>
        </EditModeContext.Provider>
        </div>
      </Modal>
    </div>
  )
};

export {ContactList, EditModeContext};
