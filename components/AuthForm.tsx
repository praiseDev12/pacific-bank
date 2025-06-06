'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import CustomInput from './CustomInput';
import { AuthformSchema, cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';

const AuthForm = ({ type }: { type: string }) => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const formShema = AuthformSchema(type);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formShema>>({
		resolver: zodResolver(formShema),
		defaultValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			address1: '',
			city: '',
			state: '',
			postalCode: '',
			dateOfBirth: '',
			ssn: '',
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (data: z.infer<typeof formShema>) => {
		setIsLoading(true);

		try {
			// Sign up with Appwrite & create a plaid token
			if (type === 'sign-up') {
				const newUser = await signUp(data);
				setUser(newUser);
			}

			if (type === 'sign-in') {
				const response = await signIn({
					email: data.email,
					password: data.password,
				});

				if (response) router.push('/');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<section
				className={cn(
					'auth-form no-scrollbar absolute top-0 lg:right-0 border p-10 shadow-xl bg-white overflow-y-scroll',
					{ 'justify-center': type === 'sign-in' }
				)}>
				<header className='flex flex-col gap-5 md:gap-8'>
					<Link href='/' className='cursor-pointer flex items-center gap-1'>
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

					<div className='flex flex-col gap-1 md:gap-3'>
						<h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
							{user
								? 'Link Account'
								: type === 'sign-in'
								? 'Sign In'
								: 'Sign Up'}
							<p className='text-16 font-normal text-gray-600'>
								{user
									? 'Link your account to get started'
									: 'Please enter your details'}
							</p>
						</h1>
					</div>
				</header>
				{user ? (
					<div className='flex flex-col gap-4'>{/* PlaidLink */}</div>
				) : (
					<>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-8'>
								{type === 'sign-up' && (
									<>
										<div className='flex max-md:gap-4 min-lg:gap-10'>
											<CustomInput
												control={form.control}
												name='firstName'
												label='First Name'
												placeholder='Enter your first name'
												type='text'
											/>

											<CustomInput
												control={form.control}
												name='lastName'
												label='Last Name'
												placeholder='Enter your last name'
												type='text'
											/>
										</div>

										<CustomInput
											control={form.control}
											name='address1'
											label='Address'
											placeholder='Enter your specific address'
											type='text'
										/>

										<CustomInput
											control={form.control}
											name='city'
											label='City'
											placeholder='Enter your City'
											type='text'
										/>

										<div className='flex gap-8'>
											<CustomInput
												control={form.control}
												name='state'
												label='State'
												placeholder='Example: Delta'
												type='text'
											/>

											<CustomInput
												control={form.control}
												name='postalCode'
												label='Postal Code'
												placeholder='Example: 11101'
												type='text'
											/>
										</div>

										<div className='flex gap-8'>
											<CustomInput
												control={form.control}
												name='dateOfBirth'
												label='Date of Birth'
												placeholder='YYYY-MM-DD'
												type='text'
											/>

											<CustomInput
												control={form.control}
												name='ssn'
												label='SSN'
												placeholder='Example: 1234'
												type='text'
											/>
										</div>
									</>
								)}
								<CustomInput
									control={form.control}
									name='email'
									label='Email'
									placeholder='Enter your email'
									type='email'
								/>

								<CustomInput
									control={form.control}
									name='password'
									label='Password'
									placeholder='Enter your password'
									type='password'
								/>

								<div className='flex flex-col gap-1'>
									<Button
										disabled={isLoading}
										type='submit'
										className={cn(
											'form-btn cursor-pointer duration-450',
											{
												'border-bank-gradient bg-bank-gradient hover:shadow-xl shadow-bank-gradient':
													!isLoading,
											},
											{
												'border-blue-500 bg-blue-400 cursor-not-allowed':
													isLoading,
											}
										)}>
										{isLoading ? (
											<>
												<Loader2
													size={20}
													color='black'
													className='animate-spin'
												/>{' '}
												&nbsp;
												{type === 'sign-in' ? 'Signing in...' : 'Signing up...'}
											</>
										) : type === 'sign-in' ? (
											'Sign In'
										) : (
											'Sign Up'
										)}
									</Button>
								</div>
							</form>
						</Form>

						<footer className='flex justify-center gap-1'>
							<p className='text-14 font-normal text-gray-600'>
								{type === 'sign-in'
									? "Don't have an account?"
									: 'Already have an account?'}
							</p>
							<Link
								href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
								className='underline text-14 text-bank-gradient font-semibold'>
								{type === 'sign-in' ? 'Sign Up' : 'Sign In'}
							</Link>
						</footer>
					</>
				)}
			</section>
			<section
				className={cn(
					'auth-form-div authbg max-lg:hidden max-lg:opacity-0 absolute top-0 left-0 bg-blue-950'
				)}>
				<div className='flex max-md:hidden h-screen shadow-2xl items-end justify-center w-full gap-4'>
					<Image
						src='/icons/logo.svg'
						alt='logo'
						width={90}
						height={90}
						className=''
					/>
					<p className='text-[50px] font-bold font-ibm-plex-serif text-shadow-blue-800 text-blue-400'>
						Pacific Bank
					</p>
				</div>
			</section>
		</>
	);
};

export default AuthForm;
