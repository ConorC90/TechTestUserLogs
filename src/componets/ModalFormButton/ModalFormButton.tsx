// YourFormComponentButton.tsx
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const StyledButton = styled(Button)`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 10;
`;

interface ModalFormButtonType {
  onClick: any;
  modalIsOpen: boolean;
}

const ModalFormButton: React.FC<ModalFormButtonType> = ({ onClick, modalIsOpen }) => {
  console.log(onClick, modalIsOpen, 'onClick');
  return (
    <StyledButton color={modalIsOpen ? 'red' : 'green'} onClick={onClick}>
      {modalIsOpen ? 'Close' : 'Add Service log'}
    </StyledButton>
  );
};

export default ModalFormButton;
