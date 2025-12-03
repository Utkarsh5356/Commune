import { UserButton,SignedIn } from "@clerk/react-router"
import { initiateProfile } from "../lib/initiateProfile"

export default function Channels(){
  const profile=  initiateProfile()
  console.log(profile)
  return (
    <div>
     <SignedIn>
       <UserButton></UserButton>
     </SignedIn> 
     <div>{JSON.stringify(profile,null,2)}</div>
    </div>
  )
}