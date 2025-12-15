import { useState,useEffect } from "react"
import { UserButton,SignedIn } from "@clerk/react-router"
import { useInitiateProfile } from "../lib/initiateProfile"

interface Profile {
   userId:string
   name:string,
   imageUrl:string,
   email:String
  }
export default function Channels(){
  const [profileData,setProfileData]=useState<Profile | null>(null)
  const profile=useInitiateProfile() as Profile | null
  useEffect(()=>{
    setProfileData(profile) 
  },[profile])
  return (
    <div>
     <SignedIn>
       <UserButton></UserButton>
     </SignedIn> 
    </div>
  )
}