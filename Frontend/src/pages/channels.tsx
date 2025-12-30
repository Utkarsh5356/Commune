import { useState,useEffect } from "react"
import { useInitiateProfile } from "../../hooks/initiateProfile"
import { SidebarProvider,SidebarInset,SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"

interface Profile {
   userId:string
   name:string,
   imageUrl:string,
   email:String
  }
export default function Channels(){
  const [profileData,setProfileData]=useState<Profile | null>(null)
  const profile=useInitiateProfile() as Profile | null
  useEffect(()=>{
    setProfileData(profile)
  },[profile])
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>  
      </SidebarInset>
    </SidebarProvider>
  )
}