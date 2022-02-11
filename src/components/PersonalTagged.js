import React from 'react'
import {MdOutlinePersonPin} from 'react-icons/md'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import { selectLoginUserInfor } from '../features/loginSlice'
function PersonalTagged() {
  let {userId} =useParams()
  const loginUserInfor=useSelector(selectLoginUserInfor)
  return (
    <div className='flex flex-col items-center space-y-4 py-12' >
    <div className='rounded-full p-2 border-2 border-solid '><MdOutlinePersonPin className='text-4xl  ' /></div>
    {userId===loginUserInfor.userId?<><p className='text-3xl font-light'> Ảnh có mặt bạn</p>
    <p className='text-sm max-w-[350px] text-center'>Khi mọi người gắn thẻ bạn trong ảnh, ảnh sẽ xuất hiện tại đây.</p></>:<p className='text-3xl font-light'> Chưa có ảnh nào</p>}
</div>
  )
}

export default PersonalTagged