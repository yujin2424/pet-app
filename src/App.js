import { Routes, Route } from 'react-router-dom';
import MainPage from './page/MainPage';
import AboutPage from './page/AboutPage';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickButton from './components/QuickButton';
import SignUpForm from './page/SignUpForm';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        {/* <Route path="/about:id" element={<AboutPage1 />} /> */}

      </Routes>
      <Footer />
      <QuickButton />
    </div>
  );
}

export default App;
