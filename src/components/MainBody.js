import React from 'react';
import {Outlet} from 'react-router-dom'
import MainBodyLeft from './MainBodyLeft';
import MainBodyRight from './MainBodyRight';
function MainBody() {
 

  return <div className='pt-[65px] relative max-w-[600px] lg:max-w-[940px]  m-auto grid grid-cols-2 lg:grid-cols-3 '>
   <div className='absolute'>
   <Outlet/>
   </div>
     <div className='col-span-2 '>
      <MainBodyLeft/>
     </div>
       <div className='col-span-1 w-full absolute top-[65px] right-0 max-w-[293px] hidden lg:block  '>
       <MainBodyRight/>
       </div>
     
  </div>
}

export default MainBody;
