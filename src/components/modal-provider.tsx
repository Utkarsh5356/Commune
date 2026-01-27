import { ServerCreate } from "./server-create";
import { useCurrentProfile } from "@/hooks/use-currentProfile";
import { InviteModal } from "./invite-modal";
import { EditServer } from "./edit-server";
import { MembersModal } from "./members-modal";

export const ModalProvider=()=>{
  const {profileData}=useCurrentProfile()

  return (
    <>
     <ServerCreate profileId={profileData?.id}/>
     <InviteModal/> 
     <EditServer profileId={profileData?.id} />
     <MembersModal/>  
    </>
  )
}