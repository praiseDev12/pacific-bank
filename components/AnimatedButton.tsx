import { MouseEvent, useState } from 'react';

interface Ripple {
	x: number;
	y: number;
	id: number;
}

const AnimatedButton = ({
	text,
	className = '',
}: {
	text: String;
	className: String;
}) => {
	const [ripples, setRipples] = useState<Ripple[]>([]);

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const ripple = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
			id: Date.now(),
		};
		setRipples((prev) => [...prev, ripple]);
		setTimeout(() => {
			setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
		}, 600);
	};

	return (
		<button
			onClick={handleClick}
			className={`relative overflow-hidden group px-3 py-2 rounded-2xl bg-white border border-blue-600 text-blue-600 font-semibold flex items-center justify-center gap-2 ${className}`}>
			{/* Background fill */}
			<div className='absolute inset-0 bg-blue-600 transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out z-0' />

			{/* Ripple effect */}
			{ripples.map((ripple) => (
				<span
					key={ripple.id}
					className='absolute rounded-full bg-white opacity-30 animate-ripple pointer-events-none'
					style={{
						left: ripple.x - 10,
						top: ripple.y - 10,
						width: 20,
						height: 20,
					}}
				/>
			))}

			{/* Button content */}
			<span className='relative z-10 text-blue-600 group-hover:text-white transition-colors duration-300'>
				{text}
			</span>

			{/* Right-arrow icon */}
			<svg
				className='w-5 h-5 text-blue-600 relative z-10 opacity-0 -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 group-hover:text-white'
				fill='none'
				stroke='currentColor'
				strokeWidth={2}
				viewBox='0 0 24 24'>
				<path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
			</svg>

			{/* Ripple animation keyframes */}
			<style jsx>{`
				@keyframes ripple {
					to {
						transform: scale(4);
						opacity: 0;
					}
				}
				.animate-ripple {
					animation: ripple 0.6s linear;
				}
			`}</style>
		</button>
	);
};

export default AnimatedButton;
