import React,{memo} from 'react';
import {useSelector} from 'react-redux'
import { selectAllUserExceptLoginUser } from '../features/usersSilce';
function Stories() {
  const allUserExpeptLogin=useSelector(selectAllUserExceptLoginUser)

  return <div className='w-full bg-whiteColor border border-borderColor ' >
  <div className='flex p-5'>
  <div className='flex gap-x-5 cursor-pointer space-y-1 items-center'>
         {allUserExpeptLogin.map(user=><div key={user.userId}>
          <span><img  className='w-14 h-14 rounded-full shadow-inner object-cover outline outline-[#e45478] p-[1.5px] ' src={user.avatar} alt='' /></span>
          <span className='text-xs w-[70px]  text-center text-ellipsis whitespace-nowrap overflow-hidden'></span>
         </div>)}
      
    </div>
    </div>
</div>;
}




export default memo(Stories);

