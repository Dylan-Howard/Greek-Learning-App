import css from 'styled-jsx/css';
 
export default css.global`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    height: calc(100vh);
    max-height: -webkit-fill-available;
    overflow: visible;
  }

  body div::-webkit-scrollbar {
    width: 8px; /* Mostly for vertical scrollbars */
    height: 8px; /* Mostly for horizontal scrollbars */
  }
  body div::-webkit-scrollbar-thumb { /* Foreground */
    background: #424242;
    border-radius: 8px;
  }
  body div::-webkit-scrollbar-track { /* Background */
    background-color: #DBDBF0;
    border-radius: 8px;
  }

  #root { height: 100%; }
`;