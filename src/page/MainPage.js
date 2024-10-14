import React from 'react';
import MainSlider from '../components/MainSlider';
import Best from '../components/Best';
import FreshBox from '../components/FreshBox';

const MainPage = () => {
    return (
        <div>
            <section className='section01'>
                <MainSlider />
            </section>
            <section className='section02'>
                <Best />
            </section>
            <section className="section03">
                <FreshBox />
            </section>
        </div>
    );
};

export default MainPage;