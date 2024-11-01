import React from 'react';
import MainSlider from '../components/MainSlider';
import Tab from '../components/Tab';
import List from '../components/List';
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