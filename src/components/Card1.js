import React from 'react';
import {Link} from 'react-router-dom';

const Card1 = ({data, i}) => {
   return (
      <div className="newList">
         <Link to="">
            <div className="imgBox">
               <img src={process.env.PUBLIC_URL+data.img} alt="" />
            </div>
            <div className="textBox"><p>{data.title}</p></div>
            <div className="addBox"><p>{data.add}</p></div>
         </Link>
      </div>
   );
};

export default Card1;