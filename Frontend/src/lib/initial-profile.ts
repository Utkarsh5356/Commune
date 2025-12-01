import { useUser } from "@clerk/react-router";
import { useNavigate } from "react-router";
import axios from "axios"

export const initiateProfile=async ()=>{
  const{user}=useUser()
  const navigate=useNavigate()
  if(!user) return navigate("/signin")
  const profile=await axios.get(`http://localhost:5173/api/v1/profile/data?userId=${user.id}`)
  if(profile) return profile
}