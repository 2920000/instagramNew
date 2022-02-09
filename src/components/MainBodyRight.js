import React from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { selectLoginUserInfor } from '../features/loginSlice';
function MainBodyRight() {
   const loginUserInfor =useSelector(selectLoginUserInfor)

  return <div className=' fixed w-full max-w-[293px]  '>
         <div>
             <div className=' flex justify-between items-center'>
                 <div className='flex items-center gap-x-4 py-5 px-2 '>
                   <div><img className='w-14 h-14 rounded-full cursor-pointer ' src={loginUserInfor.avatar} alt='' /></div>
                   <span className='text-sm font-medium cursor-pointer' >{loginUserInfor.name}</span>
                 </div>
                 <span className='text-xs text-textFollowColor  cursor-pointer font-medium '>Chuyển</span>
             </div>
         </div>

         <div>

         </div>     
  </div>
}

export default MainBodyRight
