'use client'
import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast'
import LoadingSpinner from '../LoaderSpinner';
import { useRouter } from 'next/navigation';

export interface TransactionPreparedTypes {
    id: string,
    amount: number,
    recipientsWalletNumber: string;
    senderCurrentBalance: number;
    transactionAfterBalance: number;
    walletType: string;
}
export interface TransferTypes {
    transferInfo: TransactionPreparedTypes | null;
    setWalletModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const WalletToWalletModalForm = ({ transferInfo, setWalletModalOpen }: TransferTypes) => {
    const [isLoading, setIsLoading] = useState(false);
    const passwordRef = React.createRef<HTMLInputElement>();
    const axiosInstance = useAxiosSecure();
    const router: any = useRouter();
    
    const handleSubmit = async () => {
        const password = {
            pinNumber: parseInt(passwordRef.current?.value as string)
        }
        try {
            setIsLoading(true)
            const res = await axiosInstance.post(`transaction/wallet-to-wallet/completed/${transferInfo?.id}`, password);
            if (res.status === 200) {
                toast.success("Transaction Successful");
                router.push(`/user/send-money/payment-confirmation?transactionId=${res?.data.data.transactionId}`);                  
                setWalletModalOpen(false);
            } else {
                toast.error("Transaction Failed");
            }
        } catch (err) {
            toast.error("Transaction Failed");
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={`transition-opacity duration-300 ease-in-out`}>
            <div className='mt-1 mb-2 space-y-1 font-semibold'>
                <h5 className="text-[10px]">Transfer Wallet: {transferInfo?.walletType}</h5>
                <h5 className="text-[10px]">Transfer Amount: {transferInfo?.amount}$</h5>
                <h5 className="text-[10px]">Recipients Wallet: {transferInfo?.recipientsWalletNumber}</h5>
            </div>
            <div className='flex flex-row'>
                <div className='border p-2'>
                    <h5 className="text-[10px]">Your Current Wallet Balance: </h5>
                    <h4 className="text-xs flex flex-row justify-end">{transferInfo?.senderCurrentBalance}$</h4>
                </div>
                <div className='border p-2'>
                    <h5 className="text-[10px]">Balance after Transaction: </h5>
                    <h4 className="text-xs flex flex-row justify-end">{transferInfo?.transactionAfterBalance}$</h4>
                </div>
            </div>
            <div className="w-full my-2">
                <label className="block mb-1 text-gray-600 font-bold text-[10px]">Confirm PIN*</label>
                <input
                    ref={passwordRef}
                    type="password"
                    name="confirmPIN"
                    className="w-full px-3 py-1 text-[10px] border border-gray-300 rounded focus:outline-none"
                    placeholder="Enter PIN....."
                />
                <span className='absolute right-10 mt-2'>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.59674 0L0.847251 0.785877L4.08961 4.16856L9.87373 10.2335L10.8676 11.2927L14.4033 15L15.1528 14.2141L11.9104 10.8144C14.1181 9.66757 15.5988 7.96555 15.6904 7.85877L16 7.5L15.6904 7.14123C15.5499 6.97679 12.2159 3.12642 8 3.12642C6.97963 3.12642 6.01629 3.36133 5.13238 3.70729L1.59674 0ZM8 4.21982C9.1222 4.21982 10.1833 4.55083 11.1283 5.00569C11.4644 5.5951 11.6497 6.26139 11.6497 6.9533C11.6497 7.94633 11.2831 8.85393 10.6884 9.53303L9.2057 7.97836C9.42363 7.6986 9.56416 7.34411 9.56416 6.9533C9.56416 6.04784 8.86354 5.31321 8 5.31321C7.62729 5.31321 7.28921 5.46056 7.0224 5.68907L5.96334 4.57859C6.611 4.36931 7.28921 4.21982 8 4.21982ZM3.1446 4.71526C1.47251 5.79371 0.386966 7.0494 0.309572 7.14123L0 7.5L0.309572 7.85877C0.443992 8.0168 3.53157 11.5597 7.5112 11.8394C7.6721 11.8565 7.83503 11.8736 8 11.8736C8.16497 11.8736 8.3279 11.8565 8.4888 11.8394C8.91853 11.8095 9.33809 11.7497 9.74338 11.6515L8.81466 10.6777C8.5499 10.7417 8.28106 10.7802 8 10.7802C5.98778 10.7802 4.35031 9.06321 4.35031 6.9533C4.35031 6.66287 4.38697 6.37884 4.44807 6.09909L3.1446 4.71526ZM3.43788 5.82574C3.35438 6.19519 3.30754 6.57104 3.30754 6.9533C3.30754 7.90362 3.56212 8.77919 4.00815 9.53303C2.81466 8.81549 1.90224 7.97409 1.43381 7.5C1.82281 7.10493 2.52342 6.44932 3.43788 5.82574ZM12.5621 5.82574C13.4766 6.44932 14.1752 7.10493 14.5662 7.5C14.0978 7.97409 13.1711 8.83257 11.9756 9.55011C12.4236 8.79627 12.6925 7.90362 12.6925 6.9533C12.6925 6.57104 12.6456 6.19305 12.5621 5.82574Z" fill="#4B4B4B" />
                    </svg>
                </span>
            </div>
            <button onClick={handleSubmit} className="bg-[#723EEB] text-white w-full text-max px-4 py-1 text-xs rounded transition-all duration-300 ease-in-out hover:bg-[#5c31c0]">
                {
                    isLoading ? <LoadingSpinner className='h-4 w-4'/> : 'Confirm'
                }
            </button>
        </div>
    );
};

export default WalletToWalletModalForm;