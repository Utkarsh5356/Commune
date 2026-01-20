import { HomeSidebar } from "@/components/home-sidebar"

export function Channels(){
  return (
   <div>
     <div className="bg-[#2b2c2e] flex min-h-screen text-white h-full">
         <div className=" h-full w-18 z-30
         flex-col fixed inset-y-0">
          <HomeSidebar/>
       </div>
       <div className="pl-18 h-full">
         homeContent
       </div>
     </div>
    </div>        
  )
}