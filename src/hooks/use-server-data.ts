import { useEffect,useState } from "react"
import axios from "axios"

export interface Channels{
  id:string;
  name:string;
  type:string;
}
export interface Members{
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
export interface ChannelType{
  TEXT:string;
  AUDIO:string;
  VIDEO:string
}
export interface ServerDataTypes{
  id:string;
  name:string;
  imageUrl:string;
  inviteCode:string;
  profileId:string;
  channels:Channels[];
  members:Members[]
}
export interface ServerData{
  serverData:ServerDataTypes 
  ChannelType:ChannelType  
}

export const useServerData=({serverId}:{serverId:string | undefined})=>{
  const [userServerData,setUserServerData]=useState<ServerData | null>(null)
  const [userServerDataLoader,setUserServerDataLoader]=useState(true)
  
  useEffect(()=>{
   if(!serverId) return 
   
   const getServerData=async()=>{
    try{
      setUserServerDataLoader(true)
      const serverData=await axios.get<ServerData>(`http://localhost:3000/api/v1/server/data?serverId=${serverId}`)
      setUserServerData(serverData.data)
    }catch(err){
      console.error(err)
    }finally{
      setUserServerDataLoader(false)
    }
   }
   getServerData()
  },[serverId])
  return {userServerData,userServerDataLoader}
}