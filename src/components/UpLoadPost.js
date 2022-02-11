import React from 'react';
function UpLoadPost() {
    document.body.style.overflowY='hidden'
    return   <>
      <div className='fixed  flex justify-center items-center top-0 right-0 bottom-0 bg-overlayColor left-0 z-30  mix-blend-multiply '></div>
    <div className="fixed  flex justify-center items-center top-0 right-0 bottom-0 left-0 z-50  ">
    <div className='w-[500px] flex flex-col overflow-hidden animate-scale  rounded-xl  m-auto absolute bg-whiteColor h-[540px]'>                 
           <div className='py-2 font-medium text-center border-b border-borderColor'>Đang chia sẻ</div>
           <div className='flex grow items-center justify-center' >
               <div className='w-[90px] h-[90px] border-[5px] border-t-[5px] border-b-[5px] border-b-pinkColor border-t-pinkColor border-whiteColor  animate-spin rounded-full'></div>
           </div>
       </div>
    </div>        
    </>
  
  
}

export default UpLoadPost;
