'use client'
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import SendMoneyCard from '@/components/common/SendMoneyCard/SendMoneyCard';
import TopBar from '@/components/Topbar';
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import useAxiosSecure from '@/components/hooks/useAxiosSecure';
import SendMoneyModal from '@/components/common/sendMoneyModal/SendMoneyModal';
import WalletToWalletModalForm, { TransactionPreparedTypes } from '@/components/send-money/WalletToWalletModalForm';
import TransferOptionSelect from '@/components/common/SendMoneyCard/TransferOptionSelect';
import WalletOptionSelect from '@/components/common/SendMoneyCard/WalletOptionSelect';
import LoaderSpinner from '@/components/LoaderSpinner';

const WalletToWalletpage = () => {
    const [walletModalOpen, setWalletModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [transactionPreparedData, setTransactionPreparedData] = useState<TransactionPreparedTypes | null>(null);
    const { register, control, handleSubmit, formState: { errors } } = useForm<any>();
    const axiosInstance = useAxiosSecure();

    const handleCloseModal = () => {
        setWalletModalOpen(false);
    };

    const onSubmit = async (data: any) => {
        const walletInfo = {
            transactionType: data?.transactionType?.value,
            walletType: data?.walletType.value.category,
            amount: parseInt(data?.sendingAmount),
            recipientsWalletNumber: data.walletNumber,
            walletId: data?.walletType?.value.id
        }
        
        try {
            setLoading(true)
            const res = await axiosInstance.post('/transaction/wallet-to-wallet/initiate-transaction', walletInfo);
            if (res.status === 200) {
                const preparedRes = await axiosInstance.get(`/transaction/wallet-to-wallet/prepared/${res.data.data.id}`);
                setTransactionPreparedData(preparedRes.data.data);
                setWalletModalOpen(true);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
  
    }

    return (
        <div className='min-h-screen max-h-auto'>
            <TopBar>Send Money</TopBar>
            <CardSubTitle title='Send Money' />
            <div>
                <SendMoneyCard title='Wallet To Wallet Transfer'>
                    {/* form */}
                    <form onSubmit={handleSubmit(onSubmit)} className='w-[95%] lg:w-[45%] mx-auto mt-5'>
                        <div className="w-full text-xs mb-[14px]">
                            <label className="block mb-2 font-semibold">Select Transfer Type</label>
                            <TransferOptionSelect control={control} />
                        </div>
                        <div className="w-full text-xs mb-3">
                            <label className="block mb-2 font-semibold">Select Sending Wallet</label>
                            <WalletOptionSelect control={control}/>
                        </div>
                        {/* <h3 className="text-red-600 text-xs">Your Transferring Currency is USD $</h3> */}
                        {/* Sending amount Field */}
                        <div className="mb-3">
                            <label className="font-semibold text-xs">Sending Amount</label>
                            <input
                                type="number"
                                {...register("sendingAmount", {
                                    required: "Amount is required",
                                })}
                                className={`w-full mt-[7px] px-3 py-2 text-xs border rounded-[10px] focus:outline-none`}
                                placeholder="EType Amount....."
                            />
                            {errors.sendingAmount?.type === 'required' && (
                                <p className="text-red-500 text-xs ml-1 mt-1">Amount is required</p>
                            )}
                        </div>
                        {/* Wallet Number Field */}
                        <div className="mb-3">
                            <label className="font-semibold text-xs mb-2">Recipients Wallet Number</label>
                            <input
                                type="number"
                                {...register("walletNumber", {
                                    required: "Wallet Number is required",
                                })}
                                className={`w-full mt-[7px] px-3 py-2 text-xs border rounded-[10px] focus:outline-none`}
                                placeholder="Type Wallet Number....."
                            />
                            {errors.walletNumber?.type === 'required' && (
                                <p className="text-red-500 text-xs ml-1 mt-1">Wallet Number is required</p>
                            )}
                        </div>
                        <div className="mt-2">
                            <button
                                type="submit"
                                className="font-semibold text-white text-xs lg:text-xs p-1 lg:p-2 rounded-full bg-[#723EEB] w-full"
                            >
                                {
                                    loading
                                        ? <LoaderSpinner className='h-4 w-4'/>
                                        : "Send"
                                }
                            </button>
                        </div>
                    </form>
                </SendMoneyCard>
            </div>
            <SendMoneyModal
                isOpen={walletModalOpen}
                onClose={handleCloseModal}
                title='Wallet To Wallet'>
                <WalletToWalletModalForm
                    setWalletModalOpen={setWalletModalOpen}
                transferInfo={transactionPreparedData} />
            </SendMoneyModal>
        </div>
    );
};

export default WalletToWalletpage;

