import TransactionTable from '@/components/TransactionLog/TransactionTable/TransactionTable';
import React from 'react';
import PaginationHome from './PaginationHome';


const TransactionsPage: React.FC = () => {
  return (
    <div className="mx-auto flex flex-col justify-between gap-3 p-4 sm:px-8 lg:px-0 bg-white rounded-xl w-full overflow-hidden mt-5 h-[calc(100vh-9rem)] min-h-full">
      <div className=" px-2 w-full h-full overflow-x-hidden overflow-y-auto">
        <TransactionTable />
      </div>

      <div className='px-4 flex-1 w-full'>
        <PaginationHome />
      </div>
    </div>
  );
};

export default TransactionsPage;
