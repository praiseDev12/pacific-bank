import Image from 'next/image';
import React from 'react';
import ToolTip from './ToolTip';
import { logoutAccount } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
	const router = useRouter();
	const handleLogout = async () => {
		const loggedOut = await logoutAccount();

		if (loggedOut) {
			router.push('/sign-in');
		}
	};

	return (
		<footer className='footer'>
			<div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
				<p className='font-bold'>{user?.firstName[0]}</p>
			</div>

			<div
				className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
				<h1 className='text-14 truncate font-semibold text-gray-700'>
					{user?.firstName}
				</h1>
				<p className='text-14 truncate font-normal text-gray-600'>
					{user?.email}
				</p>
			</div>

			<div className='footer_image ml-1 group' onClick={handleLogout}>
				<Image src='/icons/logout.svg' alt='logout' width={25} height={25} />

				<ToolTip tip='Logout' />
			</div>
		</footer>
	);
};

export default Footer;
