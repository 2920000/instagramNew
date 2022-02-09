import './App.css';
import React,{memo} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Login from './components/Login';
import MainPage from './components/MainPage';
import {onAuthStateChanged,getAuth} from 'firebase/auth'
import { useEffect, useState } from 'react';
import { LOGIN_USER_INFOR } from './features/loginSlice';
import { getUsersFromFirebase } from './features/usersSilce';
function App() {
  const [user,setUser]=useState()
  const dispatch=useDispatch()
  const auth= getAuth()
  useEffect(()=>{
    dispatch(getUsersFromFirebase())
  
    },[]) 

  useEffect(()=>{
   onAuthStateChanged(auth,user=>{
    if(user){
      console.log('render')
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
