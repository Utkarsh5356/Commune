import { useUser } from "@clerk/react-router";
import { useEffect,useState } from "react";
import axios from "axios";

export const useCurrentProfile =()=>{
  const{user,isLoaded}=useUser()
  const [profileData,setProfileData]=useState(null)
  useEffect(()=>{  
    const getCurrentProfile=async()=>{    
    if(!user || !isLoaded) return null
    try{
      const profile=await axios.get(`http://localhost:3000/api/v1/profile/data?userId=${user?.id}`) 
      setProfileData(profile.data.user)     
    }catch(err){
     console.error(err);
    }
   }
   getCurrentProfile()
  },[user,isLoaded])
  return profileData 
}