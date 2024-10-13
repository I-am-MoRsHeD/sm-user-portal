import TransactionTable from '@/components/TransactionLog/TransactionTable/TransactionTable';
import useTransactions from '@/components/hooks/useTransactions';
import React from 'react';


import { useState } from 'react';


const TransactionsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12; // Items per page
  const [transactions, , isPending, isLoading] = useTransactions(currentPage, limit);


  // Use TanStack Query to fetch transactions with Axios


  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < transactions?.meta?.totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };




  return (
    <div className="mx-auto flex flex-col justify-between gap-3 py-2 lg:px-0 bg-white rounded-xl w-full overflow-hidden mt-5 h-[calc(100vh-9rem)] min-h-full">
      <div className=" w-full h-full overflow-x-hidden overflow-y-auto custom-scrollbar p-2">
        <TransactionTable transactions={transactions?.data} isLoading={isLoading} />
        {/* <CustomTable /> */}
      </div>

      {/* pagination */}
      <div className='px-4 flex-1 w-full'>
        {/* Pagination Controls */}
        <div className="pagination">
          <div id="pagination" className="flex items-center font-semibold">
            {/* Previous Button */}
            {currentPage > 1 && (
              <p
                onClick={handlePrevPage}
                className="px-3 py-1 border-2 border-[#723EEB] cursor-pointer bg-white text-black"
              >
                {'<<'}
              </p>
            )}

            {/* Page Numbers */}
            {Array.from({ length: transactions?.meta?.totalPages }, (_, index) => {
              const page = index + 1; // Pages start from 1
              return (
                <p
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border-2 border-[#723EEB] cursor-pointer 
          ${currentPage === page ? 'bg-[#723EEB] text-white' : 'bg-white text-black'}`}
                >
                  {page}
                </p>
              );
            })}

            {/* Next Button */}
            {currentPage < transactions?.meta?.totalPages && (
              <p
                onClick={handleNextPage}
                className="px-3 py-1 border-2 border-[#723EEB] cursor-pointer bg-white text-black"
              >
                {'>>'}
              </p>
            )}
          </div>

        </div>
      </div>
      {/* <PaginationHome /> */}
    </div>

  );
};

export default TransactionsPage;
