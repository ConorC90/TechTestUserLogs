import React, { useState, useEffect } from 'react';
import CustomerList from './componets/CustomerList/CustomerList';
import CustomerForm from './componets/CustomerForm/CustomerForm';
import GlobalStyle from './styles/GlobalStyle';
import Modal from 'react-modal';
import ModalFormButton from './componets/ModalFormButton/ModalFormButton';
import CustomerType from './sharedInterfaces/CustomerType';
// import Header from './componets/Header/Header';
import SearchBar from './componets/SearchBar/SearchBar';

// Customer data
const customers = [
  {
    firstName: 'Kathy',
    lastName: 'Barker',
    year: 2016,
    make: 'Ford',
    model: 'Focus',
    services: [
      { code: 1001, desc: 'Oil change', date: 'January 25, 2019', cost: 20.71 },
      { code: 1001, desc: 'Oil change', date: 'April 3, 2019', cost: 22.13 },
      { code: 1001, desc: 'Oil change', date: 'August 5, 2019', cost: 22.13 },
      { code: 1009, desc: 'Brake pad replacement', date: 'August 5, 2019', cost: 258.41 },
    ],
  },
  {
    firstName: 'Ralph',
    lastName: 'Benson',
    year: 2014,
    make: 'Honda',
    model: 'Civic',
    services: [
      { code: 1001, desc: 'Oil change', date: 'March 13, 2019', cost: 36.42 },
      { code: 1003, desc: 'A/C recharge', date: 'March 13, 2019', cost: 206.14 },
    ],
  },
  {
    firstName: 'Bob',
    lastName: 'Douglas',
    year: 2016,
    make: 'Ford',
    model: 'F-150',
    services: [{ code: 1005, desc: "Tire patch (driver's side front)", date: 'May 12, 2020', cost: 0 }],
  },
  {
    firstName: 'Omar',
    lastName: 'Adams',
    year: 2017,
    make: 'Kia',
    model: 'Sorento',
    services: [{ code: 1006, desc: 'Rough shift from 2nd to 3rd', date: 'May 5, 2020', cost: 223.43 }],
  },
];

const App: React.FC = () => {
  const storedCustomers = localStorage.getItem('customers');
  const initialCustomers = storedCustomers ? JSON.parse(storedCustomers) : customers;
  const [customersState, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customersState));
  }, [customersState]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSave = async (
    firstName: string,
    lastName: string,
    make: string,
    model: string,
    serviceValues: { code: number; date: string; cost: number },
  ) => {
    setCustomers((prevCustomers: any) => [
      ...prevCustomers,
      {
        firstName: firstName,
        lastName: lastName,
        year: 2022,
        make: make,
        model: model,
        services: [serviceValues],
      },
    ]);
  };

  const filteredCustomers = customersState.filter((customer: CustomerType) => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    // Add any additional search-related logic if needed
  };

  return (
    <>
      <GlobalStyle />
      <div className="app-container">
        <div className="content-container">
          {/* <Header></Header> */}
          <h1>Auto Repair Shop App</h1>
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <input
            type="text"
            placeholder="Search by customer name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <CustomerList customers={filteredCustomers} />
          <ModalFormButton onClick={modalIsOpen ? closeModal : openModal} modalIsOpen={modalIsOpen}></ModalFormButton>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal">
            <CustomerForm onSave={handleSave} />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default App;

