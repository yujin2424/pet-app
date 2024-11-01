import React,{useContext} from 'react';
import { DataContext } from '../App';
import { useParams } from 'react-router-dom';
import './aboutPage2.scss';

const AboutPage2 = () => {
    let {id} =useParams();
    const {petdata}=useContext(DataContext);
    /* console.log(petdata); */
    return (
        <div className='aboutPageWrap'>
            <h2>상세페이지</h2>
        <div className='aboutWrap'>
                <div className="aboutPageImgWrap">
                    <img src={petdata[id].img} alt={petdata[id].title} />
                </div>
                <div className="aboutPageTextWrap">
                    <div className="title">내용 : {petdata[id].title}</div>
                    <div className="price">가격 : {petdata[id].price}</div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage2;