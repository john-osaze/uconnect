"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Gamepad2, Users, Trophy, Clock, ArrowRight } from "lucide-react"

export function Activity() {
    const activeGames = [
        {
            id: "1",
            game: "Sasha Charles",
            image: "/placeholder.svg",
            players: [
                { id: "1", name: "CyberNinja", avatar: "/placeholder-user.jpg" },
                { id: "2", name: "NeonHunter", avatar: "/placeholder-user.jpg" },
            ],
            startTime: "2 hours ago",
        },
        {
            id: "2",
            game: "Ryan Lee",
            image: "/placeholder.svg",
            players: [
                { id: "4", name: "VirtualPhantom", avatar: "/placeholder-user.jpg" },
                { id: "5", name: "QuantumGamer", avatar: "/placeholder-user.jpg" },
                { id: "3", name: "PixelWarrior", avatar: "/placeholder-user.jpg" },
            ],
            startTime: "45 minutes ago",
        },
    ]

    const recentAchievements = [
        {
            user: "Dr. James Gordon",
            avatar: "/placeholder-user.jpg",
            game: "Award",
            achievement: "Best Mentor of the Year",
            time: "3 hours ago",
        },
        {
            user: "Patricia Brown",
            avatar: "/placeholder-user.jpg",
            game: "Elected",
            achievement: "Student Council President",
            time: "Yesterday",
        },
    ]

    return (
        <div className="w-72 border-l border-zinc-800 bg-zinc-900/50 flex flex-col">
            <div className="p-4 border-b border-zinc-800">
                <h2 className="text-sm font-semibold text-zinc-300 flex items-center">
                    <Gamepad2 className="h-4 w-4 mr-2 text-purple-400" />
                    YOUR ACTIVITY
                </h2>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4">
                    <div className="mb-6">
                        <h3 className="text-xs font-semibold text-zinc-400 mb-3 flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            PENDING REQUESTS
                        </h3>

                        {activeGames.length > 0 ? (
                            <div className="space-y-3">
                                {activeGames.map((game) => (
                                    <div key={game.id} className="bg-zinc-800 rounded-lg overflow-hidden">
                                        <div className="h-20 bg-zinc-700 relative">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center opacity-40"
                                                style={{ backgroundImage: `url(${game.image})` }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-800 to-transparent" />
                                            <div className="absolute bottom-2 left-2">
                                                <h4 className="font-medium text-sm">{game.game}</h4>
                                                <div className="flex items-center text-xs text-zinc-400">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {game.startTime}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex -space-x-2">
                                                    {game.players.map((player) => (
                                                        <Avatar key={player.id} className="h-6 w-6 border border-zinc-800">
                                                            <AvatarImage src={player.avatar} alt={player.name} />
                                                            <AvatarFallback className="bg-zinc-700 text-purple-400 text-xs">
                                                                {player.name.substring(0, 2)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    ))}
                                                    <div className="h-6 w-6 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-zinc-400 border border-zinc-800">
                                                        {game.players.length}
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-7 px-2 text-xs text-purple-400 hover:text-purple-300 hover:bg-zinc-700"
                                                >
                                                    Accept
                                                    <ArrowRight className="h-3 w-3 ml-1" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4 bg-zinc-800 rounded-lg">
                                <Gamepad2 className="h-8 w-8 mx-auto text-zinc-600 mb-2" />
                                <p className="text-sm text-zinc-400">No active games</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-zinc-400 mb-3 flex items-center">
                            <Trophy className="h-3 w-3 mr-1" />
                            RECENT ACHIEVEMENTS
                        </h3>

                        {recentAchievements.length > 0 ? (
                            <div className="space-y-3">
                                {recentAchievements.map((achievement, index) => (
                                    <div key={index} className="bg-zinc-800 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Avatar className="h-6 w-6 border border-zinc-700">
                                                <AvatarImage src={achievement.avatar} alt={achievement.user} />
                                                <AvatarFallback className="bg-zinc-700 text-purple-400 text-xs">
                                                    {achievement.user.substring(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-xs font-medium">{achievement.user}</p>
                                                <p className="text-xs text-zinc-400">{achievement.game}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-md">
                                            <div className="h-8 w-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                                                <Trophy className="h-4 w-4 text-yellow-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium">{achievement.achievement}</p>
                                                <p className="text-xs text-zinc-400">{achievement.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4 bg-zinc-800 rounded-lg">
                                <Trophy className="h-8 w-8 mx-auto text-zinc-600 mb-2" />
                                <p className="text-sm text-zinc-400">No recent achievements</p>
                            </div>
                        )}
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}