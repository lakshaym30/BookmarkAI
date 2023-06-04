import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from './pages/Homescreen';
import BrowseScreen from './pages/BrowseScreen';
import Layout from './pages/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Homescreen/>} />
        <Route path="/" element={<Layout/>}>
          <Route path="browse" element={<BrowseScreen/>}/>
        </Route>
        {/* <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
