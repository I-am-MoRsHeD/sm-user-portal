import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMainWallet = () => {
    const axiosInstance = useAxiosSecure();
    const { data: mainWallet = [], refetch : mainWalletRefetch, isPending} = useQuery({
        queryKey: ['mainWallet'],
        queryFn: async () => {
            const res = await axiosInstance.get('/wallet/main-wallet');
            return res?.data?.data;
        },
    })
    return [mainWallet, mainWalletRefetch, isPending];
};

export default useMainWallet;