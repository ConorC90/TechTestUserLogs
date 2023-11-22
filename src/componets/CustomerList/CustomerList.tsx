// CustomerList.tsx
import React from 'react';
import { CustomerListContainer } from './CustomerList.styles';
import CardContainer from '../CustomerCard/CustomerCard';

interface Customer {
  firstName: string;
  lastName: string;
  year: number;
  make: string;
  model: string;
  services: Array<{
    code: number;
    desc: string;
    date: string;
    cost: number;
  }>;
}

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  return (
    <CustomerListContainer>
      {customers.map((customer, index) => (
        <CardContainer customer={customer} key={index}></CardContainer>
      ))}
    </CustomerListContainer>
  );
};

export default CustomerList;
