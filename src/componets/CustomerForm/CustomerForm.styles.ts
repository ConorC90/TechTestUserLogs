import styled from 'styled-components';

export const FormContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
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
  margin-top: 15px;

  &:disabled {
    background-color: #ddd;
    color: #555;
    cursor: not-allowed;
  }
`;
export const FormRow = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

export const StyledForm = styled.form`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
