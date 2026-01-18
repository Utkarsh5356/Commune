import { type CSSProperties } from "react"
import { SidebarProvider} from "@/components/ui/sidebar"
import { HomeSidebar } from "@/components/home-sidebar"

export function Channels(){
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as CSSProperties
      }
    >
      <HomeSidebar/>
    </SidebarProvider>
  )
}