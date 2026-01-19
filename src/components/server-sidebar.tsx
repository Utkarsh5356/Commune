import { useCurrentProfile } from "@/hooks/currentProfile"
import { useUserServers } from "@/hooks/userServers"
import { NavigationAction } from "./navigation-action"
import { Separator } from "./ui/separator"
import { ScrollArea } from "./ui/scroll-area"
import { NavigationItem } from "./navigation-item"
import Loader from "./ui/loader"

export const ServerSidebar=()=>{
  const {profileData,profileLoader}=useCurrentProfile()
  const {serverData,serverLoader}=useUserServers(profileData?.id)
  if(profileLoader || serverLoader){
    return <div className="min-h-screen min-w-screen flex items-center justify-center">
      <Loader/>
    </div>
  }

  return(
    <div
     className="space-y-4 flex flex-col items-center h-full 
     text-white w-full bg-[#1E1F22] py-3" 
    >
      
      <Separator
       className="h-0.5 bg-zinc-700  
       rounded-md w-10 mx-auto"
      />  
      <ScrollArea className="flex-1 w-full">
       {serverData.map((server)=>(
        <div key={server.id} className="mb-5">
          <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl}/>
        </div>
       ))}
      </ScrollArea>
      <NavigationAction/>
      <div>Hello</div>
    </div>    
  )
}