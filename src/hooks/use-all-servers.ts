import { useEffect,useState } from "react"
import axios from "axios"

interface Servers {
  id: string;
  profileId: string;
  name: string;
  imageUrl: string;
  inviteCode:string  
}

export const useAllServers=(userId:string | undefined)=>{
  const [serverData,setServerData]=useState<Servers[]>([])
  const [serverLoader,setServerLoader]=useState(true)

  useEffect(()=>{
    const getservers=async()=>{
      if(!userId){
        return 
      }        
      
      setServerLoader(true)
      try{
        const servers=await axios.get<Servers[]>(`http://localhost:3000/api/v1/server/all?userId=${userId}`)
        setServerData(servers.data)
      }catch(err){
       console.error(err)
      }finally{
        setServerLoader(false)
      }
    }
    getservers()
  },[userId])
  return {serverData,serverLoader}
}