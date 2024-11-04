import GameOfLife from "@hhs/components/custom/game-of-life";
import { AsciiLogo } from "@hhs/components/custom/Logo";

function Background() {
	return (
		<>
			<AsciiLogo
				className="absolute right-[calc((100%-56rem)/2)] bottom-0 z-0 p-2 opacity-10 hidden md:block"
			/>
			<GameOfLife
				className="absolute -z-50 opacity-20"
			/>
		</>
	);
}

export default Background;
