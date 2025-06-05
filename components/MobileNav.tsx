'use client';

import React from 'react';

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/Sheet';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MobileNav = ({ user }: MobileNavProps) => {
	const pathname = usePathname();
	return (
		<section className='w-full max-w-[264px]'>
			<Sheet>
				<SheetTrigger>
					<Image
						src='/icons/hamburger.svg'
						alt='menu'
						width={30}
						height={30}
						className='cursor-pointer focus'
					/>
				</SheetTrigger>
				<SheetContent side='left' className='border-none bg-white'>
					<div className='pt-10 ml-5'>
						<Link
							href='/'
							className='cursor-pointer flex items-center gap-1 px-4'>
							<Image
								src='/icons/logo.svg'
								alt='pacific logo'
								width={34}
								height={34}
							/>
							<h1 className='text-[26px] leading-[28px] font-bold font-ibm-plex-serif text-black-1'>
								Pacific Bank
							</h1>
						</Link>
					</div>

					<div className='mobilenav-sheet'>
						<SheetClose asChild>
							<nav className='flex h-full flex-col gap-6 pt-16 text-white'>
								{sidebarLinks.map((items) => {
									const isActive =
										pathname === items.route ||
										pathname.startsWith(`${items.route}/`);

									return (
										<SheetClose asChild key={items.label}>
											<Link
												href={items.route}
												key={items.label}
												className={cn(
													'mobilenav-sheet_close w-full hover:border-b-2 font-medium border-b-blue-300 hover:bg-blue-200',
													{
														'bg-bank-gradient hover:bg-blue-700': isActive,
													}
												)}>
												<Image
													src={items.imgURL}
													alt={items.label}
													width={20}
													height={20}
													className={cn({
														'brightness-[3] invert-0': isActive,
													})}
												/>
												<p
													className={cn('text-16 font-semibold text-black-2', {
														'!text-white': isActive,
													})}>
													{items.label}
												</p>
											</Link>
										</SheetClose>
									);
								})}
								USER
							</nav>
						</SheetClose>
						FOTTER
					</div>
				</SheetContent>
			</Sheet>
		</section>
	);
};

export default MobileNav;
