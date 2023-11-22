// CustomerForm.tsx
import React, { useState } from 'react';
import { FormContainer, FormLabel, FormInput, FormButton } from './CustomerForm.styles';

interface CustomerFormProps {
  onSave: (
    firstName: string,
    lastName: string,
    make: string,
    desc: string,
    serviceValues: {
      code: number;
      date: string;
      cost: number;
    },
  ) => void;
  isSaving: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSave, isSaving }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [code, setCode] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [desc, setDesc] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleSave = () => {
    const serviceValues = {
      code: code,
      date: date,
      cost: cost,
    };

    onSave(firstName, lastName, make, model, serviceValues);
    // Reset form fields
    setFirstName('');
    setLastName('');
    setMake('');
    setModel('');
    setCode(0);
    setCost(0);
    setDesc('');
    setDate('');
  };

  return (
    <FormContainer>
      <h2>Add New Service</h2>
      <form>
        <FormLabel>
          FirstName:
          <FormInput type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </FormLabel>
        <FormLabel>
          LastName:
          <FormInput type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        </FormLabel>
        <FormLabel>
          Make:
          <FormInput type="text" value={make} onChange={e => setMake(e.target.value)} />
        </FormLabel>
        <FormLabel>
          Model:
          <FormInput type="text" value={model} onChange={e => setModel(e.target.value)} />
        </FormLabel>
        <FormLabel>
          Code:
          <FormInput type="number" value={code} onChange={e => setCode(Number(e.target.value))} />
        </FormLabel>
        <FormLabel>
          Desc:
          <FormInput type="text" value={desc} onChange={e => setDesc(e.target.value)} />
        </FormLabel>
        <FormLabel>
          Date:
          <FormInput type="text" value={date} onChange={e => setDate(e.target.value)} />
        </FormLabel>
        <FormLabel>
          Cost:
          <FormInput type="number" value={cost} onChange={e => setCost(Number(e.target.value))} />
        </FormLabel>
        <FormButton type="button" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </FormButton>
      </form>
    </FormContainer>
  );
};

export default CustomerForm;
