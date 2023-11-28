import React, { useState, useEffect } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Modal from 'react-modal';
import CustomerList from './componets/CustomerList';
import CustomerForm from './componets/CustomerForm';
import ModalFormButton from './componets/ModalFormButton/ModalFormButton';
import CustomerType from './sharedInterfaces/CustomerType';
import SearchBar from './componets/SearchBar';
import { useAppContext } from './contexts/AppContext';
import FileUpload from './componets/FileUploader';
import ServiceType from './sharedInterfaces/ServiceType';

const App: React.FC = () => {
  const storedCustomersJSON = localStorage.getItem('customers');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [uploadedData, setUploadedData] = useState<CustomerType[]>([]);
  const existingCustomers: CustomerType[] = storedCustomersJSON ? JSON.parse(storedCustomersJSON) : [];
  const [allCustomers, setAllCustomers] = useState<CustomerType[]>(existingCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerType[]>(allCustomers);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(allCustomers));
    setSearchTerm('');
    setFilteredCustomers(allCustomers);
  }, [allCustomers]);

  const { closeModal, openModal, modalIsOpen, setLocation, customerIndex } = useAppContext() as {
    closeModal: () => void;
    openModal: () => void;
    modalIsOpen: boolean;
    setLocation: (location: string) => void;
    customerIndex?: number;
  };

  const handleDataUpload = (data: CustomerType[]) => {
    if (JSON.stringify(data) !== JSON.stringify(uploadedData)) {
      setUploadedData(data);
      setAllCustomers(prevCustomers => {
        const uniqueCustomers = data.filter(newCustomer => {
          return !prevCustomers.some(
            existingCustomer =>
              newCustomer.firstName === existingCustomer.firstName &&
              newCustomer.lastName === existingCustomer.lastName &&
              newCustomer.year === existingCustomer.year,
          );
        });
        return [...prevCustomers, ...uniqueCustomers];
      });
      const filtered = allCustomers.filter(customer => {
        const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
      setFilteredCustomers(filtered);
    }
  };

  const handleSave = async (
    serviceValues: { code?: number | string; desc?: string; date?: string; cost?: number | string },
    firstName?: string,
    lastName?: string,
    make?: string,
    model?: string,
    year?: number,
  ) => {
    const formattedCost =
      typeof serviceValues.cost === 'number'
        ? serviceValues.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        : serviceValues.cost;

    if (customerIndex || customerIndex === 0) {
      const newCustomerArray = [...allCustomers];
      newCustomerArray[customerIndex] = {
        ...newCustomerArray[customerIndex],
        services: [
          ...(newCustomerArray[customerIndex].services ?? []),
          { ...serviceValues, cost: formattedCost } as ServiceType,
        ],
      };
      setAllCustomers(newCustomerArray);

      const filtered = allCustomers.filter(customer => {
        const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
      setFilteredCustomers(filtered);
    } else {
      setAllCustomers((prevCustomers: CustomerType[]) => [
        ...prevCustomers,
        {
          firstName: firstName || '',
          lastName: lastName || '',
          year: year || 0,
          make: make || '',
          model: model || '',
          services: [{ ...serviceValues, cost: formattedCost } as ServiceType],
        },
      ]);
      const filtered = allCustomers.filter(customer => {
        const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
      setFilteredCustomers(filtered);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    const filtered = allCustomers.filter(customer => {
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      return fullName.includes(value.toLowerCase());
    });
    setFilteredCustomers(filtered);
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
          {allCustomers.length > 0 && <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />}

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

