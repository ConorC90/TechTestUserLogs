import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}

const StyledButton = styled.button<{ color?: string }>`
  background-color: ${props => (props.color ? props.color : 'blue')};
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 10px 0 white inset, 0 0 20px 2px;
  }
`;

const Button: React.FC<ButtonProps> = ({ onClick, children, color, style, ...rest }) => {
  return (
    <StyledButton onClick={onClick} color={color} style={style} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
