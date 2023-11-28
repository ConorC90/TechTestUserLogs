import React, { useState, ChangeEvent, useEffect } from 'react';
import CustomerType from '../../sharedInterfaces/CustomerType';
import { FileUploadContainer, FileInputLabel, FileInput } from './FileUploader.styles';
import { parseText } from './FileUploader.helpers';
interface FileUploadProps {
  config: CustomerType;
  onDataUpload: (data: CustomerType[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ config, onDataUpload }) => {
  const [data, setData] = useState<CustomerType[]>([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = e => {
        const content = e.target?.result as string;
        const parsedData = parseText(content);
        setData(parsedData);
      };

      reader.readAsText(file);
    }
  };

  useEffect(() => {
    onDataUpload(data);
  }, [data, onDataUpload]);

  return (
    <FileUploadContainer>
      <FileInputLabel htmlFor="fileInput">Upload a file:</FileInputLabel>
      <FileInput type="file" id="fileInput" onChange={handleFileUpload} />
    </FileUploadContainer>
  );
};

export default FileUpload;
