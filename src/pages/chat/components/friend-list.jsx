"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { FriendRequests } from "./friend-requests"
import { FriendProfile } from "./friend-profile"

export function FriendsList() {
    const [selectedFriend, setSelectedFriend] = useState(null)
    const [profileOpen, setProfileOpen] = useState(false)
    const [viewingFriend, setViewingFriend] = useState(null)

    const friends = [
        {
            id: "1",
            name: "Dr. James Gordon",
            avatar: "/placeholder-user.jpg",
            status: "idle",
            // game: "NAMS Symposium",
            banner: "/placeholder.svg",
            joinDate: "October 15, 2021",
            mutualFriends: 5,
            bio: "Medical professional and oncologist. Passionate about using technology to improve patient care.",
            favoriteGames: ["Awards Gala 2025", "NAMS Symposium", "HealthTech Conference"],
            recentActivities: [
                { type: "achievement", content: "RSVP'd to the fundraiser event", time: "3 hours ago" },
                { type: "game", content: "Started mentoring 2 new students", time: "5 hours ago" },
                { type: "status", content: "Updated their status to 'Making life better'", time: "Yesterday" },
            ],
            customStatus: "Indisposed",
        },
        {
            id: "2",
            name: "Kingsley Smith",
            avatar: "/placeholder-user.jpg",
            status: "online",
            banner: "/placeholder.svg",
            joinDate: "March 22, 2022",
            mutualFriends: 3,
            bio: "Pixel art lover and indie game developer. Working on my own game in my spare time.",
            favoriteGames: ["Stardew Valley", "Terraria", "Hades"],
            recentActivities: [
                { type: "friend", content: "Became friends with QuantumGamer", time: "1 day ago" },
                { type: "game", content: "Played Hades for 3 hours", time: "2 days ago" },
            ],
        },
        {
            id: "3",
            name: "Justin Wayne",
            avatar: "/placeholder-user.jpg",
            status: "online",
            banner: "/placeholder.svg",
            joinDate: "January 5, 2023",
            mutualFriends: 2,
            bio: "Aspiring chef and food blogger. Love experimenting with new recipes and cuisines.",
            favoriteGames: ["Far Cry 3: Blood Dragon", "Ghostrunner", "Cyberpunk 2077"],
            customStatus: "Online",
        },
        {
            id: "4",
            name: "Susanna George",
            avatar: "/placeholder-user.jpg",
            status: "dnd",
            // game: "Elden Ring",
            banner: "/placeholder.svg",
            joinDate: "August 17, 2022",
            mutualFriends: 4,
            bio: "Drama enthusiast and literature lover. Always up for a good story.",
            favoriteGames: ["Dark Souls", "Elden Ring", "Bloodborne", "Sekiro"],
            recentActivities: [
                { type: "achievement", content: "Defeated Malenia in Elden Ring", time: "5 hours ago" },
                { type: "game", content: "Started playing Elden Ring", time: "6 hours ago" },
            ],
            customStatus: "Do not disturb",
        },
        {
            id: "5",
            name: "Patricia Brown",
            avatar: "/placeholder-user.jpg",
            status: "offline",
            banner: "/placeholder.svg",
            joinDate: "May 30, 2021",
            mutualFriends: 7,
            bio: "Environmental activist and nature lover. Advocate for sustainable living.",
            favoriteGames: ["Portal 2", "Quantum Break", "Half-Life: Alyx"],
            recentActivities: [{ type: "status", content: "Updated their profile picture", time: "3 days ago" }],
        },
    ]

    const statusColors = {
        online: "bg-green-500",
        idle: "bg-yellow-500",
        dnd: "bg-red-500",
        offline: "bg-zinc-500",
    }

    const handleViewProfile = (friend) => {
        setViewingFriend(friend)
        setProfileOpen(true)
    }

    return (
        <>
            <div className="w-72 border-r border-zinc-800 bg-zinc-900/50 flex flex-col">
                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                        <Input
                            type="search"
                            placeholder="Search friends..."
                            className="pl-8 bg-zinc-800 border-zinc-700 focus-visible:ring-purple-500 text-sm"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between px-4 py-2">
                    <h2 className="text-sm font-semibold text-zinc-400">
                        FRIENDS - {friends.filter((f) => f.status !== "offline").length} ONLINE
                    </h2>
                    <FriendRequests />
                </div>
                <div className="flex-1 overflow-auto">
                    {friends.map((friend) => (
                        <div
                            key={friend.id}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-2 hover:bg-zinc-800/80 transition-colors duration-200 cursor-pointer",
                                selectedFriend === friend.id && "bg-zinc-800",
                            )}
                            onClick={() => setSelectedFriend(friend.id)}
                        >
                            <div className="relative">
                                <Avatar className="h-9 w-9 border border-zinc-800">
                                    <AvatarImage src={friend.avatar} alt={friend.name} />
                                    <AvatarFallback className="bg-zinc-800 text-purple-400">{friend.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span
                                    className={cn(
                                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900",
                                        statusColors[friend.status],
                                    )}
                                ></span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium">{friend.name}</span>
                                {friend.game && <span className="text-xs text-zinc-400">Playing {friend.game}</span>}
                                {!friend.game && friend.status !== "offline" && friend.customStatus && (
                                    <span className="text-xs text-zinc-400">{friend.customStatus}</span>
                                )}
                                {!friend.game && !friend.customStatus && friend.status !== "offline" && (
                                    <span className="text-xs text-zinc-400 capitalize">{friend.status}</span>
                                )}
                                {friend.status === "offline" && <span className="text-xs text-zinc-500">Offline</span>}
                            </div>
                            <div className="ml-auto flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-700"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleViewProfile(friend)
                                    }}
                                >
                                    <span className="sr-only">View Profile</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 8v8" />
                                        <path d="M8 12h8" />
                                    </svg>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-700"
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    <span className="sr-only">Message</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <FriendProfile friend={viewingFriend} open={profileOpen} onOpenChange={setProfileOpen} />
        </>
    )
}