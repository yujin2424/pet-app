import React from 'react';
import MainSlider from '../componenets/MainSlider';
import Tab from '../componenets/Tab';
import List from '../componenets/List';
import TabData from '../data/tab.json';


const AboutPage = () => {
   const listData=TabData.filter((list)=>list.category === "dog"||list.category==="cat");
   const tabLabels=[
      {label: 'dog', value:'dog'},
      {label: 'cat', value:'cat'}, 
   ];
   const aniList=TabData.filter(list=>list.sort==="dog")
   
   return (
      <div>
         <MainSlider />
         <Tab  tabs={tabLabels} tabData={listData} />
         <List aniList={aniList} />
      </div>
   );
};

export default AboutPage;