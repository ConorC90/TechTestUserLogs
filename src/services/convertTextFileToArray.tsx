// FileHelper.ts

// import data from '../'

interface Config {
  [key: string]: string;
}

const convertTextFileToArray = async (filePath: string, config: Config) => {
  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }

    const text = await response.text();

    const lines = text.split('\n');

    // Process each line to create an array of objects
    const dataArray: any[] = [];
    let currentObject: { [key: string]: any } = {};

    lines.forEach(line => {
      const [key, value] = line.split(':').map(item => item.trim());

      if (key && value) {
        if (config[key]) {
          // Use the provided key from the config
          const configKey = config[key];
          if (!currentObject[configKey]) {
            currentObject[configKey] = value;
          }
        } else {
          // Start a new object for each person
          currentObject = { [key]: value };
        }
      } else if (Object.keys(currentObject).length > 0) {
        // Push the current object to the array when encountering an empty line
        dataArray.push(currentObject);
        currentObject = {};
      }
    });

    return dataArray;
  } catch (error) {
    console.error('Error converting text file to array:', error);
    throw error;
  }
};

export default convertTextFileToArray;
