import Service from './Service';

type Customer = {
  firstName: string;
  lastName: string;
  year: number;
  make: string;
  model: string;
  services: Service[];
};

export default Customer;
