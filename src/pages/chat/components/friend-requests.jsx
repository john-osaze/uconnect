"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, X, UserPlus, Users } from "lucide-react"

export function FriendRequests() {
    const [open, setOpen] = useState(false)
    const [incomingRequests, setIncomingRequests] = useState([
        { id: "1", name: "DigitalDragon", avatar: "/placeholder-user.jpg", mutualFriends: 3 },
        { id: "2", name: "TechTitan", avatar: "/placeholder-user.jpg", mutualFriends: 1 },
        { id: "3", name: "CyberSamurai", avatar: "/placeholder-user.jpg", mutualFriends: 0 },
    ])

    const [outgoingRequests, setOutgoingRequests] = useState([
        { id: "4", name: "NeonNinja", avatar: "/placeholder-user.jpg", mutualFriends: 2 },
        { id: "5", name: "PixelPirate", avatar: "/placeholder-user.jpg", mutualFriends: 5 },
    ])

    const [searchInput, setSearchInput] = useState("")

    const acceptRequest = (id) => {
        setIncomingRequests(incomingRequests.filter((req) => req.id !== id))
    }

    const rejectRequest = (id) => {
        setIncomingRequests(incomingRequests.filter((req) => req.id !== id))
    }

    const cancelRequest = (id) => {
        setOutgoingRequests(outgoingRequests.filter((req) => req.id !== id))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                    <UserPlus className="h-4 w-4" />
                    {incomingRequests.length > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-[10px]">
                            {incomingRequests.length}
                        </Badge>
                    )}
                    <span className="sr-only">Friend Requests</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border border-zinc-800 text-white sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                        Friend Requests
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="incoming" className="w-full">
                    <TabsList className="bg-zinc-800 border border-zinc-700 w-full">
                        <TabsTrigger value="incoming" className="data-[state=active]:bg-zinc-700 relative">
                            Incoming
                            {incomingRequests.length > 0 && (
                                <Badge className="ml-2 h-5 bg-red-500 hover:bg-red-500">{incomingRequests.length}</Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="outgoing" className="data-[state=active]:bg-zinc-700 relative">
                            Outgoing
                            {outgoingRequests.length > 0 && (
                                <Badge className="ml-2 h-5 bg-purple-500 hover:bg-purple-500">{outgoingRequests.length}</Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="add" className="data-[state=active]:bg-zinc-700">
                            Add Friend
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="incoming" className="mt-4 space-y-3">
                        {incomingRequests.length === 0 ? (
                            <div className="text-center py-8">
                                <Users className="h-12 w-12 mx-auto text-zinc-600 mb-2" />
                                <p className="text-zinc-400">No pending friend requests</p>
                            </div>
                        ) : (
                            incomingRequests.map((request) => (
                                <div key={request.id} className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-zinc-700">
                                            <AvatarImage src={request.avatar} alt={request.name} />
                                            <AvatarFallback className="bg-zinc-800 text-purple-400">
                                                {request.name.substring(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">{request.name}</p>
                                            {request.mutualFriends > 0 && (
                                                <p className="text-xs text-zinc-400">
                                                    {request.mutualFriends} mutual friend{request.mutualFriends > 1 ? "s" : ""}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button
                                            size="icon"
                                            className="h-8 w-8 rounded-full bg-green-600 hover:bg-green-700"
                                            onClick={() => acceptRequest(request.id)}
                                        >
                                            <Check className="h-4 w-4" />
                                            <span className="sr-only">Accept</span>
                                        </Button>
                                        <Button
                                            size="icon"
                                            className="h-8 w-8 rounded-full bg-red-600 hover:bg-red-700"
                                            onClick={() => rejectRequest(request.id)}
                                        >
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">Reject</span>
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="outgoing" className="mt-4 space-y-3">
                        {outgoingRequests.length === 0 ? (
                            <div className="text-center py-8">
                                <Users className="h-12 w-12 mx-auto text-zinc-600 mb-2" />
                                <p className="text-zinc-400">No outgoing friend requests</p>
                            </div>
                        ) : (
                            outgoingRequests.map((request) => (
                                <div key={request.id} className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-zinc-700">
                                            <AvatarImage src={request.avatar} alt={request.name} />
                                            <AvatarFallback className="bg-zinc-800 text-purple-400">
                                                {request.name.substring(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">{request.name}</p>
                                            {request.mutualFriends > 0 && (
                                                <p className="text-xs text-zinc-400">
                                                    {request.mutualFriends} mutual friend{request.mutualFriends > 1 ? "s" : ""}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-zinc-700 hover:bg-zinc-700 text-xs"
                                        onClick={() => cancelRequest(request.id)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="add" className="mt-4">
                        <div className="bg-zinc-800 p-4 rounded-lg">
                            <p className="text-sm text-zinc-400 mb-4">You can add friends with their NeonConnect username.</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Enter a username"
                                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                                />
                                <Button
                                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                                    disabled={!searchInput.trim()}
                                >
                                    Send Request
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}