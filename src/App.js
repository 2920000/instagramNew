import './App.css';
import React,{memo} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Login from './components/Login';
import MainPage from './components/MainPage';
import {onAuthStateChanged,getAuth} from 'firebase/auth'
import { useEffect, useState } from 'react';
import { LOGIN_USER_INFOR } from './features/loginSlice';
import { getUsersFromFirebase } from './features/usersSilce';
import { getPostsFromFirebase } from './features/postsSlice';
function App() {
  const [user,setUser]=useState()
  const dispatch=useDispatch()
  const auth= getAuth()
  // khi load lại trang , lấy dữ liệu từ firebase đổ vào store để dùng
    window.onload=function(){
      dispatch(getUsersFromFirebase())
      dispatch(getPostsFromFirebase())
    }
  

  useEffect(()=>{
   onAuthStateChanged(auth,user=>{
    if(user){
      setUser(user)
      // một số thông tin cần thiết của user đang đăng nhập
      const loginUserInfor={
        userId:user.uid,
        name:user.displayName,
        avatar:user.photoURL
      } 
      dispatch(LOGIN_USER_INFOR(loginUserInfor))
    }
    else
      {
        setUser('') 
      }
  })
})
 
 if(user){
  return  <MainPage/>
 }
 else{
  return <Login/>
 }
}


export default memo(App);
