"use client"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Home, Users, Settings, PlusCircle, Gamepad2 } from "lucide-react"

export function Sidebar() {
    return (
        <div className="h-screen w-16 flex flex-col items-center py-4 bg-zinc-950 border-r border-zinc-800">
            <TooltipProvider delayDuration={0}>
                <div className="flex flex-col items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white hover:text-white group relative"
                            >
                                <span className="absolute -inset-0.5 rounded-full blur opacity-30 bg-purple-400 group-hover:opacity-40 transition-all"></span>
                                <Gamepad2 className="h-6 w-6" />
                                <span className="sr-only">Home</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-zinc-900 text-white border-zinc-800">
                            <p>UConnect</p>
                        </TooltipContent>
                    </Tooltip>
                    <div className="w-10 h-0.5 bg-zinc-800 my-2"></div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12 rounded-full bg-zinc-800 hover:bg-purple-600 text-zinc-400 hover:text-white transition-all duration-300"
                            >
                                <Home className="h-5 w-5" />
                                <span className="sr-only">Home</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-zinc-900 text-white border-zinc-800">
                            <p>Home</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12 rounded-full bg-zinc-800 hover:bg-purple-600 text-zinc-400 hover:text-white transition-all duration-300"
                            >
                                <Users className="h-5 w-5" />
                                <span className="sr-only">Friends</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-zinc-900 text-white border-zinc-800">
                            <p>Friends</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12 rounded-full bg-zinc-800 hover:bg-purple-600 text-zinc-400 hover:text-white transition-all duration-300"
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-zinc-900 text-white border-zinc-800">
                            <p>Settings</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="mt-auto">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12 rounded-full bg-zinc-800 hover:bg-cyan-600 text-zinc-400 hover:text-white transition-all duration-300"
                            >
                                <PlusCircle className="h-5 w-5" />
                                <span className="sr-only">Add Mentors</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-zinc-900 text-white border-zinc-800">
                            <p>Add Mentors (Coming Soon)</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>
        </div>
    )
}