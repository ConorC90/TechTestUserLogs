import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
    color: #333;
  }

  .app-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  h1 {
    text-align: center;
    color: #2e4053;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
`;

export default GlobalStyle;
