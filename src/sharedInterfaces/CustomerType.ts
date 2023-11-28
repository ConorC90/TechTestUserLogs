import ServiceType from './ServiceType';

type CustomerType = {
  firstName: string;
  lastName: string;
  year: number;
  make: string;
  model: string;
  services: ServiceType[];
};

export default CustomerType;
