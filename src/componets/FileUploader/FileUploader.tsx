import React, { useState, ChangeEvent, useEffect } from 'react';
import CustomerType from '../../sharedInterfaces/CustomerType';
export interface DataConfig {
  firstName: string;
  lastName: string;
  year: string;
  make: string;
  model: string;
  services: {
    code: string;
    desc: string;
    date: string;
    cost: string;
  }[];
}

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

  const parseText = (text: string): any[] => {
    const lines = text.split('\n');
    const customers: any[] = [];
    let currentPerson: any | null = null;

    lines.forEach(line => {
      const [key, value] = line.split(':').map(item => item.trim());

      if (key && value) {
        if (key === 'First name') {
          currentPerson = { firstName: value, lastName: '', year: '', make: '', model: '', services: [] };
          customers.push(currentPerson);
        } else if (currentPerson) {
          switch (key) {
            case 'Last name':
              currentPerson.lastName = value;
              break;
            case 'Year':
              currentPerson.year = value;
              break;
            case 'Make':
              currentPerson.make = value;
              break;
            case 'Model':
              currentPerson.model = value;
              break;
            case 'Code':
              if (
                currentPerson.services.length === 0 ||
                currentPerson.services[currentPerson.services.length - 1].desc
              ) {
                currentPerson.services.push({ code: value, desc: '', date: '', cost: '' });
              } else {
                currentPerson.services[currentPerson.services.length - 1].code = value;
              }
              break;
            case 'Desc':
              currentPerson.services[currentPerson.services.length - 1].desc = value;
              break;
            case 'Date':
              currentPerson.services[currentPerson.services.length - 1].date = value;
              break;
            case 'Cost':
              currentPerson.services[currentPerson.services.length - 1].cost = value;
              break;
            default:
              break;
          }
        }
      }
    });

    return customers;
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;
