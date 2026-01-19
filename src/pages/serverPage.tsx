import { ServerSidebar } from "@/components/server-sidebar"

export const ServerPage=()=>{
    return (
     <div>
       <div className="bg-[#2b2c2e] flex min-h-screen text-white h-full">
           <div className="hidden md:flex h-full w-18 z-30
           flex-col fixed inset-y-0">
          <ServerSidebar/>
       </div>
        <div className="md:pl-18 h-full">
          serverid
        </div>
      </div>
     </div>    
      
    )
}