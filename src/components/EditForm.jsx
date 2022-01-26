import {useContext} from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import Button from './Button';
import { EditModeContext } from './ContactList';
import { setTransaction } from '../services/utils';

export const Card = styled.div`
    background-color: white;
    border-radius: 3px 3px 0 0;
    box-shadow: 0 0 28px 4px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    left: 41%;
    margin: 2rem 2rem 0.5rem 0;
    position: absolute;
    padding: 1.5rem;
    top: 14%;
    width: 35%;
`;

export const ButtonWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
`;

export const StyledSeparator = styled.div`
    border-radius: 125px/12px;
    box-shadow: 0 1px 1px #a9a1a1;
    display: block;
    height: 1px;
    margin-bottom: 1rem;
    width: 100%;
`;

export const TextWrapper = styled.div`
    padding-bottom: 1rem;
    text-align: center;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding-bottom: 1rem;
`;

const EditForm = ({contact, edit, close, refresh}) =>{
    const mode = useContext(EditModeContext);
    const id = contact.id;

    const [name, setName] = useState(contact.name);
    const [birthday, setBirthday] = useState(contact.birthday);
    const [email, setEmail] = useState(contact.email);
    const [phone, setPhone] = useState(contact.phone);

    const handleSubmit = (e) => {
        const body = {
            id: id,
            name: name,
            birthday: birthday,
            email: email,
            phone: phone,
        }

        setTransaction(mode, body);
        close();
        refresh();
    }

     return (
            <Card>
                    {mode === "edit" && <>
                        <TextWrapper>Edit Contact</TextWrapper>
                        <StyledSeparator/>
                        </>
                    }
                    {mode === "add" && <>
                        <TextWrapper>Add Contact</TextWrapper>
                        <StyledSeparator/>
                        </>
                    }     
                    {mode === "delete" && <>
                        <TextWrapper>Delete Contact</TextWrapper>
                        <StyledSeparator/>
                        </>
                    }                                     
                    <div>
                        <form
                            onSubmit={(e) => { 
                                e.preventDefault();
                                handleSubmit(e);
                                }
                            }                    
                        >
                        <Wrapper>
                            <TextField
                                disabled={!edit}
                                id="name"
                                label="Name"
                                defaultValue={mode !== "add" ? name : null}
                                fullWidth={true}
                                size='small'
                                onChange={(e)=> setName(e.target.value)}
                            />            
                        </Wrapper>

                        <Wrapper>
                            <TextField
                                disabled={!edit}
                                id="email"
                                label="Email"
                                defaultValue={mode !== "add" ? email : null}
                                fullWidth={true}
                                size='small'         
                                onChange={(e)=> setEmail(e.target.value)}            
                            />   
                        </Wrapper>
                        <Wrapper>
                            <TextField
                                disabled={!edit}
                                id="birthday"
                                label="Birthday"
                                defaultValue={mode !== "add" ? birthday : null}
                                size='small'       
                                onChange={(e)=> setBirthday(e.target.value)}                      
                            />                             
                            <TextField
                                disabled={!edit}
                                id="phone"
                                label="Phone"
                                defaultValue={mode !== "add" ? phone : null}
                                size='small'      
                                onChange={(e)=> setPhone(e.target.value)}                       
                            />                
                        </Wrapper>     
                        { (edit || mode === "delete") &&
                        <>
                            <StyledSeparator/>
                                <ButtonWrapper>
                                    <Button 
                                        variant="success"
                                        height="2rem"
                                        width="5rem"
                                        type="submit"
                                        onClick={() => {}}
                                    >
                                        Submit
                                    </Button>
                                </ButtonWrapper>                                         
                        </>
                        }
                        </form>
                    </div>
            </Card>
     )
}

export default EditForm;