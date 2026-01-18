import { useInitiateProfile } from "@/hooks/initiateProfile"
import { useCurrentProfile } from "@/hooks/currentProfile"
import { useUserServers } from "@/hooks/userServers"
import { CirclePlus } from "lucide-react"
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
import Loader from "./ui/loader"
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
  SidebarInset
 } from "./ui/sidebar"
import {
  Dialog,
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

const formSchema=z.object({
  name:z.string().min(1,{message:"Server name is required"}),
  imageUrl:z.string().min(1,{message:"Server image is required"})
})

interface Profile {
  id:string 
  userId:string,
  name:string,
  imageUrl:string,
  email:string
}


export const HomeSidebar=()=>{
const navigate=useNavigate()
useInitiateProfile() 
const {profileData,profileLoader}=useCurrentProfile()
const {serverData,serverLoader}=useUserServers(profileData?.id)

const form=useForm({
  resolver:zodResolver(formSchema),
  defaultValues:{
    name:"",
    imageUrl:""
  }
})
const isLoading = form.formState.isSubmitting

if(profileLoader || serverLoader){
  return <div className="min-h-screen min-w-screen flex items-center justify-center">
    <Loader/>
  </div>
}

const onSubmit = async(values:z.infer<typeof formSchema>)=>{
  try{
    await axios.post("http://localhost:3000/api/v1/server/create",{
      values,
      profileData
    })
    form.reset()
    window.location.reload()
  }catch(err){
   console.error(err);
  }
}
return (
 <div className="flex min-h-screen">
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
                  className="size-10 p-0 rounded-lg
                  bg-sidebar-primary text-sidebar-primary-foreground
                  focus-visible:ring-0 focus-visible:outline-none"              
                >
                  <div onClick={()=>navigate("/channels")}
                   className="flex items-center justify-center
                   size-10 rounded-lg cursor-pointer
                   transition-transform duration-150
                   hover:scale-110 active:scale-105
                   "
                  >
                    <Avatar className="rounded-md size-10 ring-0 ring-offset-0 border-0 shadow-none">
                        <AvatarImage src={"https://cdn.dribbble.com/userupload/43049375/file/original-d6af1860c771054c2cd6690a4dbaba95.png?format=webp&resize=400x300&vertical=center"}/>
                    </Avatar>
                  </div>  
                 </SidebarMenuButton>
               </SidebarMenuItem>
             </SidebarMenu>
           </SidebarHeader>
           <Separator/>
           <SidebarContent className="no-scrollbar overflow-y-auto ">
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                   {serverData.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.name,
                          hidden: false,
                        }}
                        className="p-0 bg-sidebar-primary text-sidebar-primary-foreground
                        focus-visible:ring-0 focus-visible:outline-none
                        flex items-center justify-center
                        size-10 rounded-lg cursor-pointer
                        transition-transform duration-150
                        hover:scale-110 active:scale-105"     
                      >
                      {/* Icon image */}
                      <div onClick={()=>navigate("/channels")}>
                       <Avatar className="rounded-lg size-10 ring-0 ring-offset-0 border-0 shadow-none">
                         <AvatarImage src={item.imageUrl}/>
                       </Avatar>
                      </div>
                       
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
                      <Button variant="primary" type="submit" disabled={isLoading}>Create</Button>
                   </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
          </Dialog>
          <SidebarFooter>
            <NavUser name={profileData?.name} image={profileData?.imageUrl} email={profileData?.email}/>
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
     {/* <SidebarInset className="w-full">
        <header className="bg-background sticky top-0 flex justify-center shrink-0 gap-2 border-b p-1 rounded-b-2xl">
          <div className="text-sm font-semibold">Commune</div>
        </header>  
      </SidebarInset> */}
  </div>
)    
}