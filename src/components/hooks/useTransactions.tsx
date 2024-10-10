import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTransactions = () => {
    const axiosInstance = useAxiosSecure();
    const { data: transactions = [], refetch, isPending} = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await axiosInstance.get('/transaction/transaction-history');
            return res?.data?.data;
        },
    })
    return [transactions, refetch, isPending];
};

export default useTransactions;