import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useTransactions = (page?: number, limit?: number) => {
    const axiosInstance = useAxiosSecure();
    const { data: transactions = [], refetch, isPending, isLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await axiosInstance.get('/transaction/transaction-history', {
                params: {
                    limit,
                    page,
                }
            });
            return res?.data;
        },
    })
    return [transactions, refetch, isPending, isLoading];
};

export default useTransactions;