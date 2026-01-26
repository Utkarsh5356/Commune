import { useEffect,useState } from "react"
import axios from "axios"

export interface Server{
  id: string;
  profileId: string;
  name: string;
  imageUrl: string;
  inviteCode:string  
}

export const useServerInfo=({serverId,profileId}:{serverId:string | undefined,profileId:string | undefined})=>{
  const [userServerInfo,setUserServerInfo]=useState<Server | null>(null)
  const [userServerLoader,setUserServerLoader]=useState(true)
  
  useEffect(()=>{
    if(!serverId || !profileId) return 

    const getUserServerData=async()=>{
      try{
       setUserServerLoader(true)
       const server=await axios.get<Server>(`http://localhost:3000/api/v1/server/info?serverId=${serverId}&profileId=${profileId}`)
       setUserServerInfo(server.data)
      }catch(err){
       console.error(err)
      }finally{
       setUserServerLoader(false)
      }   
    }
    getUserServerData()
  },[serverId,profileId])
  return {userServerInfo,userServerLoader}
}