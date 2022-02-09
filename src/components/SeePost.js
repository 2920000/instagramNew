import React,{useEffect, useRef} from 'react';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import  {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { selectLoginUserInfor } from '../features/loginSlice';
import { selectAllPosts } from '../features/postsSlice';
import {useParams} from 'react-router-dom'
function SeePost() {
  const {postId} =useParams()
  const overlayRef=useRef()
  const navigate =useNavigate()
  const loginUserInfor=useSelector(selectLoginUserInfor)
  const allPosts=useSelector(selectAllPosts)
  const filterPostsById=allPosts.find(post=>post.postId===postId)
  useEffect(()=>{
  const event=window.addEventListener('mousedown',event=>{
      if(overlayRef.current){
        if(overlayRef.current===event.target){
          navigate('/')
        }
      }
    })
return ()=>{
  window.removeEventListener('mousedown',event,true)
}
  })
  return <>
    {filterPostsById?<>
    <div className='fixed right-0 top-0 bottom-0 left-0 bg-greyColor mix-blend-multiply z-50'></div>
    <div ref={overlayRef} className=' fixed top-0 right-0 left-0 bottom-0 flex py-[26px] px-[70px] 2xl:px-[200px] z-50  '>
         <div className='w-full flex z-50 min-h-[100px] h-auto  '>
                 <div className='w-[666px]  bg-blackColor h-full py-20'>
                    {filterPostsById.type==='image'
                    ?<img src={filterPostsById.pictureOrVideoOfPost} alt='' className='object-cover w-full  h-full' />
                    :<video className='w-[99.9%] h-full' controls>
                        <source src={filterPostsById.pictureOrVideoOfPost}  type='video/mp4' />
                    </video>}
                 </div>
                 <div className='bg-whiteColor rounded-r-md grow'>
                     <div className='flex flex-col h-full' >
                         <div className='flex items-center gap-x-2 p-3 border-b border-borderLightColor'>
                           <img className='w-8 h-8 rounded-full cursor-pointer' src={filterPostsById.avatar} alt='' />
                            <span className='text-sm font-medium cursor-pointer' >{filterPostsById.userName }</span>
                            <span>&bull;</span>
                         </div>
                         <div className='flex grow w-full'>
                           <div className='w-full' >
                              <div className='flex items-center gap-x-2 py-5  px-3'>
                                    <img className='w-8 h-8 rounded-full cursor-pointer' src={filterPostsById.avatar} alt='' />
                                    <span className='text-sm font-medium cursor-pointer' >{filterPostsById.userName }</span>
                                    <p className='font-light'>{filterPostsById.message}</p>
                                </div>
                             <div>
                                <div className='w-full'>
                                    {filterPostsById.comments.map(comment=><div key={comment.commentId}>
                                        <div className='flex items-center justify-between py-5  px-3 w-full'>
                                            <div className='flex items-center gap-x-2  '>
                                                <img className='w-8 h-8 rounded-full' src={comment.avatar} alt='' />
                                                <span className='text-sm font-medium cursor-pointer'>{comment.name}</span>
                                                <span className='font-light'>{comment.comment}</span>
                                            </div>
                                            <span className='text-sm cursor-pointer'><AiOutlineHeart/></span>
                                        </div>
                                    </div>)}
                                </div>
                             </div>
                           </div>
                         </div>
                         <div className='h-40 w-full border-t border-borderLightColor'>

                         </div>
                     </div>
                 </div>
         
         </div>
       
    </div>
  </>:''}
  </>
  
}

export default SeePost
