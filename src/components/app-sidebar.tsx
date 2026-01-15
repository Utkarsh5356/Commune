import { useInitiateProfile } from "@/hooks/initiateProfile"
import { useCurrentProfile } from "@/hooks/currentProfile"
import { ArchiveX, File, Inbox, Send, Trash2, CirclePlus } from "lucide-react"
import { NavUser } from '@/components/nav-user'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Avatar,AvatarImage } from "./ui/avatar"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { ImageUpload } from "./imageUpload"
import { useNavigate } from "react-router"
import axios from "axios"
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
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage
} from "./ui/form"
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

const formSchema=z.object({
  name:z.string().min(1,{message:"Server name is required"}),
  imageUrl:z.string().min(1,{message:"Server image is required"})
})

interface Profile {
  userId:string,
  name:string,
  imageUrl:string,
  email:String
}

export const AppSidebar=()=>{
const profile=useInitiateProfile() as Profile | null
const currentProfile=useCurrentProfile()
console.log(currentProfile);
const navigate=useNavigate()
const form=useForm({
  resolver:zodResolver(formSchema),
  defaultValues:{
    name:"",
    imageUrl:""
  }
})
const isLoading = form.formState.isSubmitting
const onSubmit = async(values:z.infer<typeof formSchema>)=>{
  try{
    axios.post("",values)
    form.reset()
    window.location.reload()
  }catch(err){
   console.log(err);
  }
}
return (
 <div className="flex h-screen">
    <Sidebar collapsible="none" className="rounded-2xl">
        {/* LEFT: icon rail + second sidebar as flex children */}
        <div className="flex h-full">
          {/* Icon rail */}
         <div className="w-[calc(var(--sidebar-width-icon)+10px)] items-center border-r flex flex-col rounded-2xl">
           <SidebarHeader>
             <SidebarMenu>
               <SidebarMenuItem>
                 <SidebarMenuButton 
                  size="lg" asChild 
                  tooltip={{
                   children:"Home",
                   hidden: false,
                  }}
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0 transform active:scale-110 transition-transform duration-100"
                  >
                   <a href="http://localhost:5173/channels">
                      <Avatar className="rounded-lg">
                        <AvatarImage src={profile?.imageUrl}/>
                      </Avatar>
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
                        className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg cursor-pointer transform active:scale-110 transition-transform duration-100"
                      >
                      {/* Icon image */}
                       <Avatar className="rounded-lg">
                         <AvatarImage src={profile?.imageUrl}/>
                       </Avatar>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <Dialog>
              <DialogTrigger asChild>
               <SidebarMenuButton 
                tooltip={{
                 children: "Add a Server",
                 hidden: false,
                }}
                className="bg-sidebar-foreground text-sidebar-primary-foreground flex aspect-square size-8 items-center mt-1 ml-2 mr-2 justify-center rounded-lg cursor-pointer transform active:scale-110 transition-transform duration-100"
                >
               <CirclePlus/>
               </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold">Create Your Server</DialogTitle>
                  <DialogDescription className="text-center">
                    Your server is where your friends hang out. Make yours and start talking.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} 
                  className="space-y-8"
                  >
                    <div className="space-y-8 px-6">
                      <div className="flex items-center justify-center text-center">
                        <FormField
                          control={form.control}
                          name="imageUrl"
                          render={({field})=>(
                            <FormItem>
                               <FormControl>
                                 <ImageUpload
                                  value={field.value}
                                  onChange={field.onChange}
                                  disabled={isLoading}
                                 />
                               </FormControl>
                               <FormMessage className="w-24"/>
                             </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                          <FormItem>
                            <FormLabel 
                              className="uppercase text-xs font-bold text-zinc-500">
                              Server Name
                            </FormLabel>
                            <FormControl>
                              <Input 
                               disabled={isLoading}
                               className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black
                               focus-visible:ring-offset-0"
                               placeholder="Enter server name"
                               {...field}
                              />
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter className="px-6">
                     {/* <DialogClose asChild>                 */}
                       <Button variant="primary" type="submit" disabled={isLoading}>Create</Button>
                     {/* </DialogClose> */}
                   </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
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