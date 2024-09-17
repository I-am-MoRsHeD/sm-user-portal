"use client"
import Topbar from '@/components/Topbar'
import TransactionsPage from './transactionsPage/transactionsPage'
import SearchBox from '@/components/TransactionLog/SearchBox/SearchBox'




const page = () => {
    return (
        <div className=''>
            <Topbar>Transactions</Topbar>
            <div className='absolute top-7 right-56'>
                <SearchBox/>
            </div>
            <div>
                <h2 className='text-sm font-medium text-black mb-4 ml-1'>Transactions Log</h2>
            </div>
            <TransactionsPage />
        </div>
    )
}

export default page
