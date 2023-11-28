import React from 'react';
import { StyledButton } from './Button.styles';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: void | ((location: string) => void);
  color?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const buttonSize = {
  small: '10px',
  medium: '15px',
  large: '25px',
};

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
