import React,{useEffect, useState} from 'react';
import { SiDatadog } from "react-icons/si";
import {Button} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import { API_URL } from '../config/constants';
import axios from "axios";

import './products.scss';
const Products = () => {
   const [products, setProducts] = useState([]);
   const navigate=useNavigate();
   useEffect(()=>{
      let url=`${API_URL}/products`;
      axios.get(url)
      .then((result) =>{
         const products=result.data.products;
         setProducts(products)
         
      })
      .catch((error) =>{
         console.log(error)
      })
   }, []);
   console.log(products)
   return (
      <div className='products'>
         <h2>Products</h2>
         <p>상품업로드</p>
         <Button onClick={()=> navigate('/uploadpage')} size="large" icon={<DownloadOutlined />} className='button'>상품 업로드</Button>
         <div className="product-list">
               
            {
               products.map((product, idx)=>{
                  return (
                     <div className="product-card" key={idx}>
                        <Link to={`/products/${product.id}`}>
                           <div className="productImg">
                              <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} className="product-img" />
                           </div>
                           <div className="product-content">
                              <span className="product-name">{product.name}</span>
                              <span className="product-price">{product.price}원</span>
                              <span className="product-seller">
                                 <SiDatadog className='icon' />
                                 <span>{product.seller}</span>
                              </span>
                           </div>
                        </Link>
                     </div>
                  )
               })
            }         
         </div>
      </div>
   );
};

export default Products;