'use client';

import Link from 'next/link';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BankTabItem } from './BankTabItem';
import BankInfo from './BankInfo';
import TransactionsTable from './TransactionsTable';
import AnimatedButton from './AnimatedButton';
import { Pagination } from './Paginations';

const RecentTransactions = ({
	accounts,
	transactions = [],
	appwriteItemId,
	page = 1,
}: RecentTransactionsProps) => {
	const rowsPerPage = 10;
	const totalPages = Math.ceil(transactions.length / rowsPerPage);

	const indexOfLastTransaction = page * rowsPerPage;

	const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

	const currentTransactions = transactions.slice(
		indexOfFirstTransaction,
		indexOfLastTransaction
	);

	return (
		<section className='recent-transactions'>
			<header className='flex items-center justify-between'>
				<h2 className='recent-transactions-label'>Recent Transactions</h2>
				<Link href={`/transactions/history/?id=${appwriteItemId}`}>
					<AnimatedButton text='View all' className='cursor-pointer' />
				</Link>
			</header>

			<Tabs defaultValue={appwriteItemId} className='w-full'>
				<TabsList className='recent-transactions-tablist'>
					{accounts.map((account: Account) => (
						<TabsTrigger key={account.id} value={account.appwriteItemId}>
							<BankTabItem
								key={account.id}
								account={account}
								appwriteItemId={appwriteItemId}
							/>
						</TabsTrigger>
					))}
				</TabsList>

				{accounts.map((account: Account) => (
					<TabsContent
						key={account.id}
						value={account.appwriteItemId}
						className='space-y-4'>
						<BankInfo
							account={account}
							appwriteItemId={appwriteItemId}
							type='full'
						/>
						<TransactionsTable transactions={currentTransactions} />
						{totalPages > 1 && (
							<div className='my-4 w-full'>
								<Pagination totalPages={totalPages} page={page} />
							</div>
						)}
					</TabsContent>
				))}
			</Tabs>
		</section>
	);
};

export default RecentTransactions;
