"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    MessageSquare,
    UserPlus,
    UserMinus,
    Gift,
    Bell,
    BellOff,
    GamepadIcon,
    Clock,
    Star,
    Activity,
} from "lucide-react"

export function FriendProfile({ friend, open, onOpenChange }) {
    const [isFriend, setIsFriend] = useState(true)
    const [isNotified, setIsNotified] = useState(true)

    if (!friend) return null

    const statusColors = {
        online: "bg-green-500",
        idle: "bg-yellow-500",
        dnd: "bg-red-500",
        offline: "bg-zinc-500",
    }

    const statusText = {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline",
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-zinc-900 border border-zinc-800 text-white max-w-2xl p-0 overflow-hidden">
                <div className="relative h-40 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 overflow-hidden">
                    {friend.banner && (
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-40"
                            style={{ backgroundImage: `url(${friend.banner})` }}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <div className="relative">
                            <Avatar className="h-20 w-20 border-4 border-zinc-900">
                                <AvatarImage src={friend.avatar} alt={friend.name} />
                                <AvatarFallback className="bg-zinc-800 text-purple-400 text-xl">
                                    {friend.name.substring(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <span
                                className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-zinc-900 ${statusColors[friend.status]}`}
                            ></span>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold">{friend.name}</h2>
                            <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${statusColors[friend.status]}`}></span>
                                <span className="text-sm">{statusText[friend.status]}</span>
                                {friend.customStatus && <span className="text-sm text-zinc-400">- {friend.customStatus}</span>}
                            </div>
                            {friend.game && (
                                <div className="flex items-center gap-1 mt-1">
                                    <GamepadIcon className="h-3 w-3 text-purple-400" />
                                    <span className="text-xs text-zinc-300">Playing {friend.game}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex gap-2 mb-4">
                        <Button
                            variant="default"
                            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                        >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                        </Button>
                        {isFriend ? (
                            <Button
                                variant="outline"
                                className="border-zinc-700 bg-red-500 hover:bg-zinc-800 hover:text-white"
                                onClick={() => setIsFriend(false)}
                            >
                                <UserMinus className="h-4 w-4 mr-2 text-white" />
                                Remove Friend
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                className="border-zinc-700 hover:bg-zinc-800 hover:text-white"
                                onClick={() => setIsFriend(true)}
                            >
                                <UserPlus className="h-4 w-4 mr-2 text-green-400" />
                                Add Friend
                            </Button>
                        )}
                        <Button variant="outline" className="bg-green-500 border-zinc-700 hover:bg-zinc-800 hover:text-white">
                            <Gift className="h-4 w-4 mr-2 text-white" />
                            Send Gift
                        </Button>
                        <Button
                            variant="outline"
                            className="border-zinc-700 hover:bg-zinc-800 hover:text-white ml-auto"
                            onClick={() => setIsNotified(!isNotified)}
                        >
                            {isNotified ? (
                                <BellOff className="h-4 w-4 text-zinc-400" />
                            ) : (
                                <Bell className="h-4 w-4 text-purple-400" />
                            )}
                        </Button>
                    </div>

                    <Tabs defaultValue="about" className="w-full">
                        <TabsList className="bg-zinc-800 border border-zinc-700 w-full justify-start">
                            <TabsTrigger value="about" className="data-[state=active]:bg-zinc-700">
                                About
                            </TabsTrigger>
                            <TabsTrigger value="gaming" className="data-[state=active]:bg-zinc-700">
                                Events
                            </TabsTrigger>
                            <TabsTrigger value="activity" className="data-[state=active]:bg-zinc-700">
                                Activity
                            </TabsTrigger>
                            <TabsTrigger value="mutual" className="data-[state=active]:bg-zinc-700">
                                Mutual
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="about" className="mt-4">
                            <div className="bg-zinc-800 rounded-lg p-4">
                                <h3 className="text-sm font-semibold uppercase text-zinc-400 mb-2">Bio</h3>
                                <p className="text-sm text-zinc-300">{friend.bio || "No bio set."}</p>

                                <Separator className="my-4 bg-zinc-700" />

                                <h3 className="text-sm font-semibold uppercase text-zinc-400 mb-2">Member Since</h3>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-purple-400" />
                                    <p className="text-sm">{friend.joinDate}</p>
                                </div>

                                <Separator className="my-4 bg-zinc-700" />

                                <h3 className="text-sm font-semibold uppercase text-zinc-400 mb-2">Note</h3>
                                <textarea
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    placeholder="Click to add a note"
                                    rows={2}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="gaming" className="mt-4">
                            <div className="bg-zinc-800 rounded-lg p-4">
                                <h3 className="text-sm font-semibold uppercase text-zinc-400 mb-2">Bookmarked Events</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {friend.favoriteGames?.map((game, index) => (
                                        <Badge
                                            key={index}
                                            className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 border-purple-600/30"
                                        >
                                            {game}
                                        </Badge>
                                    ))}
                                    {!friend.favoriteGames?.length && <p className="text-sm text-zinc-500">No favorite events added.</p>}
                                </div>

                                <Separator className="my-4 bg-zinc-700" />

                                <h3 className="text-sm font-semibold uppercase text-zinc-400 mb-2">Currently Attending</h3>
                                {friend.game ? (
                                    <div className="flex items-center gap-3 bg-zinc-900 p-3 rounded-lg">
                                        <div className="h-12 w-12 bg-zinc-800 rounded-md flex items-center justify-center">
                                            <GamepadIcon className="h-6 w-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{friend.game}</p>
                                            <p className="text-xs text-zinc-400">Started 2 hours ago</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="ml-auto border-zinc-700 hover:bg-zinc-800 text-xs">
                                            Join
                                        </Button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-zinc-500">Not attending any events right now.</p>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="activity" className="mt-4">
                            <div className="bg-zinc-800 rounded-lg p-4">
                                <h3 className="text-sm font-semibold uppercase text-zinc-400 mb-2">Recent Activity</h3>

                                {friend.recentActivities?.length ? (
                                    <div className="space-y-3">
                                        {friend.recentActivities.map((activity, index) => (
                                            <div key={index} className="flex items-start gap-3 bg-zinc-900 p-3 rounded-lg">
                                                <div className="h-8 w-8 bg-zinc-800 rounded-full flex items-center justify-center mt-1">
                                                    {activity.type === "achievement" && <Star className="h-4 w-4 text-yellow-400" />}
                                                    {activity.type === "game" && <GamepadIcon className="h-4 w-4 text-purple-400" />}
                                                    {activity.type === "friend" && <UserPlus className="h-4 w-4 text-green-400" />}
                                                    {activity.type === "status" && <Activity className="h-4 w-4 text-cyan-400" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm">{activity.content}</p>
                                                    <p className="text-xs text-zinc-400">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-zinc-500">No recent activity.</p>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="mutual" className="mt-4">
                            <div className="bg-zinc-800 rounded-lg p-4">
                                <h3 className="text-sm font-semibold uppercase text-zinc-400 mb-2">Mutual Friends</h3>
                                <p className="text-sm mb-4">
                                    You and {friend.name} have {friend.mutualFriends} mutual friends
                                </p>

                                <div className="grid grid-cols-2 gap-2">
                                    {Array.from({ length: Math.min(4, friend.mutualFriends) }).map((_, index) => (
                                        <div key={index} className="flex items-center gap-3 bg-zinc-900 p-2 rounded-lg">
                                            <Avatar className="h-8 w-8 border border-zinc-800">
                                                <AvatarImage src="/placeholder-user.jpg" alt="Mutual Friend" />
                                                <AvatarFallback className="bg-zinc-800 text-purple-400">MF</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">Friend {index + 1}</p>
                                                <div className="flex items-center">
                                                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                                                    <span className="text-xs text-zinc-400">Online</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {friend.mutualFriends > 4 && (
                                    <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto mt-2">
                                        View all {friend.mutualFriends} mutual friends
                                    </Button>
                                )}

                                <Separator className="my-4 bg-zinc-700" />

                                <h3 className="text-sm font-semibold uppercase text-zinc-400 mb-2">Mutual Servers</h3>
                                <p className="text-sm text-zinc-500">No mutual servers yet.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}