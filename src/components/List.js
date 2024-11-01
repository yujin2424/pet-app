import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import './list.scss';

const List = () => {
   return (
      <div className='list-container'>
         <h2>Animal List</h2>
         <div className="listSwiperWrap">
            <div className="leftBox">
               <div className="textBox">
                  <span className='a'>A</span>
                  <span className='n'>N</span>
                  <span className='i'>I</span>
                  <span className='m'>M</span>
                  <span className='aa'>A</span>
                  <span className='l'>L</span>
               </div>
            </div>
            <div className="rightBox">
            <Swiper
               className='swiper-wrap'
               modules={[Autoplay]}
               spaceBetween={20}
               slidesPerView={4}
               loop={true}
               autoplay={{
                  delay: 2500,
                  disableOnInteraction:false,
               }}
               onSlideChange={() => console.log('slide change')}
               onSwiper={(swiper) => console.log(swiper)}
               >
               <SwiperSlide><img src={process.env.PUBLIC_URL+'/img/img01.jpg'} alt="" /></SwiperSlide>
               <SwiperSlide><img src={process.env.PUBLIC_URL+'/img/img02.jpg'} alt="" /></SwiperSlide>
               <SwiperSlide><img src={process.env.PUBLIC_URL+'/img/img03.jpg'} alt="" /></SwiperSlide>
               <SwiperSlide><img src={process.env.PUBLIC_URL+'/img/img04.jpg'} alt="" /></SwiperSlide>
               <SwiperSlide><img src={process.env.PUBLIC_URL+'/img/img05.jpg'} alt="" /></SwiperSlide>
               <SwiperSlide><img src={process.env.PUBLIC_URL+'/img/img06.jpg'} alt="" /></SwiperSlide>
               <SwiperSlide><img src={process.env.PUBLIC_URL+'/img/img07.jpg'} alt="" /></SwiperSlide>
               <SwiperSlide><img src={process.env.PUBLIC_URL+'/img/img08.jpg'} alt="" /></SwiperSlide>
            </Swiper>
            </div>
         </div>
      </div>
   );
};

export default List;