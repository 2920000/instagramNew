import React,{useState} from 'react';
import {BiArrowBack} from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'
import { selectLoginUserInfor } from '../features/loginSlice';
import {useSelector,useDispatch} from 'react-redux'
import { selectPreAvatar ,addPostToFirebase} from '../features/postSlice';

function DetailPost() {
    const dispatch= useDispatch()
    const [input,setInput]=useState('')
    const loginUserInfor=useSelector(selectLoginUserInfor)
    const preAvatar=useSelector(selectPreAvatar)
    const navigate=useNavigate()
    // xử lý quay trở lại trong select ảnh
    const handleBackToSelectAgain=()=>{
          navigate('/create/select')
    }
   // dữ liệu cần thiết để đưa lên firebase
    const postData={
       userId:loginUserInfor.userId,
       userName:loginUserInfor.name,
       message:input,
       avatar:loginUserInfor.avatar,
       postPictureUpToFirebaseStorage:preAvatar.linkUpToFirebaseStorage,
       type:preAvatar.type
       
    }
    // xử lý dispatch hành động đưa ảnh lên firebase
    const handlePost=()=>{
        dispatch(addPostToFirebase(postData))
        navigate('/create/upload')
    }
  return <div className='flex items-center flex-col  h-full'>
  <div className='w-full'>
          <div className='flex justify-between items-center py-2 px-3'>
              <span onClick={handleBackToSelectAgain}  className='text-2xl cursor-pointer'><BiArrowBack  /></span>     
              <span onClick={handlePost}  className='font-medium text-blueColor cursor-pointer'>Post</span>
          </div>

          <div className='px-2 mt-5'>
              <div className='flex items-center gap-x-2  '> 
               <img className='w-8 h-8  rounded-full' src={loginUserInfor.avatar}  alt='' />
                <span className='font-medium text-sm'>{loginUserInfor.name}</span>
              </div>
            <div><textarea autoFocus value={input} onChange={(e)=>{setInput(e.target.value)}}  className='border-0 w-full pt-2 outline-none' placeholder='Viết chú thích' /></div>
          </div>
          
        </div> 

         {preAvatar.type==='image' &&<img className=' object-contain  max-w-full mt-5 '  src={preAvatar.link} alt=''/> }
         {preAvatar.type==='video'&& <video width="500"  controls className='mt-5'>
         <source src={preAvatar.link} type="video/mp4"/>

       </video>}

        </div>
}

export default DetailPost;
