import React from 'react'
import {Link, useParams} from 'react-router-dom'
import { selectAllPosts } from '../features/postsSlice'
import {FaHeart} from 'react-icons/fa'
import {AiTwotoneMessage} from 'react-icons/ai'
import {useSelector} from 'react-redux'
function PersonalPosts() {
  const {userId}=useParams()
  const allPosts=useSelector(selectAllPosts)
  const filterPostsById=allPosts.filter(post=>post.userId===userId)
  return (
  <>{filterPostsById.length>0? <div className='grid  grid-cols-3 gap-[3px] md:gap-6'>
  {filterPostsById.map(post=><div key={post.postId} className='relative'>
    {post.type==='image'
    ?<div><img  className='w-full   aspect-square  object-cover' src={post.pictureOrVideoOfPost}  alt='' /></div>
    :<div>
      <video controls className=' aspect-square w-full'>
        <source src={post.pictureOrVideoOfPost} type='video/mp4' />
      </video>
    </div>}
  <Link to={`/post/${post.postId}`} >
    <div className='opacity-0 hover:opacity-100'>
      <div className='absolute top-0 right-0 cursor-pointer left-0 bottom-0 hover:bg-greyColor mix-blend-multiply'></div>
      <div className='absolute  top-2/4 translate-x-[-50%] translate-y-[-50%] left-2/4 text-whiteColor  flex items-center gap-x-2'>
        <FaHeart className=' text-xl'/>{post.love.length}
        <AiTwotoneMessage className='text-xl'/>{post.comments.length}
      </div>
      </div>
  </Link>
  </div>)}
</div>
  :<div className='flex flex-col-reverse lg:flex-row '>
  <div className='text-2xl font-light' >
  <img className=' w-full lg:max-w-[380px] ' src='https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg' alt='' />
  </div>
  <div className='flex flex-col py-10 lg:py-0 justify-center gap-y-2 items-center grow bg-whiteColor '>
    <p className='font-medium text-lg'>Bắt đầu ghi và chia sẻ khoảnh khắc của bạn</p>
    <p>Tải ứng dùng để chia sẻ ảnh học video đầu tiên của bạn</p>
    <div className='flex mt-4 space-x-2 '>
        <div> <img className='w-32' src='https://www.instagram.com/static/images/appstore-install-badges/badge_ios_vietnamese-vi.png/3025bd262cee.png' alt='' /></div>
        <div> <img className='w-32' src='https://www.instagram.com/static/images/appstore-install-badges/badge_android_vietnamese-vi.png/c36c88b5a8dc.png' alt=''/></div>
       
    </div>
  </div></div>
}</>
  )
}

export default PersonalPosts