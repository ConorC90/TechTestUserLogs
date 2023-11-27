import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: void | ((location: string) => void);
  color?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const buttonSize = {
  small: '10px',
  medium: '15px',
  large: '25px',
};

const StyledButton = styled.button<ButtonProps>`
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

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color,
  size,
  fullWidth,
  style,
  disabled,
  type = 'button',
  ...rest
}) => {
  return (
    <StyledButton
      onClick={onClick}
      color={color}
      size={size}
      fullWidth={fullWidth}
      style={style}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
