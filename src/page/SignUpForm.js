import React, {useState, useRef, useEffect} from 'react';
import { IoCheckmark } from "react-icons/io5";
import {useNavigate} from 'react-router-dom';
import { API_URL } from '../config/constants';
import axios from 'axios';

import './signup.scss';

const SignUpForm = () => {
   const history= useNavigate();

   const idInputRef=useRef(null);
   const pwInputRef=useRef(null);
   const nameInputRef=useRef(null);
   const phoneInputRef=useRef(null);
   const emailInputRef=useRef(null);
   const birthInputRef=useRef(null);

   const [id, setId]=useState('');
   const [pw, setPw]=useState('');
   const [pw2, setPw2]=useState('');
   const [name, setName]=useState('');
   const [phone, setPhone]=useState('');
   const [email, setEmail]=useState('');
   const [birth, setBirth]=useState('');

   const [allChecked, setAllChecked]=useState(false);
   const [termsChecked, setTermsChecked]=useState(false);
   const [privacyChecked, setPrivacyChecked]=useState(false);
   const [marketingChecked, setMarketingChecked]=useState(false);
   const [isSubmitted, setIsSubmitted]=useState(false);//회원가입 제출여부
   const [isRegistered, setIsRegistered]=useState(false); //회원가입 완료 여부
   const idRule=/^[a-z0-9]{4,16}$/;
   const pwRule=/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
   const nameRule=/^[a-zA-z가-힣]{1,20}$/;
   const phoneRule=/^\d{8}$/;
   const emailRule=/^[0-9a-zA-z]([-_\.]?[0-9a-zA-z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
   const birthRule=/^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
   const [setUser] = useState(null);
   const [messages, setMessages]=useState({
      id:{text:'', color: ''},
      pw:{text:'', color: ''},
      pw2:{text:'', color: ''},
      name:{text:'', color: ''},
      phone:{text:'', color: ''},
      email:{text:'', color: ''},
      birth:{text:'', color: ''},
   });

   const handleMessageChange = (key, text, color) =>{
      setMessages((prevMessages) => ({
         ...prevMessages,
         [key]: {text, color}
      }))
   }

   useEffect(()=>{
      if(isSubmitted){
         if(isRegistered){
            alert('회원가입이 완료되었습니다.')
         }else{
            alert('회원가입이 실패했습니다.')
         }
      }
   }, [isRegistered, isSubmitted])
   
   const handleAllCheck = () =>{
      setAllChecked(!allChecked);
      setTermsChecked(!termsChecked);
      setPrivacyChecked(!privacyChecked);
      setMarketingChecked(!marketingChecked);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      if(
         idRule.test(id) &&
         pwRule.test(pw) &&
         pw2===pw &&
         nameRule.test(name) &&
         phoneRule.test(phone) &&
         emailRule.test(email) &&
         birthRule.test(birth) &&
         termsChecked &&
         privacyChecked &&
         marketingChecked 
      ){
         try{
            axios.post(`${API_URL}/users`, {
               user_id:id,
               pw: pw,
               name:name,
               phone:phone,
               email,
               birth,
               marketingChecked: marketingChecked ? "True":"False"
            })
            .then((result)=>{
               console.log(result);
               history("/", {replace:true})
            })
            .catch((err)=>{
               console.error(err)
            })
            setIsRegistered(true);
            setIsSubmitted(true);
         } catch(error){
            //db에 회원가입 정보 넣기 실패
            console.log(error);
            setIsRegistered(false);
            setIsSubmitted(true);
         }
      }else{
         //조건 만족하지 않았을떄
         console.log('error');
         setIsRegistered(false);
         setIsSubmitted(true);
      }
   }


   const handleId = (event) =>{
      const newValue= event.target.value;
      setId(newValue)
      if(idRule.test(newValue)){
         axios.get(`${API_URL}/users/${id}`)
         .then((result)=>{
            const user_info =result.data;
            if(!user_info.user){
               handleMessageChange('id', '사용 가능한 아이디입니다', 'success-color');
            }else{
               handleMessageChange('id', '아이디 중복됩니다.', 'error-color');
               setId('');
            }
         })
         .catch((error)=>{
            console.log(error)
         })
         
      }else if(newValue===""){
         handleMessageChange('id', '아이디를 입력해주세요', 'error-color');
      }else{
         handleMessageChange('id', '아이디는 영문소문자/숫자 4글자 이상 가능합니다.', 'error-color');
         setId('');
      }
   }
   const handlePw = (event) =>{
      const newPwValue= event.target.value;
      setPw(newPwValue)
      if(pwRule.test(newPwValue)){
         handleMessageChange('pw', '사용 가능한 비밀번호입니다', 'success-color');
      }else if(newPwValue===""){
         handleMessageChange('pw', '비밀번호를 입력해주세요', 'error-color');
      }else{
         handleMessageChange('pw', '비밀번호는 영문대소문자/숫자/특수문자 조합, 8~16자로 만들어주세요', 'error-color');
         setPw('');
      }
   }
   const handlePw2 = (event) =>{
      const newPw2Value= event.target.value;
      setPw2(newPw2Value)
      if(pw===""){ //비밀번호 값이 비어있을때
         handleMessageChange('pw', '비밀번호를 입력해주세요', 'error-color');
      }else if(newPw2Value===pw){
         handleMessageChange('pw2', '비밀번호가 일치합니다.', 'success-color');
      }else if(newPw2Value===""){
         handleMessageChange('pw2', '비밀번호를 다시 입력해주세요', 'error-color');
         setPw2('');
      }else{
         handleMessageChange('pw2', '비밀번호가 일치하지 않습니다', 'error-color');
         setPw2('');
      }
   }
   const handleName = (event) =>{
      const newNameValue= event.target.value;
      setName(newNameValue)
      if(nameRule.test(newNameValue)){
         handleMessageChange('name', '사용 가능한 이름입니다.', 'success-color');
      }else if(newNameValue===""){
         handleMessageChange('name', '이름을 입력해주세요', 'error-color');
         
      }else{
         handleMessageChange('name', '이름을 다시 한번 확인해주세요', 'error-color');
         setName('');
      }
   }
   const handlePhone = (event) =>{
      const newPhoneValue= event.target.value;
      setPhone(newPhoneValue)
      if(phoneRule.test(newPhoneValue)){
         handleMessageChange('phone', '사용 가능한 전화번호입니다.', 'success-color');
      }else if(newPhoneValue===""){
         handleMessageChange('phone', '전화번호를 입력해주세요', 'error-color');
         
      }else{
         handleMessageChange('phone', '전화번호를 다시 한번 확인해주세요', 'error-color');
         setPhone('');
      }
   }
   const handleEmail = (event) =>{
      const newEmailValue= event.target.value;
      setEmail(newEmailValue)
      if(emailRule.test(newEmailValue)){
         handleMessageChange('email', '사용 가능한 이메일입니다.', 'success-color');
      }else if(newEmailValue===""){
         handleMessageChange('email', '이메일을 입력해주세요', 'error-color');
         
      }else{
         handleMessageChange('email', '이메일을 다시 한번 확인해주세요', 'error-color');
         setEmail('');
      }
   }
   const handleBirth = (event) =>{
      const newBirthValue= event.target.value;
      setBirth(newBirthValue)
      if(birthRule.test(newBirthValue)){
         handleMessageChange('birth', '올바른 생년월일입니다', 'success-color');
      }else if(newBirthValue===""){
         handleMessageChange('birth', '생년월일을 입력해주세요', 'error-color');
         
      }else{
         handleMessageChange('birth', '생년월일을 다시 한번 확인해주세요', 'error-color');
         setBirth('');
      }
   }
   return (
      <div className='signWrap'>
         <h2>회원가입</h2>
         <fieldset className='signUpArea'>
            <form action="#" method='post' name="signup" onSubmit={handleSubmit}>
               <ul>
                  <li className="id-section">
                     <div className="area-style">
                        <label htmlFor="idArea" className='label-style'>아이디</label>
                        <input ref={idInputRef} type="text" id="idArea" required size={20} value={id} onChange={(event) => {setId(event.target.value)}} onBlur={handleId}/>
                        <span className={`mes-style ${messages.id.color}`}>{messages.id.text}</span>
                        <p className="help-style"><IoCheckmark />영문소문자/숫자, 4-16자</p>
                     </div>
                  </li>
                  <li className="pw-section">
                     <div className="area-style">
                        <label htmlFor="pwArea" className='label-style'>비밀번호</label>
                        <input ref={pwInputRef} type="text" id="pwArea" required size={20} value={pw} onChange={(event) => {setPw(event.target.value)}} onBlur={handlePw}/>
                        <span className={`mes-style ${messages.pw.color}`}>{messages.pw.text}</span>
                        <p className="help-style"><IoCheckmark />영문대소문자/숫자/특수문자조합, 8-16자</p>
                        <br />

                        <label htmlFor="pw2Area" className='label-style'>비밀번호확인</label>
                        <input  type="text" id="pw2Area" required size={20} value={pw2} onChange={(event) => {setPw2(event.target.value)}} onBlur={handlePw2}/>
                        <span className={`mes-style ${messages.pw2.color}`}>{messages.pw2.text}</span>
                     </div>
                  </li>
                  <li className="name-section">
                     <div className="area-style">
                        <label htmlFor="nameArea" className='label-style'>이름</label>
                        <input ref={nameInputRef} type="text" id="nameArea" required size={20} value={name} onChange={(event) => {setName(event.target.value)}} onBlur={handleName}/>
                        <span className={`mes-style ${messages.name.color}`}>{messages.name.text}</span>
                     </div>
                  </li>
                  <li className="phone-section">
                     <div className="area-style">
                        <label htmlFor="phoneArea" className='label-style'>휴대전화</label>
                        <div className='flexBox'>
                           <select className="select-style" id="phoneNumber">
                              <option value="010">010</option>
                              <option value="011">011</option>
                              <option value="019">019</option>
                              <option value="018">018</option>
                              <option value="016">016</option>
                           </select>
                           <span>&nbsp;&nbsp;</span>
                           <input ref={phoneInputRef} type="text" id="phoneArea" required size={20} value={phone} onChange={(event) => {setPhone(event.target.value)}} onBlur={handlePhone}/>
                        </div>
                        <span className={`mes-style ${messages.phone.color}`}>{messages.phone.text}</span>                        
                     </div>
                  </li>
                  <li className="email-section">
                     <div className="area-style">
                        <label htmlFor="emailArea" className='label-style'>이메일</label>
                        <input ref={emailInputRef} type="text" id="emailArea" required size={20} value={email} onChange={(event) => {setEmail(event.target.value)}} onBlur={handleEmail}/>
                        <span className={`mes-style ${messages.email.color}`}>{messages.email.text}</span>
                     </div>
                  </li>
                  <li className="birth-section">
                     <div className="area-style">
                        <label htmlFor="birthArea" className='label-style'>생년월일</label>
                        <input type="text"  ref={birthInputRef} id="birthArea" required size={8} value={birth} onChange={(event) => {setBirth(event.target.value)}} onBlur={handleBirth}/>
                        <span className={`mes-style ${messages.birth.color}`}>{messages.birth.text}</span>
                        <p className="help-style"><IoCheckmark /> - 를 제외한 8글자 ex) 19900101</p>
                     </div>
                  </li>
                  <li>
                     <br />
                     <hr />
                     <br />
                  </li>
                  <li id="terms-section">
                     <input type="checkbox" id="allCheck" className='check-style' checked={allChecked} onChange={handleAllCheck}/>
                     <label htmlFor="allCheck">이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</label>
                     <br />
                     <h3>[필수] 이용약관 동의</h3>
                     <div className="termsBox">
                        <p>
                           ■ 수집하는 개인정보 항목
                           <br />
                           회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다. 
                        </p>
                        <p>
                        ο 수집항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 , 비밀번호 질문과 답변 , 자택 전화번호 , 자택 주소 , 휴대전화번호 , 이메일 , 직업 , 회사명 , 부서 , 직책 , 회사전화번호 , 취미 , 결혼여부 , 기념일 , 법정대리인정보 , 서비스 이용기록 , 접속 로그 , 접속 IP 정보 , 결제기록
                        <br />
                        ο 개인정보 수집방법 : 홈페이지(회원가입) , 서면양식
                        </p>
                        <p>
                        ■ 개인정보의 수집 및 이용목적
                        </p>
                        <p>
                        회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                        </p>
                        <p>
                        ο 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산 콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송
                        <br />
                        ο 회원 관리
                        <br />
                        회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인 , 고지사항 전달 ο 마케팅 및 광고에 활용
                        <br />
                        접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
                        </p>
                        <p>
                        ■ 개인정보의 보유 및 이용기간
                        </p>
                        <p>
                        회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다.
                        </p>
                     </div>
                     <p>
                        <span>이용약관에 동의하십니까?</span>
                        <input type="checkbox" id="terms-check1" className="check-style" checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)}/>
                        <label htmlFor="terms-check1">동의함</label>
                     </p>
                     <h3>[필수] 개인정보 수집 및 이용 동의</h3>
                     <div className="termsBox">
                        <p>
                        ■ 수집하는 개인정보 항목
                        <br />
                        회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                        </p>
                        <p>
                        ο 수집항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 , 비밀번호 질문과 답변 , 자택 전화번호 , 자택 주소 , 휴대전화번호 , 이메일 , 직업 , 회사명 , 부서 , 직책 , 회사전화번호 , 취미 , 결혼여부 , 기념일 , 법정대리인정보 , 서비스 이용기록 , 접속 로그 , 접속 IP 정보 , 결제기록 <br />
                        ο 개인정보 수집방법 : 홈페이지(회원가입) , 서면양식
                        </p>
                        <p>
                        ■ 개인정보의 수집 및 이용목적
                        </p>
                        <p>
                        회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                        </p>
                        <p>
                        ο 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산 콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송 <br />
                        ο 회원 관리
                        회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인 , 고지사항 전달 ο 마케팅 및 광고에 활용 <br />
                        접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
                        </p>
                        <p>
                        ■ 개인정보의 보유 및 이용기간
                        </p>
                        <p>
                        회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다.
                        </p>
                     </div>
                     <p>
                        <span>개인정보 수집 및 이용에 동의하십니까?</span>
                        <label htmlFor="terms-check2">동의함</label>
                        <input type="checkbox" id="terms-check2" className="check-style" checked={privacyChecked} onChange={()=> setPrivacyChecked(!privacyChecked)}/>
                     </p>
                     <h3>[필수] 쇼핑정보 수신 동의</h3>
                     <div className="termsBox">
                        <p>
                        ■ 수집하는 개인정보 항목 <br />
                        회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                        </p>
                        <p>
                        ο 수집항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 , 비밀번호 질문과 답변 , 자택 전화번호 , 자택 주소 , 휴대전화번호 , 이메일 , 직업 , 회사명 , 부서 , 직책 , 회사전화번호 , 취미 , 결혼여부 , 기념일 , 법정대리인정보 , 서비스 이용기록 , 접속 로그 , 접속 IP 정보 , 결제기록 <br />
                        ο 개인정보 수집방법 : 홈페이지(회원가입) , 서면양식
                        </p>
                        <p>
                        ■ 개인정보의 수집 및 이용목적
                        </p>
                        <p>
                        회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                        </p>
                        <p>
                        ο 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산 콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송 <br />
                        ο 회원 관리
                        회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인 , 고지사항 전달 ο 마케팅 및 광고에 활용 <br />
                        접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
                        </p>
                        <p>
                        ■ 개인정보의 보유 및 이용기간
                        </p>
                        <p>회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다.</p>
                     </div>
                     <p>
                        <span>SMS 수신을 동의하십니까?</span>
                        <input type="checkbox" id="terms-check3" className="check-style" checked={marketingChecked} onChange={()=> setMarketingChecked(!marketingChecked)}  />
                        <label htmlFor="terms-check3">동의함</label>
                     </p>
                  </li>
                  <li className="submit-section">
                     <button className="submit-style" type="submit">회원가입</button>
                  </li>
               </ul>
            </form>
         </fieldset>
      </div>
   );
};

export default SignUpForm;