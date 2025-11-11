"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, LogOut, User, ImageIcon } from "lucide-react"

export function UserNav() {
    const [open, setOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)

    return (
        <>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full group">
                        <Avatar className="h-10 w-10 border-2 border-zinc-800 group-hover:border-purple-500 transition-all duration-300">
                            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                            <AvatarFallback className="bg-zinc-800 text-purple-400">AJ</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-zinc-900"></span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-zinc-900 border border-zinc-800 text-white" align="end" forceMount>
                    <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">Alex Johnson</p>
                            <p className="text-xs leading-none text-zinc-400">alexjohnson@email.com</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuGroup>
                        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <User className="mr-2 h-4 w-4 text-purple-400" />
                                    <span>Edit Profile</span>
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="bg-zinc-900 border border-zinc-800 text-white">
                                <DialogHeader>
                                    <DialogTitle className="text-xl bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                                        Edit Your Profile
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-6 py-4">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="relative">
                                            <Avatar className="h-24 w-24 border-4 border-purple-500/50">
                                                <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                                                <AvatarFallback className="bg-zinc-800 text-purple-400 text-2xl">AJ</AvatarFallback>
                                            </Avatar>
                                            <Button
                                                size="icon"
                                                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-zinc-800 hover:bg-purple-600"
                                            >
                                                <ImageIcon className="h-4 w-4" />
                                                <span className="sr-only">Change profile pic</span>
                                            </Button>
                                        </div>
                                        <div className="w-full h-24 rounded-md bg-gradient-to-r from-purple-900/50 to-cyan-900/50 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-30 bg-cover"></div>
                                            <Button
                                                size="icon"
                                                className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-zinc-800/80 hover:bg-purple-600"
                                            >
                                                <ImageIcon className="h-4 w-4" />
                                                <span className="sr-only">Change banner</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="text-white">
                                            Display Name
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue="GamerRex"
                                            className="bg-zinc-800 border-zinc-700 focus-visible:ring-purple-500"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status" className="text-white">
                                            Status
                                        </Label>
                                        <Input
                                            id="status"
                                            defaultValue="Ready to game!"
                                            className="bg-zinc-800 border-zinc-700 focus-visible:ring-purple-500"
                                        />
                                    </div>
                                    <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                                        Save Changes
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800">
                            <Settings className="mr-2 h-4 w-4 text-purple-400" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800">
                        <LogOut className="mr-2 h-4 w-4 text-purple-400" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}