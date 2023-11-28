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
    console.log('world');
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
    const people: any[] = [];
    let currentPerson: any | null = null;

    lines.forEach(line => {
      const [key, value] = line.split(':').map(item => item.trim());

      if (key && value) {
        if (key === 'First name') {
          currentPerson = { firstName: value, lastName: '', year: '', make: '', model: '', services: [] };
          people.push(currentPerson);
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

    return people;
  };

  //   const parseText = (text: string, config: DataConfig): DataConfig[] => {
  //     const lines = text.split('\n');
  //     const dataList: DataConfig[] = [];
  //     let currentData: DataConfig | null = null;

  //     lines.forEach(line => {
  //       const keyValue = parseKeyValue(line);

  //       if (keyValue) {
  //         const { key, value } = keyValue;
  //         const firstKey = config[Object.keys(config)[0] as keyof DataConfig];

  //         console.log(keyValue);
  //         // console.log(currentData);
  //         if (key === firstKey) {
  //           currentData = { ...config, [firstKey]: value, services: [] };
  //           dataList.push(currentData);
  //         } else if (currentData) {
  //           const keyExistsInServices = currentData.services.some(service => service.code === key);

  //           if (keyExistsInServices) {
  //             const updatedServices = currentData.services.map(service =>
  //               service.code === key ? { ...service, [key]: value } : service,
  //             );
  //             currentData = { ...currentData, services: updatedServices };
  //           } else {
  //             currentData = { ...currentData, [key]: value };
  //           }
  //         }
  //       }
  //     });

  //     return dataList;
  //   };

  const parseKeyValue = (line: string): { key: string; value: string } | null => {
    const [key, value] = line.split(':').map(item => item.trim());
    return key && value ? { key, value } : null;
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;
