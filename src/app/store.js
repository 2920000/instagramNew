import {configureStore} from '@reduxjs/toolkit'
import loginSlice from '../features/loginSlice'
import usersSilce from '../features/usersSilce'
export const store=configureStore({
    reducer:{
        logIn:loginSlice,
        users:usersSilce
    },
    middleware:getDefaultMiddleware=>(
        getDefaultMiddleware({
          serializableCheck:false
        })
      ),
  
    
})
