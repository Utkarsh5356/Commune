import { UserButton,SignedIn } from "@clerk/react-router"

export default function Channels(){
  return (
    <div>
     <SignedIn>
       <UserButton></UserButton>
     </SignedIn> 
    </div>
  )
}