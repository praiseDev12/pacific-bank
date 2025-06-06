import Spline from '@splinetool/react-spline/next';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='bg-blue-900 overflow-hidden'>
			{children}
			<div className='w-full max-lg:hidden max-lg:opacity-0 h-[100vh] absolute top-0 -left-[25%] z-11'>
				<div className='w-full h-full'>
					<Spline scene='https://prod.spline.design/HQ1kkNM3esa6Gnrk/scene.splinecode' />
				</div>
			</div>
		</main>
	);
}
