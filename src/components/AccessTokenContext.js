// AccessTokenContext.js
import { createContext, useContext, useState, useEffect} from 'react';
import { API_URL } from '../config/constants';
import axios from 'axios';

const AccessTokenContext = createContext();

export const useAccessToken = () => {
  return useContext(AccessTokenContext);
};

export const isActiveToken = async (accessToken) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, { accessToken});
    const result = response.data.result;
    
    if(result.id){
      return { 'accessResult' : true , 'user_id' : result.id }
    } else {
      return { 'accessResult' : false }
    }
  } catch (error) {
    console.error(error);
    return {accessResult: false}; // 에러 발생 시 유효하지 않은 것으로 처리
  }
}
export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [accessResult, setAccessResult] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
   const verifyToken=async () => {
      if(accessToken){
         const result=await isActiveToken(accessToken);
         setAccessResult(result.accessResult);
         setUserId(result.user_id);
      }else{
         setAccessResult(false);
         setUserId(null);
      }
      setLoading(false);
   }
   verifyToken();
  }, [accessToken]);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken, accessResult,user_id, loading }}>
      {children}
    </AccessTokenContext.Provider>
  );
};