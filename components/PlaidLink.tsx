'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { PlaidLinkOnSuccess, usePlaidLink } from 'react-plaid-link';
import {
	createLinkToken,
	exchangePublicToken,
} from '@/lib/actions/user.actions';
import Image from 'next/image';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
	const router = useRouter();

	const [token, setToken] = useState('');

	useEffect(() => {
		const getLinkToken = async () => {
			const data = await createLinkToken(user);
			setToken(data?.linkToken);
		};

		getLinkToken();
	}, [user]);

	const onSuccess = useCallback<PlaidLinkOnSuccess>(
		async (public_token: String) => {
			await exchangePublicToken({
				publicToken: public_token,
				user,
			});
			router.push('/');
		},
		[user]
	);

	const config: PlaidLinkOptions = {
		token,
		onSuccess,
	};

	const { open, ready } = usePlaidLink(config);

	return (
		<>
			{variant === 'primary' ? (
				<Button
					onClick={() => open()}
					disabled={!ready}
					className='plaidlink-primary cursor-pointer hover:shadow-xl shadow-bank-gradient'>
					Connect Bank
				</Button>
			) : variant === 'ghost' ? (
				<Button
					className='plaidlink-ghost'
					variant='ghost'
					onClick={() => open()}>
					Connect Bank
				</Button>
			) : (
				<Button className='plaidlink-default group' onClick={() => open()}>
					<Image
						src='/icons/connect-bank.svg'
						alt='connect bank'
						width={24}
						height={24}
					/>
					<p className='hidden text-[16px] font-semibold text-black-2 xl:block group-hover:text-white '>
						Connect Bank
					</p>
				</Button>
			)}
		</>
	);
};

export default PlaidLink;
