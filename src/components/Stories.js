import React,{memo} from 'react';
import {useSelector} from 'react-redux'
function Stories() {

  return <div className='w-full bg-whiteColor border border-borderColor ' >
  <div className='flex py-5 px-3'>
  <div className='flex flex-col cursor-pointer space-y-1 items-center'>
          <span><img  className='w-14 h-14 rounded-full shadow-inner object-cover outline outline-[#e45478] p-[1.5px] ' src={{}} alt='' /></span>
          <span className='text-xs w-[70px]  text-center text-ellipsis whitespace-nowrap overflow-hidden'></span>
      
    </div>
    </div>
</div>;
}




export default memo(Stories);

