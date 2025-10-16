import { UserNav } from "./components/user-nav"
import { FriendsList } from "./components/friend-list"
import { ChatArea } from "./components/chat-area"
import { Sidebar } from "./components/sidebar"
import { GameActivity } from "./components/game-activity"

export default function Chat() {
    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <header className="border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-900/50 backdrop-blur-sm">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                        NeonConnect
                    </h1>
                    <UserNav />
                </header>
                <div className="flex flex-1 overflow-hidden">
                    <FriendsList />
                    <ChatArea />
                    <GameActivity />
                </div>
            </div>
        </div>
    )
}
