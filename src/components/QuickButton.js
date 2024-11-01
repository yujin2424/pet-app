import React,{useState, useEffect} from 'react';
import { BsArrowUpCircleFill } from "react-icons/bs";

const QuickButton = () => {
    const [isVisible, setIsVisible]=useState(false);

    useEffect(()=>{
        const handleScroll = () =>{
            setIsVisible(window.scrollY>300);
        };
        window.addEventListener("scroll", handleScroll);
        return () =>{
            window.removeEventListener("scroll", handleScroll)
        }
    },[]);

    const scrollTop=()=>{
        window.scrollTo({top: 0, behavior: "smooth"})
    }
    return isVisible && (
        <div className='QuickButton' onClick={scrollTop} style={{position:'fixed', right:'20px', bottom: '14%', zIndex:101}}>
            <BsArrowUpCircleFill style={{fontSize:'35px', color: '#bbb'}} />
        </div>
    );
};

export default QuickButton;