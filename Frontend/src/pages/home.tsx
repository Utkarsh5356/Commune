import { ModeToggle } from "@/components/modeToggle"

export default function Home(){
    return (
        <div className="">
         <div className="flex justify-between">
          <div>
           Welcone to Landing Page
          </div>
          <div>
            <ModeToggle></ModeToggle>
          </div>
         </div>
            
        </div>
    )
}