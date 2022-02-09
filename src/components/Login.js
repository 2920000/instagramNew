import React,{memo,useEffect} from 'react';
import {AiFillFacebook} from 'react-icons/ai'
import {RiInstagramFill} from 'react-icons/ri'
import {useDispatch,useSelector} from 'react-redux'
import { getUserInfor } from '../features/loginSlice';
function Login() {
   const dispatch=useDispatch()
//  useEffect(()=>{
//     var x=0
//     const photo= document.getElementsByClassName('photoLogin')
//     clearInterval(x)
//   var x= setInterval(() => {
//          x++
//        if(x>3){
//            x=0
//        }
//        photo[x].style.display='block'
//        for(let i=0;i<photo.length;i++){
//         if(i===x){
//             continue
//         }else
//         {
//             photo[i].style.display='none'
//         }
//     }
//      }, 3000);

//      return ()=>{
//          clearInterval(x)
//      }
   
//  },[])





 const handleLogin=()=>{
  dispatch(getUserInfor())
 }

  return <>
     <div className='max-w-4xl relative  h-screen m-auto  flex justify-center  items-center space-x-3  '>
        
          <div className='relative   top-0 hidden lg:block  ' >
                <img src='https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png' alt='' />
                <div className='absolute top-[100px] left-[150px] photoLogin  '>
                    <img className='animate-opacity' src='https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg' alt=''/>
                </div>
                {/* <div className='absolute top-[100px] left-[150px] photoLogin'>
                    <img className='animate-opacity' src='https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg' alt=''/>
                </div>
                <div className='absolute top-[100px] left-[150px] photoLogin'>
                    <img className='animate-opacity' src='https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg' alt=''/>
                </div>
                <div className='absolute top-[100px] left-[150px] photoLogin'>
                    <img className='animate-opacity' src='https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg' alt=''/>
                </div> */}
         </div>
          
        <div className=' w-[350px] p-7 flex flex-col items-center border border-greyColor rounded-lg '>
            <div className=' '>
                <h1 className='text-4xl font-sans mb-10 flex items-center gap-x-2'>
                  <RiInstagramFill/>Instagram</h1> 
            </div>
            <div className='flex space-x-2 items-center'>
                 <AiFillFacebook className='text-xl text-blueColorLogin'/>
               <button onClick={handleLogin}  className='text-blueColorLogin  font-medium text-sm'>Đăng nhập bằng Facebook</button>
            </div>

      
      </div>       
     </div>

      
  </>;
}

export default memo(Login);

