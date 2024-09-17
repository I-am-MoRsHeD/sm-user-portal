"use client"
import dynamic from 'next/dynamic'
import SendMoneyLog from '../../components/dashboard/SendMoneyLog/SendMoneyLog'
import TotalTransactionsChart from '../../components/dashboard/TotalTransactionsChart/TotalTransactionsChart'
import Wallet from '../../components/dashboard/Wallet/Wallet'
import Topbar from '@/components/Topbar'

const page = () => {
    return (
        <div className='min-h-screen max-h-full'>
            <Topbar>Dashboard</Topbar>
            <Wallet />
            <div className='flex flex-col lg:flex-row items-start w-full gap-5'>
                <div className='lg:flex-1 w-full lg:w-3/5'>
                    <TotalTransactionsChart />
                </div>
                <div className='-mt-10 lg:w-2/5 w-full'>
                    <SendMoneyLog />
                </div>
            </div>
        </div>
    )
}

export default page
