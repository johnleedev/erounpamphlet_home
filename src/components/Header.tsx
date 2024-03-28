import React, {  useState, useEffect, useRef } from "react";
import './header.scss'
import { MdOutlineLogin } from "react-icons/md";
import { BsPersonAdd } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import logo from '../images/logo.png'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from 'react-router-dom';

export default function Header () {
  
  let navigate = useNavigate();

  const [mainboxView, setMainboxView] = useState<boolean>(false);
  const headerRef = useRef(null);
  const handelViewMainbox = () => {
    setMainboxView(!mainboxView);
  };
  
  useGSAP(() => {
    gsap.to(".mainbox", {
      opacity: mainboxView ? 1 : 0,
      display: mainboxView ? 'block' : 'none',
      duration: 0.6,
    });
  }, { dependencies: [mainboxView], scope: headerRef }); 

  
  return (
    
    <header className="header" ref={headerRef}>

      <div className="mainmenu">
        <div className="inner">
        
          <div className="box box1" onClick={()=>{navigate('/'); setMainboxView(false)}}>
            <img src={logo} />
          </div>

          <div className="box box2">
            <div className="menu" onClick={()=>{navigate('/login'); setMainboxView(false)}}>
              <div className="icon">
                <MdOutlineLogin size={30}/>  
              </div>
              <p className="text">로그인</p>
            </div>

            
            <div className="menu" onClick={()=>{navigate('/logister'); setMainboxView(false)}}>
              <div className="icon">
                <BsPersonAdd size={30}/>  
              </div>
              <p className="text">회원가입</p>
            </div>
            

            <div className="menu"
              onClick={handelViewMainbox}
            >
              {
                mainboxView 
                ?
                <IoCloseOutline size={40} />
                :
                <>
                  <div className="icon">
                    <RxHamburgerMenu size={30}/>
                  </div>
                  <p className="text">MENU</p>
                </>
              }
              
            </div>
            
          </div>
        </div>
      </div>
      
      <div className="mainbox">
        <div className="inner">

            <ul className="container">
              <li className="item">
                <h4 className="item__name" onClick={()=>{navigate('/company'); setMainboxView(false)}}>
                  '이로운팜플렛' 안내
                </h4>
                <ul className="item__menubox">
                  <li className="item__menu" onClick={()=>{navigate('/company'); setMainboxView(false)}}>이로운팜플렛은?</li>
                  <li className="item__menu" onClick={()=>{navigate('/usenotice'); setMainboxView(false)}}>이용안내</li>
                </ul>
              </li>
            </ul>

            <div className="divider"></div>

            <ul className="container">
              <li className="item">
                <h4 className="item__name" onClick={()=>{navigate('/pamphlets'); setMainboxView(false)}}>
                  e-팜플렛 보기
                </h4>
                <ul className="item__menubox">
                  <li className="item__menu" onClick={()=>{navigate('/pamphlets'); setMainboxView(false)}}>독창회&독주회</li>
                  <li className="item__menu">소형 연주회(2~3인)</li>
                  <li className="item__menu">중형 연주회(4~10인)</li>
                  <li className="item__menu">대형 연주회(10인이상)</li>
                </ul>
              </li>
            </ul>

            <div className="divider"></div>

            <ul className="container">
              <li className="item">
                <h4 className="item__name" onClick={()=>{navigate('/apply'); setMainboxView(false)}}>
                  등록 및 신청
                </h4>
                <ul className="item__menubox">
                  <li className="item__menu" onClick={()=>{navigate('/apply'); setMainboxView(false)}}>신청하기</li>
                  <li className="item__menu" onClick={()=>{navigate('/registertypeselect'); setMainboxView(false)}}>등록하기</li>
                </ul>
              </li>
            </ul>

            <div className="divider"></div>

            <ul className="container">
              <li className="item">
                <h4 className="item__name">
                  나의 팜플렛
                </h4>
                <ul className="item__menubox">
                  <li className="item__menu">참석한 공연</li>
                  <li className="item__menu">찜한 공연</li>
                </ul>
              </li>
            </ul>
        </div>
      </div>

      
    </header>
    
  );
};

