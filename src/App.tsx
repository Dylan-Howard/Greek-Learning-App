import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { light } from './Theme';
import Reader from './Reader';
import About from './About/About';

function App() {
  return (
    <ThemeProvider theme={light}>
      <BrowserRouter basename="/DynamicInterlinear">
        <Routes>
          <Route path="/" element={<Reader />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
