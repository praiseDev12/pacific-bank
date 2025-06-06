export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main className='bg-blue-900'>{children}</main>;
}
