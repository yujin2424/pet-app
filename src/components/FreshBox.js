import React, {useContext} from 'react';
import Card from './Card';
/* import data from '../data/data';
import {Link} from 'react-router-dom'; */
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import {DataContext} from '../App';
import './freshBox.scss';

const FreshBox = () => {

   const {petdata} = useContext(DataContext)
   return (
      <div className='freshboxWrap'>
         <h2>Hello Fresh Box</h2>
         <p>We save you serious time</p>
         <div className="freshslider">
         <Swiper className='freshboxswiper'
         modules={[Navigation, Pagination]}
         spaceBetween={50}
         slidesPerView={4}
         navigation
         pagination={{type:'fraction'}}
         loop={true}
         autoplay={true}
         onSlideChange={() => console.log('slide change')}
         onSwiper={(swiper) => console.log(swiper)}
         >
            {
               petdata.map((data, i) =>{
                  return (
                        <SwiperSlide>
                           <Card data={data} i={i}/>
                        </SwiperSlide>
                  )
               })
            }


         </Swiper>
         </div>
      </div>
   );
};

export default FreshBox;