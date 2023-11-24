import ServiceType from './ServiceType';

interface CustomerFormProps {
  onSave: (firstName: string, lastName: string, make: string, desc: string, serviceValues: ServiceType) => void;
}

export default CustomerFormProps;
