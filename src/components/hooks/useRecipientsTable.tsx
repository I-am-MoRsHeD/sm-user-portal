import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure'; 
interface Country {
    createdAt:string;
    updatedAt:string;
    id:string;
    flag:string;
code:string;
    name:string;
    country:string;
    symbol:string;
    rate:number;
    option:string;
    type:string;
    rateType:string;
}
const useRecipient = () => {
    const axiosInstance = useAxiosSecure();

    
    const { data: recipient, refetch, isError } = useQuery<Country[]>({
        queryKey: ['recipient'], 
        queryFn: async () => {
            const res = await axiosInstance.get(`/currency`);
            return res?.data?.data; 
        },
         
    });

    return { recipient, refetch,  isError };
};

export default useRecipient;
