import React, {useState} from 'react';
import './Tab.scss';

const Tab = ({tabs, tabData}) => {
   const [activeTab, setActiveTab]=useState(tabs[0].value);
   const handleTabClick=(tab)=>{
      setActiveTab(tab);
   }
   const filterData=tabData.filter((a)=>a.category===activeTab)
   return (
      <div className='tab'>
         <div className="tab-menu">
            {tabs.map((tab)=>(
               <button key={tab.value} className={activeTab===tab.value?'active':''} onClick={() => handleTabClick(tab.value)}>{tab.label}</button>
            ))}
         </div>
         <ul className="tabList">
            {
               filterData.map((tablist) => (
                  <li key={tablist.id}>
                     <span className="tab-img">
                        <img src={tablist.imageUrl} alt="" />
                     </span>
                     <div className="tab-description">{tablist.description}</div>
                  </li>
               ))
            }
         </ul>
      </div>
   );
};

export default Tab;