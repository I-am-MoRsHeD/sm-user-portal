import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const useRecipients = () => {
    const axiosInstance = useAxiosSecure();
    const { data: recipients = [], refetch, isPending, isLoading } = useQuery({
        queryKey: ['recipients'],
        queryFn: async () => {
            const res = await axiosInstance.get('/recipient');
            
            return res?.data?.data?.data;
        },
    })
    return [recipients, refetch, isPending, isLoading];
};
export default useRecipients;