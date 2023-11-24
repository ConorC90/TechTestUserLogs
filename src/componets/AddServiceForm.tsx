import React, { useState } from 'react';
import Button from './Button';

type Service = {
  code: number;
  desc: string;
  date: string;
  cost: number;
};

type AddServiceFormProps = {
  onSave: (values: Service) => Promise<void>;
};

const AddServiceForm: React.FC<AddServiceFormProps> = ({ onSave }) => {
  const [code, setCode] = useState<number>(0);
  const [desc, setDesc] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [cost, setCost] = useState<number>(0);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSaving(true);

    try {
      await onSave({ code, desc, date, cost });
      // Reset the form after saving
      setCode(0);
      setDesc('');
      setDate('');
      setCost(0);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code:
        <input type="number" value={code} onChange={e => setCode(Number(e.target.value))} />
      </label>
      <label>
        Description:
        <input type="text" value={desc} onChange={e => setDesc(e.target.value)} />
      </label>
      <label>
        Date:
        <input type="text" value={date} onChange={e => setDate(e.target.value)} />
      </label>
      <label>
        Cost:
        <input type="number" value={cost} onChange={e => setCost(Number(e.target.value))} />
      </label>
      <Button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Service'}
      </Button>
      <Button size={'small'}>Hello</Button>
    </form>
  );
};

export default AddServiceForm;
