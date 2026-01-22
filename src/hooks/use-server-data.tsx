import { useEffect,useState } from "react"
import axios from "axios"

interface Channels{
  id:string;
  name:string;
  type:string;
}
interface Members{
  id:string;
  role:string;
  profileId:string;
  profile:{
    id:string;
    userId:string;
    name:string;
    imageUrl:string;
    email:string
  }
}
interface ChannelType{
    TEXT:string;
    AUDIO:string;
    VIDEO:string
}
interface ServerDataTypes{
  id:string;
  name:string;
  imageUrl:string;
  inviteCode:string;
  profileId:string;
  channels:Channels[];
  members:Members[]
}
interface ServerData{
  serverData:ServerDataTypes 
  ChannelType:ChannelType  
}

export const useServerData=({serverId}:{serverId:string | undefined})=>{
  const [userServerData,setUserServerData]=useState<ServerData | null>(null)
  const [userServerLoader,setUserServerLoader]=useState(true)
  
  useEffect(()=>{
   if(!serverId) return 
   
   const getServerData=async()=>{
    try{
      setUserServerLoader(true)
      const serverData=await axios.get<ServerData>(`http://localhost:3000/api/v1/server/data?serverId=${serverId}`)
      setUserServerData(serverData.data)
    }catch(err){
      console.error(err)
    }finally{
      setUserServerLoader(false)
    }
   }
   getServerData()
  },[serverId])
  return {userServerData,userServerLoader}
}