import React, { useEffect,useRef } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { selectUnfollow } from '../features/followSlice'
import { UNFOLLOW_BOX } from '../features/followSlice'
import { actionUpdateFollow } from '../features/usersSilce'
function UnFollowBoxWithOverlay() {
    const dispatch=useDispatch()
    const overlayRef=useRef()
    const unFollowBox=useSelector(selectUnfollow)
    
    
    useEffect(()=>{
        const event=window.addEventListener('mousedown',event=>{
                   if(event.target===overlayRef.current){
                       dispatch(UNFOLLOW_BOX({
                        isShow:false,
                        dataUserToUnfollow:{}
                    }))
                   }
        })
        return ()=>{
            window.removeEventListener('mousedown',event)
        }
    })
 
    // dispatch 2 actions, một là tắt  unfollowBox và update dữ liệu mới lên firebase
    const handleUnfollow=()=>{
        dispatch(actionUpdateFollow(unFollowBox.dataToUpdateFollowStatus.loginUserFullData,unFollowBox.dataToUpdateFollowStatus.userClickedToUnfollow))
        dispatch(UNFOLLOW_BOX({
            isShow:false,
            dataUserToUnfollow:{}
        }))
    }
    const handleOffBox=()=>{
        dispatch(UNFOLLOW_BOX({
            isShow:false,
            dataUserToUnfollow:{}
        }))
    }
  return (
    <>{unFollowBox.isShow?<div>
        <div className='fixed top-0 right-0 left-0 bottom-0 mix-blend-multiply z-30 bg-[#000000A6]'></div>
        <div ref={overlayRef} className='fixed  top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center'>
                   <div className=' w-[400px] h-[300px] flex flex-col  animate-scale rounded-xl bg-whiteColor '>
                         <div className='flex flex-col items-center gap-y-5 grow justify-center'>
                              <span><img className='w-24 rounded-full' src={unFollowBox.dataUserToUnfollow.avatar} alt='' /></span>
                              <span className='text-sm'>Bỏ theo dõi {unFollowBox.dataUserToUnfollow.userName}?</span>
                         </div>
                          <div>
                              <div onClick={handleUnfollow} className='py-3 border-t border-borderColor text-center  font-bold text-sm cursor-pointer text-[#ED4956] active:bg-greyLightColor '>Bỏ theo dõi</div>
                              <div onClick={handleOffBox}  className='py-3 border-t border-borderColor text-center cursor-pointer active:bg-greyLightColor rounded-b-xl '>Hủy</div>

                          </div>
                   </div>

        </div>

    </div>:''}</>
  )
}

export default UnFollowBoxWithOverlay