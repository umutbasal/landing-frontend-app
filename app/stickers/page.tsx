"use client"

import Floating, { FloatingElement } from "../../components/fancy/parallax-floating"
import LandingLayoutView from "@hhs/layouts/landing-layout"
import { motion, stagger, useAnimate } from "motion/react"
import * as React from "react"

const bgColors = [
	"bg-red-500",
	"bg-blue-500",
	"bg-green-500",
	"bg-yellow-500",
	"bg-purple-500",
	"bg-pink-500",
	"bg-indigo-500",
	"bg-orange-500",
]

const positions = [
	"top-1/4 left-[10%]",
	"top-1/2 left-[15%]",
	"top-1/3 left-[40%]",
	"top-2/3 left-[60%]",
	"top-1/4 right-[20%]",
	"bottom-1/3 left-[20%]",
	"bottom-1/2 right-[30%]",
	"bottom-1/4 left-[45%]",
]

const stickers = Array.from({ length: 8 }, (_, i) => ({
	depth: Math.random() * 2 + 0.5,
	className: `${positions[i]} rounded-xl cursor-pointer`,
}))

export default function StickersPage() {
	const [scope, animate] = useAnimate()
	React.useEffect(() => {
		animate("div", { opacity: [0, 1] }, { duration: 0.2, delay: stagger(0.08) })
	}, [])

	return (
		<LandingLayoutView>
			<div className="w-full overflow-hidden" ref={scope}>
				<Floating className="" sensitivity={2}>
					{stickers.map((sticker, index) => (
						<FloatingElement
							key={index}
							className={sticker.className}
							depth={sticker.depth}
						>
							<motion.div
								className={`${bgColors[index]} w-32 h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform`}
							/>
						</FloatingElement>
					))}
				</Floating>
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<motion.div
						className="text-center space-y-4 items-center flex flex-col"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.88, delay: 0.5 }}
					>
						<p className="text-5xl md:text-7xl text-white font-calendas italic">
							Stickers
						</p>
					</motion.div>
				</div>
			</div>
		</LandingLayoutView>
	)
}
