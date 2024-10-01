"use client"
import Topbar from '@/components/Topbar'
// import TransactionsPage from '../user/transactions/transactionsPage/transactionsPage'
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle'
import TransactionsPage from './transactionsPage/transactionsPage'




const page = () => {
    return (
        <div className=''>
            <Topbar>Transactions</Topbar>
            {/* <div className='absolute top-7 right-56'>
                <SearchBox/>
            </div> */}
            <CardSubTitle fontSize='1rem' title='Transactions Log' />
            <div className='my-5 overflow-hidden'>
                <TransactionsPage />
            </div>
        </div>
    )
}

export default page
