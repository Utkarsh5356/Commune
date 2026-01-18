import { useEffect,useState } from "react"
import axios from "axios"

export const useUserServers=(userId:string | undefined)=>{
  const [serverData,setServerData]=useState<any[]>([])
  const [serverLoader,setServerLoader]=useState(true)

  useEffect(()=>{
    const getservers=async()=>{
      if(!userId){
        return 
      }        
      
      setServerLoader(true)
      try{
        const servers=await axios.get(`http://localhost:3000/api/v1/server/all?userId=${userId}`)
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