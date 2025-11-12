"use client";

import React from 'react';
import '../../styles/home.css';
import { Link } from 'react-router-dom';

//Image Imports

const LandingPage = () => {
	return (
		<div className="h-[107vh] md:h-[135vh] bg-[#2f2f2f] text-white overflow-hidden">
			{/* Navigation */}
			<nav className="flex items-center justify-between p-6 lg:px-12 relative z-10">
				<div className="text-4xl">
					<img src="images/logo-white.png" alt="Logo" width={125} height={50} />
				</div>

				<div className="hidden md:flex items-center space-x-12">
					<a href="#" className="hover:opacity-80 transition-opacity">About</a>
					<a href="#" className="hover:opacity-80 transition-opacity">Features</a>
					<a href="#" className="hover:opacity-80 transition-opacity">Sponsors</a>
					<a href="#" className="hover:opacity-80 transition-opacity">Resources</a>
				</div>

				<a href="https://play.google.com/store/apps?hl=en&gl=US" target="_blank" rel="noopener noreferrer">
					<button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full backdrop-blur-sm transition-all duration-300 border cursor-pointer border-white/30">
						Get the app
					</button>
				</a>
			</nav>

			{/* Main Content */}
			<div className="flex flex-col items-center justify-center px-6 py-12 lg:py-20 relative">
				{/* Floating Elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					{/* Chat Bubbles */}
					<div className="absolute bottom-1/2 md:top-1/3 left-8 lg:left-40 animate-float">
						<img src="images/chat-bubble.png" alt="Chat Bubble" width={85} height={85} priority />
					</div>

					{/* Location Pin */}
					<div className="hidden md:block absolute top-1/2 left-1/4 animate-bounce-slow">
						<img src="images/at-tag.png" alt="Location Pin" width={75} height={75} priority />
					</div>

					{/* News Paper */}
					<div className="hidden md:block absolute bottom-1/3 left-12 lg:left-32 animate-float-delayed">
						<div className="bg-yellow-100 text-black p-3 rounded-lg shadow-lg transform rotate-12">
							<div className="text-xs font-bold text-red-600">NEWS</div>
							<div className="w-16 h-2 bg-gray-300 mt-1 rounded"></div>
							<div className="w-12 h-1 bg-gray-200 mt-1 rounded"></div>
						</div>
					</div>

					{/* Moon */}
					<div className="absolute bottom-1/2 md:top-1/3 right-8 lg:right-60 animate-pulse">
						<div className="w-16 h-16 bg-gray-300 rounded-full shadow-lg relative">
							<div className="absolute top-2 left-2 w-3 h-3 bg-gray-400 rounded-full"></div>
							<div className="absolute bottom-3 right-3 w-2 h-2 bg-gray-400 rounded-full"></div>
							<div className="absolute top-6 right-2 w-1 h-1 bg-gray-400 rounded-full"></div>
						</div>
					</div>

					{/* Camera */}
					<div className="absolute bottom-1/4 md:bottom-1/4 right-12 lg:right-32 animate-float">
						<img src="images/camera-dynamic.png" alt="Camera" width={75} height={75} priority />
					</div>

					{/* Bell */}
					<div className="hidden md:block absolute bottom-1/4 right-1/4 animate-swing z-20">
						<img src="images/bell-x.png" alt="Bell" width={100} height={100} priority />
					</div>

					{/* Books Stack */}
					<div className="hidden md:block absolute bottom-1/4 left-1/3 lg:left-60 animate-bounce-slow">
						<div className="relative">
							<div className="w-12 h-3 bg-blue-400 rounded shadow-lg"></div>
							<div className="w-12 h-3 bg-green-400 rounded shadow-lg mt-1"></div>
							<div className="w-12 h-3 bg-purple-400 rounded shadow-lg mt-1"></div>
						</div>
					</div>
				</div>

				{/* Hero Text */}
				<div className="text-center mb-2 relative z-10 max-w-4xl">
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
						Social networking that&apos;s
						<br className='hidden md:block'/>
						<span className="text-white/90"> on a whole new level</span>
					</h1>

					<p className="text-sm md:text-xl text-white/80 mb-8 max-w-[36rem] mx-auto leading-relaxed pb-10 md:pb-0">
						Stay connected to what truly matters. Build mentorships, share opportunities, and shape the future of your alma mater through real connections.
					</p>

					<div className="flex flex-col mt-[-10px] md:mt-0 sm:flex-row items-center justify-center gap-4">
						<Link to="/auth">
							<button className="bg-red-500 hover:bg-red-600 px-8 py-3 cursor-pointer rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
								Sign in to continue
							</button>
						</Link>
						<Link to="/auth">
							<button className="bg-white/20 hover:bg-white/30 px-8 py-3 cursor-pointer rounded-full font-semibold backdrop-blur-sm transition-all duration-300 border border-white/30">
								Create account
							</button>
						</Link>
					</div>
				</div>

				{/* Central Earth Image */}
				<div className="relative mb-8">
					<div className="relative">
						<img src={"images/orbit-hands.png"} alt="Earth" width={1150} height={400} priority />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;