import './App.scss';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './screens/main/Main';
import Login from './screens/login/Login';
import Logister from './screens/login/Logister';
import Header from './components/Header';
import Company from './screens/notice/Company';
import UseNotice from './screens/notice/UseNotice';
import Apply from './screens/apply/Apply';
import RegisterDefault from './screens/apply/RegisterDefault';
import RegisterPlayer from './screens/apply/RegisterPlayer';
import Pamphlets from './screens/pamphlet/Pamphlets';
import Detail from './screens/pamphlet/Detail';
import RegisterResult from './screens/apply/RegisterResult';
import RegisterProgram from './screens/apply/RegisterProgram';
import RegisterTypeSelect from './screens/apply/RegisterTypeSelect';

function App() {
  return (
    <div className="App">
      
      <Header/>
      
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logister" element={<Logister/>}/>
        <Route path="/company" element={<Company/>}/>
        <Route path="/usenotice" element={<UseNotice/>}/>
        <Route path="/apply" element={<Apply/>}/>
        <Route path="/registertypeselect" element={<RegisterTypeSelect/>}/>
        <Route path="/registerdefault" element={<RegisterDefault/>}/>
        <Route path="/registerprogram" element={<RegisterProgram/>}/>
        <Route path="/registerplayer" element={<RegisterPlayer/>}/>
        <Route path="/registerresult" element={<RegisterResult/>}/>
        <Route path="/pamphlets" element={<Pamphlets/>}/>
        <Route path="/detail" element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;