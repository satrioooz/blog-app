import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import CreatePost from './page/CreatePost';
import Navbar from './Navbar';
import Login from './Authentication/Login';
import Example from './page/Example';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Navbar/>}>
      <Route index element={<Home/>} />
      <Route path="/create"  element={<CreatePost/>}/>
      <Route path="/create/:id"  element={<CreatePost/>}/>
      <Route path="/login"  element={<Login/>}/>
      <Route path="/detail/:id"  element={<Example/>}/>
      </Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
