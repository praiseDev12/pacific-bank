import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const AuthformSchema = (type: string) =>
	z.object({
		// sign up
		firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
		lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
		address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
		city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
		state:
			type === 'sign-in' ? z.string().optional() : z.string().min(2).max(50),
		postalCode:
			type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
		dob: type === 'sign-in' ? z.string().optional() : z.string().min(7),
		bvn: type === 'sign-in' ? z.string().optional() : z.string().min(6),
		// both
		email: z.string().email(),
		password: z.string().min(8, {
			message: 'Password must be at least 8 characters long',
		}),
	});
