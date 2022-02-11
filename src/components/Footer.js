import React from 'react'

function Footer() {
  return (
    <footer>
    <div className='flex flex-col space-y-5 items-center py-16'>
            <div className='flex space-x-5 text-[#8e8e8e] text-xs'>
              <span>Meta</span>
              <span>Giới thiệu</span>
              <span>Blog</span>
              <span>Việc làm</span>
              <span>Trợ giúp</span>
              <span>Api</span>
              <span>Quyền riêng tư</span>
              <span>Tài khoản liên quan nhất</span>
              <span>Hashtag</span>
              <span>Vị Trí</span>
              <span>Instagram Lite</span>
            

            </div>

            <div className='flex space-x-5 text-[#8e8e8e] text-xs'>
               <span>Tiếng Việt</span>
                <span>@ 2022 Instagram from Meta</span>
            </div>
        </div>
        
    </footer>
  )
}

export default Footer