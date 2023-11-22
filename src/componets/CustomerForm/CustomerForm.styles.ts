// components/CustomerForm/styles.ts
import styled from 'styled-components';

export const FormContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const FormInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 10px;
`;

export const FormButton = styled.button`
  width: 100%;
  box-sizing: border-box;
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: #ddd;
    color: #555;
    cursor: not-allowed;
  }
`;
