import React from 'react';
import { CustomerListContainer } from './CustomerList.styles';
import CustomerCard from '../CustomerCard/CustomerCard';
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
        <CustomerCard customerIndex={index} customer={customer} key={index}></CustomerCard>
      ))}
    </CustomerListContainer>
  );
};

export default CustomerList;
