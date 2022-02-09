import React,{useEffect, useState}from 'react';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import {BiMessageRounded} from 'react-icons/bi'
import {FiSend,FiBookmark} from 'react-icons/fi'
import {CgSmile} from 'react-icons/cg'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { selectAllPosts } from '../features/postsSlice';
import { selectLoginUserInfor } from '../features/loginSlice';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../configFirebase';
import {v4 as uuid} from  'uuid'
function Posts() {
    const navigate=useNavigate()
    // Lấy ra những posts có trong firebase
    const posts=useSelector(selectAllPosts)
    // lấy thông tin user đang đăng nhập
    const loginUserInfor=useSelector(selectLoginUserInfor)
    const [message,setMessage]=useState('')
    // xử lý  xem user đã thả tim hay chưa,nếu thả tim rồi sẽ xóa đi,còn chưa thả tim sẽ được thêm vào
     const handleLove=(docId,love)=>{
        const checkLoved= love.every(userLoved=>userLoved.userIdLoved!==loginUserInfor.userId)
        if(checkLoved){
            updateDoc(doc(db,'posts',docId),{
                love:[...love,{
                    userIdLoved:loginUserInfor.userId,
                    userName:loginUserInfor.name
                  }]
            })
        }
        else{
            const indexOfUserLoved=love.map((userLoved,index)=>{
                if(userLoved.userIdLoved===loginUserInfor.userId){
                    return index
                }
            })
            // copy lại array love cũ để splice không sẽ lỗi
             const loveCopy=[...love]
             loveCopy.splice(indexOfUserLoved[0],1)
             updateDoc(doc(db,'posts',docId),{
                love:[...loveCopy]
            })
        }
     }
     // xử lý submit comment lên firebase 
     const handleSubmit=(e,preComments,docId)=>{
        e.preventDefault()
        updateDoc(doc(db,'posts',docId),{
            comments:[...preComments,{
                commentId:uuid(),
                avatar:loginUserInfor.avatar,
                name:loginUserInfor.name,
                comment:message
            }]
        })
        setMessage('')
     }
     // xử lý khi ấn vào comments để chuyển sang xem ảnh 
     const handleNavigate=(postId)=>{
      sessionStorage.setItem('positionOfScrollBody',window.pageYOffset);
       navigate(`/post/${postId}`)
     }
     // xử lý nếu nhớ vị trí scroll trước khi chuyển sang link mới 
     useEffect(()=>{
      const positionOfScrollBoryPrePage=sessionStorage.getItem('positionOfScrollBody')
       if(positionOfScrollBoryPrePage){
         window.scrollTo(0,positionOfScrollBoryPrePage)
       }
       sessionStorage.removeItem('positionOfScrollBody')
     })
    
     
  return <div>
      {posts.length>0?<div>
  {posts.map(post=><div  key={post.postId} className='my-5 border border-borderColor rounded'>
 <div className='flex p-3 justify-between' >
   <div className='flex gap-x-4 items-center  '>
     <img className='w-8 h-8 rounded-full' src={post.avatar} alt=''/>
      <span className='text-sm font-medium'>{post.userName}</span>
   </div>
    <div className='font-medium text-xl'>...</div>
 </div>
   <div >
      {post.type==='image'
       ?<img className=' object-fill w-full' src={post.pictureOrVideoOfPost} alt='' />
       : <video controls className='object-cover w-full'>
                 <source src={post.pictureOrVideoOfPost} type="video/mp4"/>
               </video>}   
   </div>
   <div className='flex justify-between px-4 py-3 '> 
    <div className='flex gap-x-4 '>
      <span className='relative'><AiOutlineHeart  className='text-[28px] cursor-pointer  '/>
      { <div onClick={()=>{handleLove(post.docId,post.love)}}   className={`text-[28px] ${post.love.some(userLoved=>userLoved.userIdLoved===loginUserInfor.userId)?'text-[#ed4956] opacity-100':'opacity-0'}  ${post.love.some(userLoved=>userLoved.userIdLoved===loginUserInfor.userId)?'':'active:scale-[2]'} absolute top-0 transition-transform duration-700  cursor-pointer `}><AiFillHeart/></div>}
      </span>
      <span><BiMessageRounded className='text-[28px] cursor-pointer'/></span>
      <span><FiSend className='text-[26px] cursor-pointer'/></span>
     
    </div>
    <div>
       <FiBookmark className='text-[26px] cursor-pointer'/>
    </div>
   </div>
    <div className='px-5 pb-5'>
        <div className='text-sm font-medium '>
            {post.love.length>0?<span >{post.love.length} lượt thích</span>:''}
        </div>
        {post.message?<div className='flex items-center gap-x-2 '>
          <div className='font-medium text-sm'>{post.userName}</div>
          <div>{post.message}</div>
        </div>:''}
        {post.comments.length>0?<p onClick={()=>{handleNavigate(post.postId)}} className='text-sm text-greyColor cursor-pointer' >Xem tất cả {post.comments.length} bình luận</p>:''}
         <ul className='list-none'>
             {post.comments.map(comment=><div key={comment.commentId} >
                 <span className='text-sm font-medium'> {comment.name}</span>
                 <span className='text-sm ml-2' >{comment.comment}</span>
             </div>)}
         </ul>
       
    </div>
    <form className='flex items-center border-t  border-greyLightColor justify-between'>
      <div className='py-3 px-4 cursor-pointer'><CgSmile className='text-3xl'/></div>
        <div className='grow'>
      <input value={message}  onChange={(e)=>{setMessage(e.target.value)}} className='w-full bg-[#fafafa] border-0 text-sm outline-none' placeholder='Thêm bình luận'/>
         </div>
       <button disabled={!message}  onClick={(e)=>{handleSubmit(e,post.comments,post.docId)}} className='p-4 text-sm font-medium disabled:opacity-40 text-textFollowColor cursor-pointer'>Đăng</button>
    </form>
  </div>)}
 </div>:''}
  </div>
}

export default Posts