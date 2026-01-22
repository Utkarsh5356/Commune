import { useInitiateProfile } from "@/hooks/use-initiateProfile"
import { useCurrentProfile } from "@/hooks/use-currentProfile"
import { useAllServers } from "@/hooks/use-all-servers"
import { ScrollArea } from "./ui/scroll-area"
import { NavigationItem } from "./navigation-item"
import { HomeCreateServer } from "./home-create-server"
import { HeaderIcon } from "./header-icon"
import { UserButton } from "@clerk/clerk-react"
import { Separator } from "./ui/separator"
import Loader from "./ui/loader"

export const HomeNavigation=()=>{
  useInitiateProfile() 
  const {profileData,profileLoader}=useCurrentProfile()
  const {serverData,serverLoader}=useAllServers(profileData?.id)
  
  if(profileLoader || serverLoader){
    return <div className="min-h-screen min-w-screen flex items-center justify-center">
      <Loader/>
    </div>
  }

  return (
    <div
     className="space-y-4 flex flex-col items-center h-full 
     text-white w-full bg-[#1E1F22] py-3" 
    >
      <HeaderIcon headerImage={"https://images.scalebranding.com/da4e9838-f6d6-46c6-8515-b43166f64c98.png"} 
        id={"@me"}/>
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
      <HomeCreateServer profileId={profileData?.id}/>
      <div className="relative group flex mx-3 h-12 w-12 rounded-3xl 
       group-hover:rounded-2xl transition-all overflow-hidden"
      >
        <UserButton
         appearance={{
          elements:{
            avatarBox:{
              width: "46px",
              height: "46px",
            }
          }
         }}
        />
     </div>
    </div>    
  )    
}