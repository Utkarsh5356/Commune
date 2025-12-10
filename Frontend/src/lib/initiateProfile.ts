import { useEffect,useState } from "react";
import { useUser } from "@clerk/react-router";
import { useNavigate } from "react-router";
import axios from "axios"

export const initiateProfile=()=>{
  const{user,isLoaded}=useUser()
  const[userData,setUserData]=useState({})
  const navigate=useNavigate() 
  useEffect(()=>{
    if(!user && isLoaded) navigate("/signin")
  },[user,isLoaded,navigate])
  useEffect(()=>{
    const getUserData=async ()=>{
    if(!user || !isLoaded) return 
    try{
      const profile=await axios.get(`http://localhost:3000/api/v1/profile/data?userId=${user.id}`)
      setUserData(profile.data)
    } catch (err){
      try{
       const newProfile=await axios.post("http://localhost:3000/api/v1/profile/create",{
        id:user.id,
        name:user.username === null ? user.fullName : user.username,
        imageUrl:user.imageUrl,
        email:user.emailAddresses[0].emailAddress
       })
       setUserData(newProfile.data)
      }catch(createError){
        console.error("Profile creation failed",createError)
      }
    } 
    }
    getUserData()
  },[user,isLoaded])
  
  return userData
}