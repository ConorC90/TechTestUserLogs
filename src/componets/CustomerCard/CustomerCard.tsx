// components/CustomerCard.tsx
import React from 'react';
import {
  CardContainer,
  ServiceList,
  ServiceListItem,
  ServiceDetailsList,
  ServiceDetailsListItem,
} from './CustomerCard.styles';
import CustomerType from '../../sharedInterfaces/CustomerType';

const CustomerCard: React.FC<{ customer: CustomerType }> = ({ customer }) => {
  if (!customer) {
    return <div>No customer data</div>;
  }

  return (
    <>
      <CardContainer>
        <h2>{`${customer.firstName} ${customer.lastName}`}</h2>
        <p>{`Year: ${customer.year}, Make: ${customer.make}, Model: ${customer.model}`}</p>
        {customer.services.length === 1 ? 'Service:' : 'Services:'}
        <ServiceList>
          {customer.services.map((service: any, index: number) => (
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
    </>
  );
};

export default CustomerCard;
