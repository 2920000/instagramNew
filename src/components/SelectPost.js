import React ,{useState}from 'react';
import {ImFilePicture} from 'react-icons/im'
import { useNavigate} from 'react-router-dom';
function SelectPost() {
    const navigate=useNavigate()
    const [linkPreview,setLinkPreview]=useState()
    const handlePhotoPreview=(e)=>{
        const photoUrlPreview=URL.createObjectURL(e.target.files[0])
        setLinkPreview({
            link:photoUrlPreview,
            type:e.target.files[0].type.slice(0,5)
        })  
  }   
  if(linkPreview){
      navigate('/create/detail')
  }

  return <div className='h-full flex flex-col' >
  <div className='text-center py-2 border-b border-borderColor font-medium'>Tạo bài viết mới</div>
 <div className='flex flex-col items-center justify-center gap-y-5  grow'>
    <ImFilePicture className='text-7xl'/>
    <span className='text-xl font-light'>Kéo ảnh và video vào đây</span>
    <input className=' hidden' onChange={(e)=>{handlePhotoPreview(e)}}   id='file-upload' type='file' />
    <label  className='cursor-pointer py-2 px-2 text-sm rounded leading-none text-whiteColor font-medium bg-[#0095f6]' htmlFor='file-upload'>Chọn từ máy tính</label>
 </div>

  </div>
}

export default SelectPost;
