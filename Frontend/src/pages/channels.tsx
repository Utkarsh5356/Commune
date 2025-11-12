import { UserButton,SignedIn } from "@clerk/clerk-react"

export default function Channels(){
    return (
      <div>
       <SignedIn>
         <UserButton></UserButton>
       </SignedIn> 
      </div>
    )
}