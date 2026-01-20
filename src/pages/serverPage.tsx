import { ServerSidebar } from "@/components/server-sidebar"

export const ServerPage=()=>{
    return (
     <div>
       <div className="bg-[#2b2c2e] flex min-h-screen text-white h-full">
           <div className=" h-full w-18 z-30
           flex-col fixed inset-y-0">
          <ServerSidebar/>
       </div>
        <div className="pl-18 h-full">
          serverContent
        </div>
      </div>
     </div>    
    )
}