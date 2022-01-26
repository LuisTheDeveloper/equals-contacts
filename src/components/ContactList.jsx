import React from 'react';
import styled from 'styled-components';

export const Card = styled.div`
  box-shadow: 0 0 28px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  margin: 2rem 2rem 2rem 0;
  padding: 1.5rem;
  transition: transform .3s ease;
  width: 250px;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 800;

`;

export const Body = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledImage = styled.img`
  border-radius: 50%;
  width: 50%;
`;

const doSomething = (details) => {
  console.log(details)
}

const ContactList = ({contactData}) => {
  return (
    <Card>
      <Title>
        {contactData.name}
      </Title>
      <Body onClick={() => doSomething(contactData)}>
        <StyledImage src={contactData.avatar}/>
      </Body>         
    </Card>
  )
};

export default ContactList;
