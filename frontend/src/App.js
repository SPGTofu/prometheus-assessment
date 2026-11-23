import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StockInfo from './pages/StockInfo';
import HomePage from './pages/HomePage';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Header from './components/header/Header';
function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/:symbol" element={<StockInfo />} />
          </Route> 
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
