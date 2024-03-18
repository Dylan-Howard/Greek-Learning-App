import './App.css';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from 'react-router-dom';
import Reader from './Reader';

// eslint-disable-next-line no-console, @typescript-eslint/no-unused-vars
const log = (message: any) => console.log(message);

function About() {
  return (
    <>
      <h1>About</h1>
      <Link to="/">Reader</Link>
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/DynamicInterlinear">
      <Routes>
        <Route path="/" element={<Reader />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
