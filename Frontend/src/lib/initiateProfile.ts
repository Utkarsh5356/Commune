import { useEffect,useState } from "react";
import { useUser } from "@clerk/react-router";
import { useNavigate } from "react-router";
import axios, { type AxiosResponse } from "axios"

interface Profile {
   userId:string,
   name:string,
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
    const getUserData=async ()=>{
    if(!user || !isLoaded) return 
    try{
      const profile:AxiosResponse<profileResponse>=await axios.get(`http://localhost:3000/api/v1/profile/data?userId=${user.id}`)
      setUserData(profile.data.user)
    } catch (err){
      try{
       const newProfile:AxiosResponse<profileResponse>=await axios.post("http://localhost:3000/api/v1/profile/create",{
        id:user.id,
        name:user.username === null ? user.fullName : user.username,
        imageUrl:user.imageUrl,
        email:user.emailAddresses[0].emailAddress
       })
       setUserData(newProfile.data.user)
      }catch(createError){
        console.error("Profile creation failed",createError)
      }
    } 
    }
    getUserData()
  },[user,isLoaded])
  
  return userData
}