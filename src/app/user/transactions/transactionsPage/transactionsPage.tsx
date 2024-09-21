import React from 'react';

import PaginationHome from './PaginationHome';
import TransactionTable from '@/components/TransactionLog/TransactionTable/TransactionTable';

const TransactionsPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-between mx-auto p-4 pb-8 sm:px-8 bg-white min-h-screen rounded-xl">
      <div className="overflow-x-scroll xl:overflow-hidden px-4">
        <TransactionTable />
      </div>

      <div>
        <PaginationHome />
      </div>
    </div>
  );
};

export default TransactionsPage;
