import React from 'react'

function SeeFollowing() {
  return (
      <div>
    <div className='fixed top-0 right-0 left-0 bottom-0 bg-overlayLightColor  mix-blend-multiply z-40 '></div>
    <div className='fixed top-0 right-0 left-0 bottom-0  flex justify-center items-center z-50 '>
              <div className='w-[400px] h-[350px] bg-whiteColor flex flex-col rounded-md'>
                        <p className='py-2 text-center border-b border-borderColor font-medium '>Đang theo dõi</p>
                        <div className='flex grow overflow-y-auto'>

                        </div>
              </div>
              </div>
      </div>
  )
}

export default SeeFollowing