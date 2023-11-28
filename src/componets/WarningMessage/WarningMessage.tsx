import React from 'react';
import { StyledWarningMessage } from './WarningMessage.styles';

const WarningMessage: React.FC<{ message: string }> = ({ message }) => {
  return <StyledWarningMessage>{message}</StyledWarningMessage>;
};

export default WarningMessage;
