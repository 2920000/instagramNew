import axios from "axios"
export const fetch=async()=>{
    const users= await axios.get('https://jsonplaceholder.typicode.com/users')
   return users
}