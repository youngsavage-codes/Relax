'use client'
import {
    Bell,
    Mail,
    Inbox,
    Settings,
    Smile,
    User,
    Github,
    FolderKanban,
    LogOut,
  } from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "./Avarter"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { logout } from "@/services/authService";
  
  export function CommandDemo() {
    const [user, setUser] = useState({ userName: '', email: '', fullName: '' });

    // Use useEffect to handle fetching data from localStorage
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Parse the string into an object
      }
    }, []);
    
    return (
      <div className="rounded-lg border shadow-md w-[200px] h-screen relative">
        <div className="border-b p-3 font-[family-name:var(--font-geist-mono)] text-lg font-semibold text-gray-400">
          <span className="text-blue-500 text-2xl">RE</span>LAX
        </div>
        <div className="border-b space-y-1 p-5">
        <h2 className="text-xs text-gray-400 font-light">Menu</h2>
          <Link href={'/chat'} className="flex items-center gap-3 text-xs hover:bg-gray-900 p-3 rounded-lg">
            <Inbox className="w-4 h-4"/>
            Chats
          </Link>
          <Link href={'/chat'} className="flex items-center gap-3 text-xs hover:bg-gray-900 p-3 rounded-lg">
            <Mail className="w-4 h-4"/>
            Mails
          </Link>
          <Link href={'/notification'} className="flex items-center gap-3 text-xs hover:bg-gray-900 p-3 rounded-lg">
            <Bell className="w-4 h-4"/>
            Notification
          </Link>
          <Link href={'/reels'} className="flex items-center gap-3 text-xs hover:bg-gray-900 p-3 rounded-lg">
            <Smile className="w-4 h-4"/>
            Reels
          </Link>
        </div>
        <div className="space-y-1 p-5 border-b">
          <h2 className="text-xs text-gray-400 font-light">Tech Tools</h2>
          <Link href={'/github'} className="flex items-center gap-3 text-xs hover:bg-gray-900 p-3 rounded-lg">
            <Github className="w-4 h-4"/>
            Github
          </Link>
          <Link href={'/manager'} className="flex items-center gap-3 text-xs hover:bg-gray-900 p-3 rounded-lg">
            <FolderKanban className="w-4 h-4"/>
            Manager
          </Link>
        </div>
        <div className="space-y-1 p-5">
          <h2 className="text-xs text-gray-400 font-light">Sub-Menu</h2>
          <Link href={'/profile'} className="flex items-center gap-3 text-xs hover:bg-gray-900 p-3 rounded-lg">
            <User className="w-4 h-4"/>
            Profile
          </Link>
          <Link href={'/settings'} className="flex items-center gap-3 text-xs hover:bg-gray-900 p-3 rounded-lg">
            <Settings className="w-4 h-4"/>
            Settings
          </Link>
          <button  onClick={logout} className="flex items-center gap-3 text-xs p-3 rounded-lg">
            <LogOut className="w-4 h-4"/>
            Log out
          </button>
        </div>  
        <div className="border-t absolute bottom-0 left-0 w-full p-5">
          <h2 className="text-xs text-gray-400 font-light mb-5">User Details</h2>
          <div className="flex gap-3">            
            <UserAvatar user={user}/>
            <div className="w-full overflow-hidden">  
              <h2 className="text-sm font-semibold">{user?.fullName}</h2>
              <p className="text-xs font-light">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  