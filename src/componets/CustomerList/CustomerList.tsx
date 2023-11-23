import React from 'react';
import { CustomerListContainer } from './CustomerList.styles';
import CardContainer from '../CustomerCard/CustomerCard';
import CustomerType from '../../sharedInterfaces/CustomerType';
interface CustomerListProps {
  customers: CustomerType[];
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
