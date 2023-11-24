import React, { useState } from 'react';
import { FormContainer, StyledForm, FormLabel, FormInput } from './CustomerForm.styles';
import Button from '../Button';
import WarningMessage from '../WarningMessage';

interface ServiceValues {
  code: number | undefined;
  date: string;
  cost: number | undefined;
}
interface CustomerFormProps {
  onSave: (
    serviceValues: ServiceValues,
    firstName: string,
    lastName: string,
    make: string,
    model: string,
    year: number,
  ) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSave }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [year, setYear] = useState<number>(0);
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [code, setCode] = useState<number | undefined>(undefined);
  const [cost, setCost] = useState<number | undefined>(undefined);
  const [desc, setDesc] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const serviceValues: ServiceValues = {
        code,
        cost,
        date,
      };
      setIsSaving(true);
      setTimeout(() => {
        onSave(serviceValues, firstName, lastName, make, model, year);
        resetForm();
        setIsSaving(false);
      }, 20000);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      { value: code, label: 'Code' },
      { value: date, label: 'Date' },
      { value: cost, label: 'Cost' },
    ];

    const missing = requiredFields.filter(field => {
      return field.value === '' || (typeof field.value === 'number' && isNaN(field.value));
    });

    setMissingFields(missing.map(field => field.label));
    return missing.length === 0;
  };
  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setMake('');
    setModel('');
    setYear(0);
    setCode(undefined);
    setCost(undefined);
    setDesc('');
    setDate('');
    setMissingFields([]);
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
            disabled={isSaving}
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
            disabled={isSaving}
          />
        </FormLabel>

        <FormLabel>
          Year:
          <FormInput
            id="make"
            type="number"
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            onFocus={e => {
              e.target.value = '';
            }}
            placeholder="Enter year"
            disabled={isSaving}
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
            disabled={isSaving}
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
            disabled={isSaving}
          />
        </FormLabel>

        <FormLabel>
          Code:
          <FormInput
            id="code"
            type="number"
            value={code}
            onChange={e => setCode(Number(e.target.value))}
            onFocus={e => {
              e.target.value = '';
            }}
            placeholder="Enter code"
            disabled={isSaving}
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
            disabled={isSaving}
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
            disabled={isSaving}
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
            onFocus={e => {
              e.target.value = '';
            }}
            placeholder="Enter cost"
            disabled={isSaving}
            required
          />
        </FormLabel>
        <Button fullWidth size="small" color={'green'} type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </StyledForm>
      {missingFields.length > 0 && (
        <WarningMessage
          message={`Please fill in the following required fields: ${missingFields.join(', ')}`}
        ></WarningMessage>
      )}
    </FormContainer>
  );
};

export default CustomerForm;
