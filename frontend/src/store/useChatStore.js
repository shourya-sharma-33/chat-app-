import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    messages : [],
    users : [],
    selectedUser: null,
    isUsersLoading : false,
    isMessagesLoading : false,

    getUsers : async () => {
        set({isUsersLoading : true});
        try{
            const res = await axiosInstance.get("/messages/users");
            set({users : res.data});
        }catch(error){
            toast.error(error.response.data.mesage);
        }finally{
            set({isUsersLoading: false})
        }
    },
    getMessage: async(userId) => {
        set({isMessagesLoading: true});
        try{
            const res = await axiosInstance.get(`/message/${userId}`);
            set({message: res.data});
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading: false})
        }
    },
    setSelectedUser : (selectedUser) => set({selectedUser}),
}))


