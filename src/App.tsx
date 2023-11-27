import React, { useState, useEffect } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Modal from 'react-modal';
import CustomerList from './componets/CustomerList';
import CustomerForm from './componets/CustomerForm';
import ModalFormButton from './componets/ModalFormButton/ModalFormButton';
import CustomerType from './sharedInterfaces/CustomerType';
import SearchBar from './componets/SearchBar';
import { useModalContext } from './contexts/ModalContext';
import FileUpload from './componets/FileUploader';

const App: React.FC = () => {
  const storedCustomers = localStorage.getItem('customers');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [uploadedData, setUploadedData] = useState<CustomerType[]>([]);
  const initialCustomers = storedCustomers ? JSON.parse(storedCustomers) : uploadedData;
  const [customersState, setCustomers] = useState(initialCustomers);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customersState));
  }, [customersState]);

  const { closeModal, openModal, modalIsOpen, setLocation, customerIndex } = useModalContext();

  const handleDataUpload = (data: any[]) => {
    setUploadedData(data);
  };

  const handleSave = async (
    serviceValues: { code: number | string; date: string; cost: number | string },
    firstName?: string,
    lastName?: string,
    make?: string,
    model?: string,
    year?: number,
  ) => {
    if (customerIndex || customerIndex === 0) {
      const newCustomerArray = [...filteredCustomers];
      newCustomerArray[customerIndex] = {
        ...newCustomerArray[customerIndex],
        services: [...newCustomerArray[customerIndex].services, serviceValues],
      };
      setCustomers(newCustomerArray);
    } else {
      setCustomers((prevCustomers: CustomerType[]) => [
        ...prevCustomers,
        {
          firstName: firstName,
          lastName: lastName,
          year: year,
          make: make,
          model: model,
          services: [serviceValues],
        },
      ]);
    }
  };

  const filteredCustomers = customersState.filter((customer: CustomerType) => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleButtonClick = () => {
    openModal();
    setLocation('addCustomer');
  };

  const dataConfig: any = {
    firstName: 'First name',
    lastName: 'Last name',
    year: 'Year',
    make: 'Make',
    model: 'Model',
    services: ['Code', 'Desc', 'Date', 'Cost'],
  };

  return (
    <>
      <GlobalStyle />
      <div className="app-container">
        <div className="content-container">
          <h1>Auto Repair Shop App</h1>
          <FileUpload config={dataConfig} onDataUpload={handleDataUpload} />
          {customersState.length > 0 && <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />}

          <CustomerList customers={filteredCustomers} />
          <ModalFormButton
            onClick={modalIsOpen ? closeModal : handleButtonClick}
            modalIsOpen={modalIsOpen}
          ></ModalFormButton>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="New service entry Modal"
            appElement={document.getElementById('root') as HTMLElement}
          >
            <CustomerForm onSave={handleSave} />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default App;

