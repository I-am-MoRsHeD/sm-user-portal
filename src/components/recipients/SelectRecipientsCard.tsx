"use client"
import { GoDotFill } from "react-icons/go";
// import { recipientsData } from "../../utils/data/recipientsData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRecipients from "../hooks/useRecipients";
import RecipientsTable from "./RecipientsTable";


type OpenStateType = {
    [key: number]: boolean;
};


const RecipientsCards = () => {
    const [open, setOpen] = useState<OpenStateType>({});
    const [select, setSelect] = useState<OpenStateType>({});
    const [selectID, setSelectID] = useState('');
    const [recipients, isPending] = useRecipients();
    const axiosInstance = useAxiosSecure();
    const queryClient = useQueryClient();

    const id = useSearchParams().get('id');
    //Add recipient
    const { data, isSuccess, isPending: isAddRecipientPending, isError, mutate } = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post(`/transaction/wallet-to-bank/add-recipient/${id}`, {
                "recipientId": selectID
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['add-recipient'] })
        },
    });



    const toggleCard = (id: number) => {
        setOpen(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleSelect = (id: number) => {
        setSelectID(id.toString());
        setSelect(prevState => ({
            // ...prevState,
            [id]: !prevState[id]
        }));
    }

    const handleAddRecipient = () => {
        mutate();
    }


    useEffect(() => {
        if (isError) {
            toast.error('Add recipient Error');
        }
        if (isSuccess) {
            toast.success('Recipient added successfully');
            redirect(`/user/send-money/wallet-payment-confirmation-card?id=${id}`);
        }
    }, [isSuccess, isError, id]);

    return (
        <>
            {
                recipients.map((data: any) => (
                    <div key={data.id} className={`${select[data.recipientId] ? 'bg-[#abd2e9]' : 'bg-white'} px-2 py-2 lg:px-6 lg:py-4 mb-5 rounded-2xl cursor-pointer ${open[data.id] ? ' shadow-md shadow-neutral-400' : ''}`}>
                        <div className="flex flex-row justify-between items-center w-full">
                            <div onClick={() => toggleCard(data.id)} className="flex flex-row gap-3 lg:gap-4 items-start w-[85%]">
                                <div className="bg-gray-200 rounded-[50%] w-6 lg:w-9 h-6 lg:h-9 flex justify-center items-center hover:bg-[#723EEB] hover:stroke-white">
                                    {/* {data.icon} */}
                                </div>
                                <div className="lg:w-36 w-24">
                                    <h3 className="text-[10px] lg:text-base font-bold">{data.fullName}</h3>
                                    <div>
                                        <p className="text-[10px] -ml-[2px]"> <GoDotFill className="text-[#FF9F43] inline-block items-center -mr-1" /> Bank transfer</p>
                                    </div>
                                </div>
                                <div className="">
                                    <h3 className="text-[10px] lg:text-base font-semibold text-[#723EEB]">ID: {data.recipientId}</h3>
                                </div>
                            </div>
                            <div onClick={() => handleSelect(data.id)} className="flex flex-row justify-end gap-2 w-[15%]">
                                <button className="text-xs bg-[#723EEB] text-white w-24 p-1.5 rounded font-semibold">{select[data.id] ? 'Selected' : 'Select'}</button>
                            </div>
                        </div>
                        <div className={`grid transition-all duration-500 ease-in-out  ${open[data.id] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className='overflow-hidden flex flex-col'>
                                <RecipientsTable data={data} />
                            </div>
                        </div >
                    </div>
                ))
            }
            <div className='w-[50%] lg:w-[100%]'>
                <button onClick={() => handleAddRecipient()} className="text-sm bg-[#723EEB] text-white w-full p-2.5 rounded-xl font-semibold">Next</button>
            </div>
        </>
    );
};

export default RecipientsCards;