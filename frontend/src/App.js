import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from './pages/Homescreen';
import BrowseScreen from './pages/BrowseScreen';
import Layout from './pages/Layout';
import BrowseImages from './pages/BrowseImages';
import SearchResult from './pages/SearchResult';
import SignIn from './components/SignIn';
import SignInPage from './pages/SignInPage';
import SourceList from './components/SourceList';
import Login from './components/SignIn';
import { useEffect, useState } from 'react';
import {auth} from './fb';



function App() {

  // this sets up the user state, its declared at the app level so we can pass it to all of the children components
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])
  console.log(user);

  return (
    <div>
      {JSON.stringify(user?.displayName)}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homescreen user={user}/>} />
          <Route element={<Layout/>}>
            <Route path="/signin" element={<SignInPage user={user}/>}/>
            <Route path="/browse" element={<BrowseScreen user={user}/>}/>
            <Route path="/images" element={<BrowseImages user={user}/>}/>
            <Route path="/search" element={<SearchResult user={user}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
