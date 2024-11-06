"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "../shadcn/button";
import { Grid, AutoSizer } from 'react-virtualized';

interface WorldDimensions {
	height: number;
	width: number;
}

interface LivingCells {
	[key: string]: boolean;
}

const GameOfLife = () => {
	const cellSize = 17;
	const initialSpeed = 150;
	const [worldDimensions, setWorldDimensions] = useState<WorldDimensions>({ height: 0, width: 0 });
	const [isRunning, setIsRunning] = useState(false);
	const [speed, setSpeed] = useState(initialSpeed);
	const [livingCells, setLivingCells] = useState<LivingCells>({});
	const [generation, setGeneration] = useState(0);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const handleResize = () => {
			setWorldDimensions({ height: window.innerHeight - 100, width: window.innerWidth });
			initializePattern();
			setIsRunning(true)
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, [worldDimensions.height, worldDimensions.width]);

	const initializePattern = () => {
		const cells = generatePattern();
		setLivingCells({
			...cells,
		});
		setGeneration(0);
	};
	function generatePattern(): LivingCells {
		const cells: LivingCells = {};
		const midX = Math.floor(worldDimensions.width / cellSize / 2) - 1;
		const midY = Math.floor(worldDimensions.height / cellSize / 2) - 1;

		// x-xx
		// xxx-
		// -x--
		const bHeptominoPattern = [
			[midX, midY],
			[midX + 2, midY],
			[midX + 3, midY],
			[midX, midY + 1],
			[midX + 1, midY + 1],
			[midX + 2, midY + 1],
			[midX + 1, midY + 2],
		];

		// -xx
		// xx-
		// -x-
		const rHeptominoPattern = [
			[midX, midY],
			[midX, midY + 1],
			[midX + 1, midY + 1],
			[midX - 1, midY],
			[midX, midY - 1],
		];

		const randomPattern = Math.random() > 0.5 ? bHeptominoPattern : rHeptominoPattern;

		randomPattern.forEach(([x, y]) => {
			cells[`${x}-${y}`] = true;
		});

		return cells;
	}

	const progressLife = useCallback(() => {
		setLivingCells((cells) => {
			setGeneration((gen) => gen + 1);
			const newCells = { ...cells };
			const potentialCells: { [key: string]: number } = {};

			Object.entries(cells).forEach(([key, isAlive]) => {
				if (isAlive) {
					const [x, y] = key.split("-").map(Number);
					let livingNeighbors = 0;

					getNeighbors(x, y).forEach(([nx, ny]) => {
						const neighborKey = `${nx}-${ny}`;
						return cells[neighborKey]
							? livingNeighbors++
							: (potentialCells[neighborKey] = (potentialCells[neighborKey] || 0) + 1);
					});

					if (livingNeighbors < 2 || livingNeighbors > 3) newCells[key] = false;
				}
			});

			Object.keys(potentialCells).forEach((key) => {
				if (potentialCells[key] === 3) newCells[key] = true;
			});

			return newCells;
		});

		if (isRunning) timeoutRef.current = setTimeout(progressLife, speed);
	}, [isRunning, speed]);

	useEffect(() => {
		if (isRunning) timeoutRef.current = setTimeout(progressLife, speed);
		return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
	}, [isRunning, speed, progressLife]);

	const getNeighbors = (x: number, y: number): [number, number][] =>
		[-1, 0, 1]
			.flatMap((dx) => [-1, 0, 1].map((dy) => [x + dx, y + dy] as [number, number]))
			.filter(([nx, ny]) => (nx !== x || ny !== y) && nx >= 0 && ny >= 0 &&
				nx < Math.floor(worldDimensions.width / cellSize) &&
				ny < Math.floor(worldDimensions.height / cellSize));

	const Cell = ({ columnIndex, rowIndex, style }: { columnIndex: number, rowIndex: number, style: React.CSSProperties }) => {
		const isAlive = !!livingCells[`${columnIndex}-${rowIndex}`];
		return (
			<div
				className={`cell ${isAlive ? "bg-primary" : ""}`}
				style={{ ...style, width: cellSize - 2, height: cellSize - 2 }}
			/>
		);
	};

	return (
		<>
			<AutoSizer>
				{({ height, width }) => (
					<Grid
						className="grid absolute -z-50 opacity-20"
						columnCount={Math.floor(worldDimensions.width / cellSize)}
						columnWidth={cellSize}
						height={height}
						rowCount={Math.floor(worldDimensions.height / cellSize)}
						rowHeight={cellSize}
						width={width}
						cellRenderer={({ columnIndex, key, rowIndex, style }) => (
							<Cell key={key} columnIndex={columnIndex} rowIndex={rowIndex} style={style} />
						)}
					/>
				)}
			</AutoSizer>
			<div className="controls-container mt-4 right-0 bottom-5 p-4 absolute opacity-20 group hidden md:block">
				<div className="options-icon group-hover:hidden">
					<Button className="btn">⚙️</Button>
				</div>
				<div className="controls hidden group-hover:block transition-all z-50">
					<Button className="btn" onClick={() => setIsRunning(true)}>Begin</Button>
					<Button className="btn" onClick={() => setIsRunning(false)}>Pause</Button>
					<Button className="btn" onClick={initializePattern}>Reset</Button>
					<div className="mt-2">
						Speed (ms):
						<input
							className="w-16 text-center font-semibold"
							type="number"
							value={speed}
							onChange={(e) => setSpeed(+e.target.value)}
						/>
					</div>
					<div>Generation: {generation}</div>
				</div>
			</div>
		</>
	);
};

export default GameOfLife;
