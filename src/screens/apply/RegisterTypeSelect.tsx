import React, { useCallback, useEffect, useRef, useState } from 'react';
import './RegisterTypeSelect.scss'
import company from "../../images/notice/company.jpg"
import Footer from '../../components/Footer';
import Title from '../../components/Title';
import { useNavigate } from 'react-router-dom';
import SubTitle from '../../components/SubTitle';
import Select from 'react-select';


export default function RegisterFormSelect (props:any) {

  let navigate = useNavigate();

  const [selectNum, setSelectNum] = useState(0);
  const [type, setType] = useState('');
  const [playerNum, setPlayerNum] = useState(1);

  const selectDuetTrio = [
    { value: '2', label: '2' },
    { value: '3', label: '3' },
  ];

  const selectMiddle = [
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
  ];


  const [selectedPlayerNum, setSelectedPlayerNum] = useState({ value: '선택', label: '선택' });
  const handleSelectPartChange = ( event : any) => {
    setSelectedPlayerNum(event);
    setPlayerNum(event.value);
  }

 
  return (
    <div className="apply">

      <div className="topimage">
        <img src={company} alt='company'/>
      </div>

      <div className="inner">

        
        <Title name={'등록하기'}/>
        <SubTitle name='연주회 형식 선택'/>

        {/* 기본정보 */}
        <div className='registerTypeSelectBox'>
          <div className="register name"><p>선택</p></div>
          <div className="divider"></div>
          <div className="register content">
           
           {
            selectNum === 0
            ?
            <ul>
              <li onClick={()=>{
                // navigate('/registerdefault', {state : { type : 'free', playerNum: 1 } });
              }}>무료 팜플렛</li>
              <li onClick={()=>{
                navigate('/registerdefault', {state : { type : 'solo', playerNum: 1 } });
              }}>독창회&독주회</li>
              <li onClick={()=>{
                setSelectNum(1);
                setType('small');
              }}>소형 연주회(2~3인)</li>
              <li onClick={()=>{
                setSelectNum(2);
                setType('middle');
              }}>중형 연주회(4~10인)</li>
              <li onClick={()=>{
                navigate('/registerdefault', {state : { type : 'large', playerNum: 11 } });
              }}>대형 연주회(10인 이상)</li>
            </ul>
            :
            <div className="inputbox">
              <div className='name'>
                <p>연주자 수</p>
              </div>
              {
                selectNum === 1 &&
                <Select
                  className='input'
                  value={selectedPlayerNum}
                  onChange={handleSelectPartChange}
                  options={selectDuetTrio}
                />
              }
              {
                selectNum === 2 &&
                <Select
                  className='input'
                  value={selectedPlayerNum}
                  onChange={handleSelectPartChange}
                  options={selectMiddle}
                />
              }
              
            </div>
           }
           
          { selectNum !== 0 &&
            <div className="buttonbox">
              <div className="button" onClick={()=>{
                setSelectNum(0);
              }}>
                <p>다시 선택하기</p>
              </div>
              <div className="button" onClick={()=>{
                navigate('/registerdefault', {state : { type : type, playerNum: playerNum } });
              }}>
                <p>다음</p>
              </div>
            </div>
          }
            
          </div>
        </div>

        

       

      </div>

      <Footer/>
    </div>
  );
}
