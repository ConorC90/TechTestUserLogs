export const parseText = (text: string): any[] => {
  const lines = text.split('\n');
  const customers: any[] = [];
  let currentPerson: any | null = null;

  lines.forEach(line => {
    const [key, value] = line.split(':').map(item => item.trim());

    if (key && value) {
      if (key === 'First name') {
        currentPerson = { firstName: value, lastName: '', year: '', make: '', model: '', services: [] };
        customers.push(currentPerson);
      } else if (currentPerson) {
        switch (key) {
          case 'Last name':
            currentPerson.lastName = value;
            break;
          case 'Year':
            currentPerson.year = value;
            break;
          case 'Make':
            currentPerson.make = value;
            break;
          case 'Model':
            currentPerson.model = value;
            break;
          case 'Code':
            if (currentPerson.services.length === 0 || currentPerson.services[currentPerson.services.length - 1].desc) {
              currentPerson.services.push({ code: value, desc: '', date: '', cost: '' });
            } else {
              currentPerson.services[currentPerson.services.length - 1].code = value;
            }
            break;
          case 'Desc':
            currentPerson.services[currentPerson.services.length - 1].desc = value;
            break;
          case 'Date':
            currentPerson.services[currentPerson.services.length - 1].date = value;
            break;
          case 'Cost':
            currentPerson.services[currentPerson.services.length - 1].cost = value;
            break;
          default:
            break;
        }
      }
    }
  });

  return customers;
};
