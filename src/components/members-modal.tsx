import { useModal } from "store/use-modal-store"
import { type ServerProps } from "./server-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

export const MembersModal=()=>{
  const { onOpen,isOpen,onClose,type,data }=useModal() 
  const { server }=data as {server: ServerProps}
 
  const isModalOpen=isOpen && type === "members"

  return (
     <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
       <DialogContent className="sm:max-w-106.25">
         <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Manage Members
            </DialogTitle>
            <DialogDescription
             className="text-center text-zinc-600 font-medium"
            >
             {server?.members?.length} Members
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            Hello
          </div>
        </DialogContent>
      </Dialog>  
     </div>
  )
}