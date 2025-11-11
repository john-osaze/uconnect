import { UserNav } from "./components/user-nav"
import { FriendsList } from "./components/friend-list"
import { ChatArea } from "./components/chat-area"
import { Sidebar } from "./components/sidebar"
import { Activity } from "./components/activity"

export default function Chat() {
    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <header className="border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-900/50 backdrop-blur-sm">
                    <img src="images/logo-white.png" alt="Logo" width={125} height={50} />
                    <UserNav />
                </header>
                <div className="flex flex-1 overflow-hidden">
                    <FriendsList />
                    <ChatArea />
                    <Activity />
                </div>
            </div>
        </div>
    )
}
