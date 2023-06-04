import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from './pages/Homescreen';
import BrowseScreen from './pages/BrowseScreen';
import Layout from './pages/Layout';
import BrowseImages from './pages/BrowseImages';
import SearchResult from './pages/SearchResult';

import SourceList from './components/SourceList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homescreen/>} />
        <Route element={<Layout/>}>
          <Route path="/browse" element={<BrowseScreen/>}/>
          <Route path="/images" element={<BrowseImages/>}/>
          <Route path="/search" element={<SearchResult/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
