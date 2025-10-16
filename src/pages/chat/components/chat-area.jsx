"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Smile, Paperclip, Gift, Send, Phone, Video, Info } from "lucide-react"

export function ChatArea() {
    const [messages, setMessages] = useState([
        { id: "1", sender: "friend", content: "Hey! Are you up for some gaming tonight?", timestamp: "Today at 2:30 PM" },
        { id: "2", sender: "user", content: "What do you want to play?", timestamp: "Today at 2:32 PM" },
        {
            id: "3",
            sender: "friend",
            content: "I was thinking we could try that new co-op game that just came out. The graphics look amazing!",
            timestamp: "Today at 2:33 PM",
        },
        { id: "4", sender: "user", content: "Sounds good to me! What time works for you?", timestamp: "Today at 2:35 PM" },
        { id: "5", sender: "friend", content: "How about 8 PM? I'll send you an invite.", timestamp: "Today at 2:36 PM" },
    ])

    const [newMessage, setNewMessage] = useState("")

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        const message = {
            id: Date.now().toString(),
            sender: "user",
            content: newMessage,
            timestamp: "Just now",
        }

        setMessages([...messages, message])
        setNewMessage("")
    }

    return (
        <div className="flex-1 flex flex-col bg-zinc-950">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-zinc-800">
                        <AvatarImage src="/placeholder-user.jpg" alt="CyberNinja" />
                        <AvatarFallback className="bg-zinc-800 text-purple-400">CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-sm font-medium">CyberNinja</h2>
                        <p className="text-xs text-zinc-400">Online - Playing Cyberpunk 2077</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <Phone className="h-5 w-5" />
                        <span className="sr-only">Call</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <Video className="h-5 w-5" />
                        <span className="sr-only">Video Call</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <Info className="h-5 w-5" />
                        <span className="sr-only">Info</span>
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                            {message.sender === "friend" && (
                                <Avatar className="h-9 w-9 mt-1 border border-zinc-800">
                                    <AvatarImage src="/placeholder-user.jpg" alt="CyberNinja" />
                                    <AvatarFallback className="bg-zinc-800 text-purple-400">CN</AvatarFallback>
                                </Avatar>
                            )}
                            <div>
                                <div
                                    className={`px-4 py-2 rounded-2xl ${message.sender === "user"
                                            ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                                            : "bg-zinc-800 text-white"
                                        }`}
                                >
                                    {message.content}
                                </div>
                                <p className="text-xs text-zinc-500 mt-1">{message.timestamp}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                        <Paperclip className="h-5 w-5" />
                        <span className="sr-only">Attach</span>
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                        <Gift className="h-5 w-5" />
                        <span className="sr-only">Gift</span>
                    </Button>
                    <div className="flex-1 relative">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Message @CyberNinja"
                            className="bg-zinc-800 border-zinc-700 focus-visible:ring-purple-500 pr-10"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-zinc-400 hover:text-white hover:bg-transparent"
                        >
                            <Smile className="h-5 w-5" />
                            <span className="sr-only">Emoji</span>
                        </Button>
                    </div>
                    <Button
                        type="submit"
                        size="icon"
                        className="h-9 w-9 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-full"
                    >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    )
}