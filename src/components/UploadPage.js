import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Divider, InputNumber, message, Upload  } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {API_URL} from "../config/constants.js";
import axios from 'axios';

/* const {TextArea} =input; */

import 'antd/dist/reset.css';
import "./uploadpage.scss";




const UploadPage = () => {
   const [imageUrl, setImageUrl] = useState(null);
   const navigate=useNavigate();

   const onFinish = (val) => {
      axios.post(`${API_URL}/products`, {
         name:val.name,
         description: val.description,
         price:val.price,
         seller:val.seller,
         imageUrl:imageUrl,
      })
      .then((result)=>{
         navigate("/", {replace:true})
      })
      .catch((error)=>{
         console.error(error);
         message.error(`에러가 발생했습니다.`)
      })
   };

   const onChangeImage = (info) =>{
      if(info.file.status === "uploading"){
         return;
      }
      if(info.file.status === "done"){
         const response=info.file.response;
         const imageUrl=response.imageUrl;
         setImageUrl(imageUrl)
      }
   }

   return (
      <div className='upload-container'>
         <Form name="uploadForm" onFinish={onFinish}>
            <Form.Item name="files" valuePropName='image'>
               <Upload name="image" action={`${API_URL}/image`} listType="picture" showUploadList={false} onChange={onChangeImage}>
               {
                  imageUrl ? (
                     <img  id="upload-img" src={`${API_URL}/${imageUrl}`} alt=""/>
                  ) : (
                     <div className="upload-img">
                     <img src={process.env.PUBLIC_URL + '/img/icon/camera.png'} alt="" />
                     <span>이미지를 업로드해주세요</span>
                     </div>
                  )
               }
                  
               </Upload>
            </Form.Item>
            <Divider />
            <Form.Item
            label={<span className='upload-label'>판매자명 </span>}
            name="seller"
            rules={[
               {
               required: true,
               message: '판매자명은 필수 입력사항입니다.',
               },
            ]}
            >
            <Input className='upload-seller' placeholder='이름을 입력해주세요' size="large" />
            </Form.Item>
            <Divider />
            <Form.Item
            label={<span className='upload-label'>상품명 </span>}
            name="name"
            rules={[
               {
               required: true,
               message: '상품명은 필수 입력사항입니다.',
               },
            ]}
            >
            <Input className='upload-name' placeholder='상품명을 입력해주세요' size="large" />
            </Form.Item>

            <Divider />
            <Form.Item
            label={<span className='upload-price'>판매가 </span>}
            name="price"
            rules={[
               {
               required: true,
               message: '판매가는 필수 입력사항입니다.',
               },
            ]} initialValue={0}
            >
            <InputNumber className='upload-price' min={0} size="large" />
            </Form.Item>

            <Divider />
            <Form.Item
            label={<span className='upload-label'>상품설명 </span>}
            name="description"
            rules={[
               {
               required: true,
               message: '상품설명은 필수 입력사항입니다.',
               },
            ]} 
            >
            <TextArea size="large" id="product-description" placeholder="상품설명을 작성해주세요"></TextArea>
            </Form.Item>
            <Form.Item>
               <Button id="submit-button" htmlType='submit'>상품등록하기</Button>
            </Form.Item>


         </Form>
      </div>
   );
};

export default UploadPage;