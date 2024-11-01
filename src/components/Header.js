import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';
import {useAccessToken} from './AccessTokenContext';

const Header = () => {
   const {accessResult, user_id, loading, setAccessToken}=useAccessToken();
   const accessToken=localStorage.getItem('accessToken');
   function logout(){
      localStorage.removeItem(accessToken);
      setAccessToken(null);
      window.location.href="/"
   }
   localStorage.removeItem('accessToken')
   if(loading){
      return null;
   }
   return (
      <div className='headerWrap'>
         <div className="header-area">
            <div className="logo">
               <Link to="/"><img src={process.env.PUBLIC_URL+ "/img/logo.png"} alt="" /></Link>
            </div>
            <div className="nav">
               <ul className='signUpandlogin'>
                  <li >
                  {
                     accessResult  ? (
                        <ul>
                           <li className='user-info'>{user_id}님 반갑습니다.</li>
                           <li className='logout' onClick={() =>logout()}>로그아웃</li>
                        </ul>
                     ) :(
                        <ul>
                           <li className="sign-in"><Link to="/login">로그인</Link></li>
                           <li className="sign-up"><Link to="/signup">회원가입</Link></li>
                        </ul>
                     
                     )
                  }
                  
                  </li>
                  <li>
                     
                  </li>
               </ul>
               <ul>
                  <li>
                     <Link to="/">Home</Link>
                     
                  </li>
                  <li><Link to="/about">About</Link></li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Header;