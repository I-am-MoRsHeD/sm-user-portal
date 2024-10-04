import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const useRecipients = () => {
    const axiosInstance = useAxiosSecure();
    const { data: recipients = [], refetch, isPending } = useQuery({
        queryKey: ['recipients'],
        queryFn: async () => {
            const res = await axiosInstance.get('/recipient');
            
            return res?.data?.data?.data;
        },
    })
    return [recipients, refetch, isPending];
};
export default useRecipients;