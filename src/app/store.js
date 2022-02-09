import {configureStore} from '@reduxjs/toolkit'
import loginSlice from '../features/loginSlice'
import postSlice from '../features/postSlice'
import postsSlice from '../features/postsSlice'
import usersSilce from '../features/usersSilce'
export const store=configureStore({
    reducer:{
        logIn:loginSlice,
        users:usersSilce,
        post:postSlice,
        posts:postsSlice
    },
    middleware:getDefaultMiddleware=>(
        getDefaultMiddleware({
          serializableCheck:false
        })
      ),
  
    
})
