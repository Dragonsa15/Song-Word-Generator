// src/globalStyles.js
import background from './assets/background_image_1.png';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    height: 100%;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-image: url(${background});
    background-size: cover;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
  }
`;

export default GlobalStyle;
