import { useEffect,useState } from "react";
import { useUser } from "@clerk/react-router";
import { useNavigate } from "react-router";
import axios from "axios"

interface Profile {
   userId:string,
   name:string | null,
   imageUrl:string,
   email:string
}
interface profileResponse {
  user:Profile
}

export const useInitiateProfile=()=>{
  const{user,isLoaded}=useUser()
  const[userData,setUserData]=useState<Profile | null>(null)
  const navigate=useNavigate() 
  useEffect(()=>{
   if(!user && isLoaded) navigate("/signin")
  },[user,isLoaded,navigate])
  
  useEffect(()=>{
    if(!user || !isLoaded) return 
    setUserData({
      userId:user.id,
      name:user.username === null ? user.fullName : user.username,
      imageUrl:user.imageUrl,
      email:user.emailAddresses[0].emailAddress   
    })
  },[user,isLoaded])

  useEffect(()=>{
    const getUserData=async ()=>{
    if(!user || !isLoaded) return 
      try{
      await axios.post<profileResponse>("http://localhost:3000/api/v1/profile/upsert",{
        id:user.id,
        name:user.username === null ? user.fullName : user.username,
        imageUrl:user.imageUrl,
        email:user.emailAddresses[0].emailAddress
       })
      }catch(createError){
        console.error("Profile creation failed",createError)
      }
    }
    getUserData()
  },[user,isLoaded])

  return userData
}