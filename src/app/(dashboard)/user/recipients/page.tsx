'use client'
import Link from 'next/link';
// import RecipientsCards from '../../components/recipients/RecipientsCards';
import Topbar from '@/components/Topbar';
import useRecipients from '@/components/hooks/useRecipients';
import RecipientsCards from '@/components/recipients/RecipientsCards';
import { useEffect, useState } from 'react';


const RecipientsPage = () => {
    const [recipientsData, setRecipientsData] = useState([]);
    const [searchId, setSearchId] = useState('');

    const [recipients, refetch, isPending, isLoading] = useRecipients();


    useEffect(() => {
        if (recipients) {
            setRecipientsData(recipients);
        }
    }, [recipients]);

    const handleSearch = (ID: string) => {

        const searchResult = recipients?.filter((recipient: any) => recipient?.recipientId?.includes(ID));
        if (searchResult.length > 0) {
            setRecipientsData(searchResult);
        } else {
            setRecipientsData([]);
        }
    }

    return (
        <div>
            <Topbar>Recipients</Topbar>
            <div className='max-h-auto min-h-[90vh] '>
                <div className='mt-1 mb-3 flex flex-row justify-between items-center'>
                    {/* Search Existing Recipient */}
                    <div className="flex flex-row gap-3 items-end lg:w-1/2 mb-6">
                        <div className="lg:w-1/2">
                            <label className="block mb-3 font-medium">Search Existing Recipient</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    handleSearch(e.target.value)
                                }
                                }
                                className="w-full px-3 py-0.5 border rounded-2xl border-gray-300 outline-none"
                                placeholder="Enter ID ..."
                            />
                        </div>
                        <div className="w-1/2">
                            <button className="bg-[#723EEB] w-full px-4 py-1 rounded-2xl text-sm text-white">
                                Search
                            </button>
                        </div>
                    </div>
                    <Link href={"/user/recipients/create-recipient"} className='w-[50%] lg:w-[20%]'>
                        <button className="text-xs bg-[#723EEB] text-white w-full p-1.5 rounded-2xl font-semibold">+Add New Recipient</button>
                    </Link>
                </div>
                <RecipientsCards recipientsData={recipientsData} isLoading={isLoading} refetch={refetch} />
            </div>
        </div>
    );
};

export default RecipientsPage;