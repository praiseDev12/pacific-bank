'use client';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = ({ user }: SiderbarProps) => {
	const pathname = usePathname();

	return (
		<section className='sidebar'>
			<nav className='flex flex-col gap-4'>
				<Link href='/' className='flex mb-12 cursor-pointer items-center gap-2'>
					<Image
						src='/icons/logo.svg'
						alt='pacific logo'
						className='size-[24px] max-xl:size-14'
						width={34}
						height={34}
					/>
					<h1 className='sidebar-logo'>Pacific</h1>
				</Link>
				{sidebarLinks.map((items) => {
					const isActive =
						pathname === items.route || pathname.startsWith(`${items.route}/`);

					return (
						<Link
							href={items.route}
							key={items.label}
							className={cn(
								'sidebar-link hover:border-b-2 font-medium border-b-blue-300 hover:bg-blue-200',
								{
									'bg-bank-gradient hover:bg-blue-700': isActive,
								}
							)}>
							<div className='relative size-6'>
								<Image
									src={items.imgURL}
									alt={items.label}
									fill
									className={cn({ 'brightness-[3] invert-0': isActive })}
								/>
							</div>
							<p className={cn('sidebar-label', { '!text-white': isActive })}>
								{items.label}
							</p>
						</Link>
					);
				})}
				USER
			</nav>
		</section>
	);
};

export default Sidebar;
