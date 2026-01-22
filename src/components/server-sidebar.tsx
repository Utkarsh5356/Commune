import { type Profile } from "@/hooks/use-currentProfile";
import { useServerData } from "@/hooks/use-server-data";
import { useNavigate } from "react-router";
import Loader from "./ui/loader";

interface ServerSidebarProps {
  serverId:string | undefined; 
  profileData:Profile | null
}

export const ServerSidebar=({serverId,profileData}:ServerSidebarProps)=>{
  const navigate=useNavigate()
  const {userServerData,userServerLoader}=useServerData({serverId})
  console.log(userServerData)
  if(userServerLoader) return <Loader/>
  if(!userServerData) navigate("/")
   
  const textChannels=userServerData?.serverData.channels.filter((channel)=>channel.type === userServerData.ChannelType.TEXT)
  const audioChannels=userServerData?.serverData.channels.filter((channel)=>channel.type === userServerData.ChannelType.AUDIO)
  const videoChannels=userServerData?.serverData.channels.filter((channel)=>channel.type === userServerData.ChannelType.VIDEO)
  const members=userServerData?.serverData.members.filter((member)=>member.profileId !== profileData?.id) 
  
  const role=userServerData?.serverData.members.find((member)=>member.profileId === profileData?.id)?.role

  return (
    <div>
      ServerSidebar
    </div>
  )
}