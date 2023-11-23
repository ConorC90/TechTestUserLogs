import React, { useState } from 'react';
import { FormContainer, StyledForm, FormLabel, FormInput, FormButton } from './CustomerForm.styles';

interface ServiceValues {
  code: number;
  date: string;
  cost: number;
}
interface CustomerFormProps {
  onSave: (firstName: string, lastName: string, make: string, desc: string, serviceValues: ServiceValues) => void;
  // isSaving: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSave }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [code, setCode] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [desc, setDesc] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const isFormValid = () => {
    return !isNaN(code) && !isNaN(cost) && date.trim() !== '';
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid()) {
      const serviceValues: ServiceValues = {
        code,
        date,
        cost,
      };
      setIsSaving(true);
      setTimeout(() => {
        onSave(firstName, lastName, make, model, serviceValues);
        setFirstName('');
        setLastName('');
        setMake('');
        setModel('');
        setCode(0);
        setCost(0);
        setDesc('');
        setDate('');
        setIsSaving(false);
      }, 2000);
    } else {
      alert('Please fill in all required fields with valid values.');
    }
  };

  return (
    <FormContainer>
      <h2>Log new customer visit</h2>
      <StyledForm onSubmit={handleSave}>
        <FormLabel>
          First Name:
          <FormInput
            id="firstName"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
        </FormLabel>

        <FormLabel>
          Last Name:
          <FormInput
            id="lastName"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
        </FormLabel>

        <FormLabel>
          Make:
          <FormInput
            id="make"
            type="text"
            value={make}
            onChange={e => setMake(e.target.value)}
            placeholder="Enter make"
          />
        </FormLabel>

        <FormLabel>
          Model:
          <FormInput
            id="model"
            type="text"
            value={model}
            onChange={e => setModel(e.target.value)}
            placeholder="Enter model"
          />
        </FormLabel>

        <FormLabel>
          Code:
          <FormInput
            id="code"
            type="number"
            value={code}
            onChange={e => setCode(Number(e.target.value))}
            placeholder="Enter code"
            required
          />
        </FormLabel>

        <FormLabel>
          Description:
          <FormInput
            id="desc"
            type="text"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Enter description"
          />
        </FormLabel>

        <FormLabel>
          Date:
          <FormInput
            id="date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="Enter date"
            required
          />
        </FormLabel>

        <FormLabel>
          Cost:
          <FormInput
            id="cost"
            type="number"
            value={cost}
            onChange={e => setCost(Number(e.target.value))}
            placeholder="Enter cost"
            required
          />
        </FormLabel>

        <FormButton type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </FormButton>
      </StyledForm>
    </FormContainer>
  );
};

export default CustomerForm;
