import React from 'react';
import { CustomerListContainer } from './CustomerList.styles';
import CardContainer from '../CustomerCard/CustomerCard';
import CustomerType from '../../sharedInterfaces/CustomerType';
import WarningMessage from '../WarningMessage';
interface CustomerListProps {
  customers: CustomerType[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  if (customers.length === 0) {
    return <WarningMessage message="No customers found"></WarningMessage>;
  }
  return (
    <CustomerListContainer>
      {customers.map((customer, index) => (
        <CardContainer customer={customer} key={index}></CardContainer>
      ))}
    </CustomerListContainer>
  );
};

export default CustomerList;
