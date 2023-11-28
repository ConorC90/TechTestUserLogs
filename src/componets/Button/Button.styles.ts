import styled from 'styled-components';
import { ButtonProps, buttonSize } from './Button';

export const StyledButton = styled.button<ButtonProps>`
  --button-bg-color: ${props => (props.disabled ? 'gray' : props.color || 'blue')};
  background-color: var(--button-bg-color);
  color: white;
  padding: ${props => buttonSize[props.size || 'medium']};
  border: none;
  height: fit-content;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  transition: background-color 0.3s ease;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 10px 0 white inset, 0 0 20px 2px;
  }
`;
