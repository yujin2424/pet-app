import {createContext, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import MainPage from './page/MainPage';
import AboutPage from './page/AboutPage';
import AboutPage2 from './page/AboutPage2';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickButton from './components/QuickButton';
import SignUpForm from './page/SignUpForm';
import data from './data/data';
import UploadPage from './components/UploadPage';
import ProductPage from './components/ProductPage';
import Login from './components/Login';
import { AccessTokenProvider } from './components/AccessTokenContext'; 

const DataContext=createContext();
function App() {
   let [petdata]=useState(data);
   //console.log(petdata);

  return (
       <AccessTokenProvider>
          <DataContext.Provider value={{petdata}}>
             <div className="App">
               <Header />
               <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/about/:id" element={<AboutPage2 />} />
                  <Route path="/signup" element={<SignUpForm />} />
                  <Route path="/uploadpage" element={<UploadPage />} />
                  <Route path="/products/:id" element={<ProductPage />} />
                  <Route path="/login" element={<Login />} />
               </Routes>
               <Footer />
               <QuickButton />
             </div>
          </DataContext.Provider>   
       </AccessTokenProvider>
  );
}

export default App;
export {DataContext}
