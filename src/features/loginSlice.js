import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { db } from '../configFirebase'
import {signInWithPopup,getAuth,FacebookAuthProvider,GoogleAuthProvider, signInAnonymously} from 'firebase/auth'
import {addDoc,collection,onSnapshot} from 'firebase/firestore'


const auth=getAuth()
// const provider= new FacebookAuthProvider()
const provider= new GoogleAuthProvider()


export const getUserInfor=createAsyncThunk(
    'login/userInfo',
    async()=>{
        const logInInfor = await signInWithPopup(auth,provider)
        // const GooglelogInInfor= await signInWithPopup(auth,googleProvider)
        const userInfor=logInInfor.user
        console.log(userInfor)
        
        // lấy users về từ firebase để kiểm tra sự tồn tại , nếu Id trùng thì không thêm vào nữa    
        onSnapshot(collection(db,'users'),usersDocs=>{
             const allUsers= usersDocs.docs.map(docs=>docs.data())
             const checkExistUser=allUsers.every(user=>user.userId!==userInfor.uid)
        
              if(checkExistUser){
                addDoc(collection(db,'users'),{
                    userId:userInfor.uid,
                    userName:userInfor.displayName,
                    email:userInfor.email,
                    avatar:userInfor.photoURL,
                    postsNumber:0,
                    followers:[],
                    following:[],
                    isReady:false,
                    chatBoxes:[],
                    postsSaved:[]
                
                })
              }
             
           
        })
    
         
    }
)

const initialState={
    loginUserInfor:{},

}


const loginSlice=createSlice({
    name:'login',
    initialState,
    reducers:{
     LOGIN_USER_INFOR:(state,action)=>{
         state.loginUserInfor=action.payload
     }

    }
})
export default loginSlice.reducer
export const {LOGIN_USER_INFOR} =loginSlice.actions
export const selectLoginUserInfor=state=>state.logIn.loginUserInfor