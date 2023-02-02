import React from 'react'
import './App.css';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Home from './component/Home/Home';
import Create from './component/Create';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
// import Home from './component/Home/Home';
// import ToDoHome from './component/Home/Home';
function App() {
  return (
    <>    
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Login/>}/>
      <Route path='/register' element ={<Register/>}/>
      <Route path='/home' element ={<Home/>}/>
      <Route path='/create' element ={<Create/>}/>
      {/* <Route path='/todoHome' element={<ToDoHome/>}/> */}
    </Routes>
    
    </BrowserRouter>
    </>
   
  );
}

export default App;
