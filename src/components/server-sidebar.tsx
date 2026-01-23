import { type Profile } from "@/hooks/use-currentProfile";
import { useServerData } from "@/hooks/use-server-data";
import { useNavigate } from "react-router";
import { ServerHeader } from "./server-header";
import Loader from "./ui/loader";

interface ServerSidebarProps {
  serverId:string | undefined; 
  profileData:Profile | null
}

export const ServerSidebar=({serverId,profileData}:ServerSidebarProps)=>{
  const navigate=useNavigate()
  const {userServerData,userServerLoader}=useServerData({serverId})
  if(userServerLoader) return <Loader/>
  if(!userServerData) navigate("/")
   
  const textChannels=userServerData?.serverData.channels.filter((channel)=>channel.type === userServerData.ChannelType.TEXT)
  const audioChannels=userServerData?.serverData.channels.filter((channel)=>channel.type === userServerData.ChannelType.AUDIO)
  const videoChannels=userServerData?.serverData.channels.filter((channel)=>channel.type === userServerData.ChannelType.VIDEO)
  const members=userServerData?.serverData.members.filter((member)=>member.profileId !== profileData?.id) 
  
  const role=userServerData?.serverData.members.find((member)=>member.profileId === profileData?.id)?.role
  return (
    <div className="flex flex-col h-screen text-white w-60 bg-[#2B2D31]">
      <ServerHeader server={userServerData?.serverData} role={role}/> 
    </div>
  )
}