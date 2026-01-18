import { useCurrentProfile } from "@/hooks/currentProfile"

export const NavigationSidebar=()=>{
  const profile=useCurrentProfile()

  return(
    <div>
        Sidebar
    </div>    
  )
}