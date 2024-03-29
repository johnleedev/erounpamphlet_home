import React from 'react';
import './footer.scss'

export default function Footer (props:any) {
  return (
   
    <footer className='footer'>
      <div className="inner">
        
        <ul>
          <a href='#'>
            <li className='link'>저작권 정책</li>
          </a>
          <div className='divider'></div>
          <a href='#'>
            <li className='link'>이메일무단수집거부</li>
          </a>
          <div className='divider'></div>
          <a href='#'>
            <li className='link'>이용약관</li>
          </a>
          <div className='divider'></div>
          <a href='#'>
            <li className='link'>개인정보처리방침</li>
          </a>
          <div className='divider'></div>
          <a href='#'>
            <li className='link'>FAQ</li>
          </a>
        </ul>

        <ul>
          <li className='text'>더좋은사람들</li>
          <li className='text'>사업자등록번호: 736-29-01512</li>
          <li className='text'>통신판매업신고번호: 2023-대구달성-1006호</li>
          <li className='text'>대표자: 이요한</li>
        </ul>

        <ul>
          <li className='text'>E-mail: thebetterpeople@naver.com</li>
          <li className='text'>전화문의 : 010-6562-5948</li>
          <li className='text'>카카오톡문의 : ID - thebetterpeople</li>
        </ul>

        <ul className='copyright'>
          <li>COPYRIGHT © 2023. TheBetterPeople. All rights reserved. </li>
        </ul>


      </div>
    </footer>
      
  );
}

 

