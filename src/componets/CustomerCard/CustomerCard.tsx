import React from 'react';
import {
  CardContainer,
  ServiceList,
  ServiceListItem,
  ServiceDetailsList,
  ServiceDetailsListItem,
  StyledTable,
  CardHeader,
} from './CustomerCard.styles';
import CustomerType from '../../sharedInterfaces/CustomerType';
import ServiceType from '../../sharedInterfaces/ServiceType';
import WarningMessage from '../WarningMessage';
import Button from '../Button';
import { useModalContext } from '../../contexts/ModalContext';

const CustomerCard: React.FC<{ customer: CustomerType; customerIndex: number }> = ({ customer, customerIndex }) => {
  const { openModal, setLocation, setCustomerindex } = useModalContext();

  if (!customer) {
    return (
      <CardContainer>
        <WarningMessage message="No customer data"></WarningMessage>
      </CardContainer>
    );
  }

  const handelButtonClick = () => {
    setCustomerindex(customerIndex);
    setLocation('addService');
    openModal();
  };

  return (
    <CardContainer>
      <CardHeader>
        <h2>{`${customer.firstName} ${customer.lastName}`}</h2>
        <Button onClick={handelButtonClick} size="small">
          Add a service
        </Button>
      </CardHeader>
      <StyledTable>
        <tbody>
          <tr>
            <td>Year:</td>
            <td>{customer.year}</td>
          </tr>
          <tr>
            <td>Make:</td>
            <td>{customer.make}</td>
          </tr>
          <tr>
            <td>Model:</td>
            <td>{customer.model}</td>
          </tr>
        </tbody>
      </StyledTable>
      {customer.services.length === 1 ? 'Service:' : 'Services:'}
      <ServiceList>
        {customer.services.map((service: ServiceType, index: number) => (
          <ServiceListItem key={index}>
            <ServiceDetailsList>
              <ServiceDetailsListItem>Description: {service.desc}</ServiceDetailsListItem>
              <ServiceDetailsListItem>Code: {service.code}</ServiceDetailsListItem>
              <ServiceDetailsListItem>Date: {service.date}</ServiceDetailsListItem>
              <ServiceDetailsListItem>Cost: ${service.cost}</ServiceDetailsListItem>
            </ServiceDetailsList>
          </ServiceListItem>
        ))}
      </ServiceList>
    </CardContainer>
  );
};

export default CustomerCard;
