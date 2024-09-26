"use client"
import dynamic from 'next/dynamic'

import Topbar from '@/components/Topbar'

import TotalTransactionsChart from '@/components/dashboard/TotalTransactionsChart/TotalTransactionsChart'
import SendMoneyLog from '@/components/dashboard/SendMoneyLog/SendMoneyLog'
import Wallet from '@/components/dashboard/Wallet/Wallet'


const Page = () => {

    return (
        <div className='min-h-screen max-h-full'>
            <Topbar>Dashboard</Topbar>
            <div className='flex flex-col lg:flex-row items-start w-full gap-5 mt-8'>
                <div className='lg:flex-1 w-full lg:w-3/5'>
                    <Wallet />
                </div>
                <div className='lg:w-2/5 w-full'>
                    <SendMoneyLog />
                </div>
            </div>
            <div >
                <TotalTransactionsChart />
            </div>
        </div>
    )
}

export default Page;
