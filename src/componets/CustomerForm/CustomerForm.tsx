import React, { useState } from 'react';
import { FormContainer, StyledForm, FormLabel, FormInput, StyledFormSection } from './CustomerForm.styles';
import Button from '../Button';
import WarningMessage from '../WarningMessage';
import { useModalContext } from '../../contexts/ModalContext';
import ServiceType from '../../sharedInterfaces/ServiceType';

// interface ServiceValues {
//   code: number | string;
//   desc: string;
//   date: string;
//   cost: number | string;
// }
interface CustomerFormProps {
  onSave: (
    serviceValues: ServiceType,
    firstName?: string,
    lastName?: string,
    make?: string,
    model?: string,
    year?: number,
  ) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSave }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [year, setYear] = useState<number>(0);
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [code, setCode] = useState<number | string>('');
  const [cost, setCost] = useState<number | string>('');
  const [desc, setDesc] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const { location } = useModalContext();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const serviceValues: ServiceType = {
        code,
        desc,
        cost,
        date,
      };
      setIsSaving(true);
      setTimeout(() => {
        onSave(serviceValues, firstName, lastName, make, model, year);
        // const form = document.getElementById('serviceLogForm') as HTMLFormElement;
        // if (form) {
        // form.reset();
        // }
        resetForm();
        setIsSaving(false);
      }, 2000);
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
    setCode('');
    setCost('');
    setDesc('');
    setDate('');
    setMissingFields([]);
  };

  return (
    <FormContainer>
      <h2>Log new customer log</h2>
      <StyledForm onSubmit={handleSave} id="serviceLogForm">
        <StyledFormSection>
          {location === 'addCustomer' && (
            <>
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
            </>
          )}
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
        </StyledFormSection>
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
