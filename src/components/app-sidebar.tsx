import {useState} from "react"
import { useInitiateProfile } from "@/hooks/initiateProfile"
import { ArchiveX, Command, File, Inbox, Send, Trash2, CirclePlus } from "lucide-react"
import { NavUser } from '@/components/nav-user'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
 } from "./ui/sidebar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Separator } from "./ui/separator"
// This is sample data
const data = {
  navMain: [
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Drafts",
      url: "#",
      icon: File,
      isActive: false,
    },
    {
      title: "Sent",
      url: "#",
      icon: Send,
      isActive: false,
    },
    {
      title: "Junk",
      url: "#",
      icon: ArchiveX,
      isActive: false,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
      isActive: false,
    },
  ],
  
}

interface Profile {
   userId:string
   name:string,
   imageUrl:string,
   email:String
}

export const AppSidebar=()=>{
const [activeItem, setActiveItem] = useState(data.navMain[0])
const profile=useInitiateProfile() as Profile | null
return (
 <div className="flex h-screen">
    <Sidebar collapsible="none">
        {/* LEFT: icon rail + second sidebar as flex children */}
        <div className="flex h-full">
          {/* Icon rail */}
         <div className="w-[calc(var(--sidebar-width-icon)+1px)] border-r flex flex-col">
           <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                  <a href="http://localhost:5173/channels">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <Command className="size-4" />
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <Separator/>
          <SidebarContent className="no-scrollbar overflow-y-auto ">
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                  {data.navMain.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg cursor-pointer"
                      >
                      {/* Icon image */}
                        <item.icon />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <Dialog >
            <form>
            <DialogTrigger asChild>
             <SidebarMenuButton 
              tooltip={{
               children: "Add a Server",
               hidden: false,
              }}
              className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center mt-1 ml-2 justify-center rounded-lg cursor-pointer"
              >
             <CirclePlus/>
             </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">Create Your Server</DialogTitle>
                <DialogDescription className="text-center">
                  Your server is where your friends hang out. Make yours and start talking.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  {/* <div className="mt-2">
                    <div className="text-sm text-gray-700 font-semibold">Hello</div>
                  </div> */}
                  <Input  name="name" defaultValue={`${profile?.name} Server`} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>                
                  <Button type="submit">Create</Button>
               </DialogClose>
              </DialogFooter>
            </DialogContent>
           </form>
          </Dialog>
          <SidebarFooter>
            <NavUser/>
          </SidebarFooter>
         </div>
         {/* Second sidebar (text/details) */}
         <div className="flex w-[--sidebar-width] flex-col">
           <SidebarHeader className="gap-3.5 border-b p-4">
             <div className="flex w-full items-center justify-between">
              <div className="text-foreground text-base font-medium">
                {activeItem?.title}
              </div>
            </div>
            <SidebarInput className="w-65" placeholder="Type to search..." />
           </SidebarHeader>
           <SidebarContent className="no-scrollbar overflow-y-auto">
             {/* second sidebar content */}
           </SidebarContent>
         </div>
       </div>
     </Sidebar>
  </div>
)    
}