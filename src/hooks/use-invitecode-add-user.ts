import { useEffect,useState } from "react"
import axios from "axios"

export const useInviteCodeUser=({inviteCode,profileId}:{inviteCode:string | undefined,profileId:string | undefined})=>{
  const [inviteCodeUserData,setInviteCodeUserData]=useState<any>()  
  const [loading,isLoading]=useState(true)

  useEffect(()=>{
   if(!inviteCode || !profileId){
    isLoading(false)
    return 
   } 

   const addUserInServer=async()=>{
     isLoading(true)
     try{    
      const response=await axios.put("http://localhost:3000/api/v1/server/invitecode-add-user",{
       inviteCode,
       profileId
     })
      setInviteCodeUserData(response.data)
     }catch(err){
      console.error(err)
     }finally{
      isLoading(false)
     }
   }
    addUserInServer()
  ,[inviteCode,profileId]})
  return {inviteCodeUserData,loading}
}