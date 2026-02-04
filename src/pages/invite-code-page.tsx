import { useParams,useNavigate } from "react-router"
import { useCurrentProfile } from "@/hooks/use-currentProfile"
import { useInviteCodeUser } from "@/hooks/use-invitecode-add-user"
import Loader from "@/components/ui/loader"

export const InviteCodePage=()=>{
 const {inviteCode}=useParams()
 const navigate=useNavigate()

 const {profileData,profileLoader}=useCurrentProfile() 
 const profileId=profileData?.id
 const {inviteCodeUserData,loading}=useInviteCodeUser({inviteCode,profileId})
 
 if(profileLoader) return <div className="bg-[#343639] h-screen w-screen flex justify-center items-center"><Loader/></div> 
 if(loading) return <div className="bg-[#343639] h-screen w-screen flex justify-center items-center"><Loader/></div> 
 
 if(!profileData){
  navigate("/")
  return 
 }

 if(inviteCodeUserData){
  navigate(`/channels/${inviteCodeUserData.id}`)
  return
 }
 
 return null
}  
