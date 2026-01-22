import { ServerNavigation } from "@/components/server-navigation"
import { useParams,useNavigate } from "react-router"
import { useCurrentProfile } from "@/hooks/use-currentProfile"
import { useServerInfo } from "@/hooks/use-server-info"
import { ServerSidebar } from "@/components/server-sidebar"
import Loader from "@/components/ui/loader"

export const ServerPage=()=>{
  const {serverId}=useParams()
  const navigate=useNavigate()
  const {profileData,profileLoader}=useCurrentProfile()
  const profileId=profileData?.id
  const {userServerInfo,userServerLoader}=useServerInfo({serverId,profileId})
  
  if(profileLoader || userServerLoader) return <div className="bg-[#2b2c2e] h-screen w-screen flex justify-center items-center"><Loader/></div>
  if(!profileData || !userServerInfo) navigate("/")

  return (
   <div>
     <div className="bg-[#2b2c2e] flex min-h-screen text-white h-full">
       <div className=" h-full w-18 z-30
         flex-col fixed inset-y-0">
         <ServerNavigation profileId={profileData?.id}/>
       </div>
       <div className="h-full">
         <div className="flex h-full pl-18 w-60 z-20
          flex-col inset-y-0">
           <ServerSidebar serverId={serverId} profileData={profileData}/>
         </div>
       </div>
       <div className="pl-18 h-full">
         <div className="h-full">
          serverContent
         </div> 
       </div>
     </div>
   </div>    
  )
}