import { useUser } from "@clerk/react-router";
import { useEffect,useState } from "react";
import axios from "axios";

export interface Profile {
   id:string 
   userId:string,
   name:string,
   imageUrl:string,
   email:string
}
interface profileResponse {
  user:Profile
}

export const useCurrentProfile =()=>{
  const{user,isLoaded}=useUser()
  const [profileData,setProfileData]=useState<Profile | null>(null)
  const [profileLoader,setProfileLoader]=useState(true)

  useEffect(()=>{  
    const getCurrentProfile=async()=>{  
    if(isLoaded && !user){
      setProfileLoader(false)
      return
    }  
    if(!user || !isLoaded) return 
          
    setProfileLoader(true)
    try{
      const profile=await axios.get<profileResponse>(`http://localhost:3000/api/v1/profile/data?userId=${user.id}`) 
      setProfileData(profile.data.user)     
    }catch(err){
     console.error(err);
    }finally{
      setProfileLoader(false)
    }
   }
   getCurrentProfile()
  },[user,isLoaded])
  return {profileData,profileLoader} 
}