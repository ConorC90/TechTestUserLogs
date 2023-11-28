import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  min-width: 300px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const ServiceList = styled.ol`
  margin: 5px;
`;

export const ServiceListItem = styled.li`
  margin-bottom: 5px;
`;

export const ServiceDetailsList = styled.ul`
  list-style: none;
  padding: 10px;
`;
export const ServiceDetailsListItem = styled.li`
  margin-bottom: 5px;
`;
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;
