import { type CSSProperties } from "react"
import { SidebarProvider,SidebarInset,SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"

export default function Channels(){
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as CSSProperties
      }
    >
      <AppSidebar/>
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0  gap-2 border-b p-1 rounded-b-2xl">
          {/* <SidebarTrigger className="-ml-1" /> */}
          {/* <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          /> */}
          Commune
        </header>  
      </SidebarInset>
    </SidebarProvider>
  )
}