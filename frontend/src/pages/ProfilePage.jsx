import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {Camera, Mail, User} from "lucide-react";
const ProfilePage = () => {
    const {authUser, isUpdatingProfile, updateProfile} = useAuthStore()
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if(!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(file)
        reader.onload =async() => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({profilePic: base64Image});
        }
    };
    return ( 
        
        <div className="h-screen ">
            <div className="pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8 backdrop-blur-sm shadow-2xl bg-blue-950/70 rounded-xl">
                <div className=" rounded-xl p-6 space-y-8">
                    <h1 className="text-2xl justify-self-center font-semibold text-blue-200">Profile</h1>
                    
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img src={selectedImg || authUser.profilePic || "/src/assets/whale.png"} alt="" 
                                className="size-32 rounded-full object-cover border-4"/>
                            <label htmlFor="avatar-upload" className={`
                                absolute bottom-0 right-0 bg-base-content
                                hover:scale-105 p-2 rounded-full cursor-pointer
                                transition-all duration-200 ${isUpdatingProfile?"animate-pulse pointer-event-none" : ""}
                                `}>
                                    <Camera className="w-5 h-5 text-base-100"/>
                                    <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled= {isUpdatingProfile} />

                                </label>
                        </div>
                        <p className="text-sm text-blue-200">
                            {isUpdatingProfile? "Uploading" : "Click Camera Icon To Update Pfp"}
                        </p>
                     </div>
                     
                     <div className="space-y-6">
                        <div className="space-y-1.5">
                            <div className="text-sm text-blue-200 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Full Name
                            </div>
                            <p className="px-4 py-2.5 rounded-lg border">{authUser?.fullName}</p>
                        </div>
                        <div className="space-y-1.5">
                            <div className="text-sm text-blue-200 flex items-center gap-2">
                                <Mail className="w-4 h-4"/>
                                Email Address
                            </div>
                            <p className="px-4 py-2.5 rounded-lg  border">{authUser?.email}</p>
                        </div>
                     </div>

                     <div className="mt-6 rounded-xl p-6">
                        <h2 className="text-lg text-blue-200 font-medium mb-4">
                            Account Information
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-purple-950">
                                <span className="text-blue-200">In Whale Gang Since</span>
                                <span className="text-blue-200">{authUser.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-blue-200">Account Status</span>
                                <span className="text-green-500">Active :3</span>
                            </div>
                        </div>
                     </div>

                    </div>

                     
                </div>
            </div>
        </div>
    )
};
export default ProfilePage;