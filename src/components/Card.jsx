import React from 'react';
import {Link} from 'react-router-dom';


const Card = ({data, i}) => {
    return (
        <div>
                <div className="freshList">
                  <Link to={`/about/${data.id}`}>
                     <div className="imgBox">
                        <img src={process.env.PUBLIC_URL+data.img} alt="" />
                     </div>
                     <div className="textBox"><p>{data.title}</p></div>
                     <div className="priceBox"><p>{data.price}</p></div>
                     <div className="numberBox"><p>{data.id+1}</p></div>
                  </Link>
               </div>

        </div>


    );
};

export default Card;