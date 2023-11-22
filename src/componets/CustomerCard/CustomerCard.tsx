// components/CustomerCard.tsx
import React from 'react';
import { CardContainer, ServiceList, ServiceListItem } from './CustomerCard.styles';

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

const CustomerCard: React.FC<{ customer: Customer }> = ({ customer }) => {
  if (!customer) {
    return <div>No customer data</div>;
  }
  console.log(customer, 'customer');
  return (
    <>
      <CardContainer>
        <h2>{`${customer.firstName} ${customer.lastName}`}</h2>
        <p>{`Year: ${customer.year}, Make: ${customer.make}, Model: ${customer.model}`}</p>
        {customer.services.length === 1 ? 'Service:' : 'Services:'}
        <ServiceList>
          {customer.services.map((service: any, index: number) => (
            <ServiceListItem key={index}>
              <ul>
                <li>Description: ${service.desc}</li>
                <li>Code: ${service.code}</li>
                <li>Date: ${service.date}</li>
                <li>Cost: $${service.cost}</li>
              </ul>
            </ServiceListItem>
          ))}
        </ServiceList>
      </CardContainer>
    </>
  );
};

export default CustomerCard;
