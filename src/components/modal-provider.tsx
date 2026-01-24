import { ServerCreate } from "./server-create";
import { useCurrentProfile } from "@/hooks/use-currentProfile";
import { InviteModal } from "./invite-modal";

export const ModalProvider=()=>{
  const {profileData}=useCurrentProfile()

  return (
    <>
     <ServerCreate profileId={profileData?.id}/>
     <InviteModal/>   
    </>
  )
}