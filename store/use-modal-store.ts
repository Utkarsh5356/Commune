import {create} from "zustand"

export type ModalType= "createServer" | "invite" | "editServer" | "members";

interface ServerProps {
  id:string;
  name:string;
  imageUrl:string;
  inviteCode:string;
  profileId:string;
}

interface ModalData {
  server?:ServerProps
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: ()=>void;
}

export const useModal = create<ModalStore>((set)=>({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type,data = {}) => set({isOpen: true, type, data}),
    onClose: () => set({type: null , isOpen:false})
}))