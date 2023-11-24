import React from 'react';

const WarningMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div style={{ backgroundColor: 'yellow', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      {message}
    </div>
  );
};

export default WarningMessage;
