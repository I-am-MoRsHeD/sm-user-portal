import React from 'react';

import TransactionTable from '@/components/TransactionLog/TransactionTable/TransactionTable';
import PaginationHome from './PaginationHome';

const TransactionsPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-between mx-auto p-4 sm:px-8 lg:px-0 bg-white min-h-screen rounded-xl w-full overflow-hidden">
      <div className=" px-0 w-full overflow-hidden">
        <TransactionTable />
      </div>

      <div>
        <PaginationHome />
      </div>
    </div>
  );
};

export default TransactionsPage;
