import React,{useEffect,useRef} from 'react';
import {CgClose} from 'react-icons/cg'
import { Link ,useNavigate,Outlet} from 'react-router-dom';

function CreatePost() {
    
       const postBoxRef=useRef()
       const askRef=useRef()
       const navigate=useNavigate()
       // xử lý click ra ngoài phần tử sẽ qua trở về trang chính
            useEffect(() => {
            window.onclick=function(event){
                if(postBoxRef.current){
                        if(!postBoxRef.current.contains(event.target)){
                            navigate(-1)

                        }
                }
                
            }  
            })
         
      
       
  return <div className='fixed  flex justify-center items-center top-0 right-0 bottom-0 left-0 z-50  bg-overlayColor mix-blend-multiply  '>
        <Link to='/' ><div className='absolute right-4 top-4'  ><CgClose className='text-4xl cursor-pointer  text-whiteColor' /></div></Link>
             <div ref={postBoxRef} className='w-[500px] flex flex-col overflow-hidden animate-scale  rounded-xl z-30 m-auto absolute bg-whiteColor h-[540px]'>                 
                  <Outlet/>
 
             </div>

             {/* <div  className='fixed  flex justify-center items-center top-0 right-0 bottom-0 left-0 z-50  bg-greyColor mix-blend-multiply  '>
                  <div ref={askRef} className='w-[400px] h-[200px] flex flex-col bg-whiteColor rounded-xl '>
                        <div className='flex flex-col grow  justify-center   items-center' >
                            <h3 className='text-lg font-medium'>Bỏ bài viết?</h3>
                            <p className='text-sm text-greyColor'>Nếu rời đi, bạn sẽ mất những gì vừa chỉnh sửa.</p>
                        </div>
                        <div className='py-3 border-t text-[#ED4956] cursor-pointer font-medium border-borderColor text-center'>Bỏ</div>
                        <div className='py-3 border-t  text-sm cursor-pointer  border-borderColor text-center'>Hủy</div>
                  </div>
                 
             </div> */}

  </div>;
}

export default CreatePost;
