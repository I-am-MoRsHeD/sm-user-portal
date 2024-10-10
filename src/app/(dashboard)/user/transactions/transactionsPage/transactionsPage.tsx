import TransactionTable from '@/components/TransactionLog/TransactionTable/TransactionTable';
import React from 'react';
import PaginationHome from './PaginationHome';
import useTransactions from '@/components/hooks/useTransactions';


const TransactionsPage: React.FC = () => {
  const [transactions] =  useTransactions();
  console.log(transactions);
  return (
    <div className="mx-auto flex flex-col justify-between gap-3 py-2 lg:px-0 bg-white rounded-xl w-full overflow-hidden mt-5 h-[calc(100vh-9rem)] min-h-full">
      <div className=" w-full h-full overflow-x-hidden overflow-y-auto custom-scrollbar p-2">
        <TransactionTable />
        {/* <CustomTable /> */}
      </div>

      <div className='px-4 flex-1 w-full'>
        <PaginationHome />
      </div>
    </div>
  );
};

export default TransactionsPage;
