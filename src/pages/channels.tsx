import { type CSSProperties } from "react"
import { SidebarProvider,SidebarInset} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function Channels(){
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
        <header className="bg-background sticky top-0 flex justify-center shrink-0 gap-2 border-b p-1 rounded-b-2xl">
          <div className="text-sm font-semibold">Commune</div>
        </header>  
      </SidebarInset>
    </SidebarProvider>
  )
}