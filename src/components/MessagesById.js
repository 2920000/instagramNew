import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { db } from '../configFirebase'
import { selectLoginUserFullData } from '../features/usersSilce'
import {useSelector} from 'react-redux'
import {v4 as uuid} from 'uuid'
function MessagesById() {
    const {messagesId}=useParams()
    const [messageById,setMessageById]=useState({})
    const [input,setInput]=useState('')
    const loginUserFullData=useSelector(selectLoginUserFullData)
    useEffect(()=>{
        onSnapshot(collection(db,'chatBoxes'),chatBoxesDocs=>{
            const allChatBoxes=chatBoxesDocs.docs.map(chatBox=>({...chatBox.data(),docId:chatBox.id}))
            const filterMessageById=allChatBoxes.find(chatBox=>chatBox.boxId===messagesId)
            setMessageById(filterMessageById)
        })
    },[messagesId])
    const handleSubmitMessage=(e,user)=>{
e.preventDefault()
updateDoc(doc(db,'chatBoxes',messageById.docId),{
    messages:[...messageById.messages,{
        messageId:uuid(),
        userId:user.userId,
        avatar:user.avatar,
        userName:user.userName,
        message:input
    }]
})
setInput('')
    }
 if(messageById.boxId){
     const arrayUser=[messageById.user1,messageById.user2]
     const filterUser=arrayUser.find(user=>user.userId!==loginUserFullData.userId)
     const filterUser1=arrayUser.find(user=>user.userId===loginUserFullData.userId)


    return (
        <div className='flex flex-col w-full'>
            <div className='flex  w-full items-center gap-x-3 py-4 pl-10 border-b border-borderColor'>
            <img className='rounded-full w-8' src={filterUser.avatar} alt=''/>
             <span className='font-medium text-sm'>{filterUser.userName}</span>
            </div>
            <div className='grow overflow-y-auto p-5'>
                   {messageById.messages.map(messageOfUser=><div className={`flex w-full gap-x-2 mb-3 ${messageOfUser.userId===loginUserFullData.userId?'justify-end':''} `} key={messageOfUser.messageId}>
                       <img className={`rounded-full ${messageOfUser.userId===loginUserFullData.userId?'hidden':''} w-10`} src={messageOfUser.avatar} alt='' />
                       <span className={`py-2 px-3 ${messageOfUser.userId===loginUserFullData.userId?' bg-greyLightColor text-sm':''} rounded-[30px] border border-borderColor`}>{messageOfUser.message}</span>
                   </div>)}
            </div>
            <form className='px-8 py-5'>
                <input value={input} onChange={(e)=>{setInput(e.target.value)}} className='py-2 border border-borderColor px-3 outline-none w-full rounded-[50px] text-sm' placeholder='Nhắn tin' />
                <button onClick={(e)=>{handleSubmitMessage(e,filterUser1)}} ></button>
            </form>
        </div>
      )
 }
 else{
     return ''
 }
}

export default MessagesById