import React, { useState } from 'react';
import {
  CardContainer,
  ServiceList,
  ServiceListItem,
  ServiceDetailsList,
  ServiceDetailsListItem,
  StyledTable,
} from './CustomerCard.styles';
import CustomerType from '../../sharedInterfaces/CustomerType';
import ServiceType from '../../sharedInterfaces/ServiceType';
import WarningMessage from '../WarningMessage';
import Button from '../Button';
import { useModalContext } from '../../contexts/ModalContext';

const CustomerCard: React.FC<{ customer: CustomerType }> = ({ customer }) => {
  const { openModal } = useModalContext();
  const [services, setServices] = useState(customer.services);

  const handleSave = async (serviceValues: { code: number | undefined; date: string; cost: number | undefined }) => {
    setServices((prevServices: any[]) => [
      ...prevServices,
      {
        services: [{ code: 122, date: '1990 / 12 / 12', cost: 789 }],
      },
    ]);
  };

  if (!customer) {
    return (
      <CardContainer>
        <WarningMessage message="No customer data"></WarningMessage>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <h2>{`${customer.firstName} ${customer.lastName}`}</h2>
      <Button onClick={openModal('addService')} size="small">
        Add a service
      </Button>
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
      {services.length === 1 ? 'Service:' : 'Services:'}
      <ServiceList>
        {services.map((service: ServiceType, index: number) => (
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
