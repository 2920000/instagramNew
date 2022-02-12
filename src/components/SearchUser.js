import React, { useEffect, useRef } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUserExceptLoginUser } from '../features/usersSilce'
function SearchUser({input,searchBoxstatus,setSearchBox,searchBoxRef,setCloseIcon,setInput}) {
  const allUsersExceptLoginUser=useSelector(selectAllUserExceptLoginUser)
 
   
   const filterGetUserName=allUsersExceptLoginUser.filter(user=>{
     // chuyển tên sang viết thường , bỏ khoảng trắng
      const userNameLowerCase=user.userName.toLowerCase()
       const arrayName=userNameLowerCase.split(" ")
       const userNameNoWhiteSpace=arrayName.join('')

      // chuyển input sang viết thường , bỏ khoảng trắng
       const inPutLowerCase=input.toLowerCase()
       const  arrayInput=inPutLowerCase.split(" ")
       const inputNoWhiteSpace=arrayInput.join('')
       // chuyển hết dấu của input và userName sang không dấu
       const newStrInput = inputNoWhiteSpace.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
       const newStrUserName = userNameNoWhiteSpace.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return newStrUserName.includes(newStrInput)
      
        
         
   })
   useEffect(()=>{
     const event= window.addEventListener('mousedown',event=>{
       if(searchBoxRef){
        if(!searchBoxRef.current.contains(event.target)){
          setSearchBox(false)
          setCloseIcon(false)
          setInput('')

         }
       }
      })
      return ()=>{
        window.removeEventListener('mousedown',event)
      }
    })
    const handleCloseSearchBox=()=>{
      setSearchBox(false)
    setInput('')

    }
  return (
   <>{searchBoxstatus&& <div  className='absolute flex flex-col  w-[360px] h-[350px] rounded-md top-[48.5px] shadow-lg left-[-60px] bg-whiteColor '>
   <div className='absolute h-[10px] w-[10px] rotate-45 shadow-[0_0_1px_grey] z-[-1] bg-whiteColor  top-[-5px] left-2/4'></div>
    <div className='grow overflow-y-auto'>
       {input?<div className='pt-2'>
         {filterGetUserName.map(user=><Link to={`/${user.userId}`} onClick={handleCloseSearchBox}  className='flex  gap-x-2 items-center p-2 hover:bg-greyLightColor cursor-pointer' key={user.userId}>
             <img className='w-10 rounded-full' src={user.avatar} alt='' />
             <span className='font-medium text-sm'>{user.userName}</span>
         </Link>)}
       </div>
       :   <div className=' font-medium py-3 pl-4'>Gần đây</div>}
    </div>
</div>}</>
  )
}

export default SearchUser