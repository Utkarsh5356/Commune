import { ServerCreate } from "./server-create";
import { useCurrentProfile } from "@/hooks/use-currentProfile";

export const ModalProvider=()=>{
  const {profileData}=useCurrentProfile()

  return (
    <>
     <ServerCreate profileId={profileData?.id}/>   
    </>
  )
}