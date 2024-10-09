import React, { useState } from 'react';
import ForgetPINModal from '../common/ForgetPINModal/ForgetPINModal';
import { useForm } from 'react-hook-form';
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia';
import useMainWallet from '../hooks/useMainWallet';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../common/Loading/LoadingSpinner';
import toast from 'react-hot-toast';

interface ModalProps {
    handleForgetPIN: (value: any) => void;
}
interface FormData {
    amount: string;
    bank_accountNumber: string;
    transactionID: string;
    pin: number;
}
const DepositForm: React.FC<ModalProps> = ({ handleForgetPIN }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [pin, setPin] = useState(false);
    const [mainWallet, mainWalletRefetch] = useMainWallet();
    const axiosInstance = useAxiosSecure();

    const onSubmit = async (data: any) => {
        setLoading(true);
        const depositInfo = {
            amount: data.amount,
            bankDetails: data.bank_accountNumber,
            transactionId: data.transactionID,
            walletId: mainWallet?.id,
            walletNumber: mainWallet?.walletId,
            pinNumber: parseInt(data.pin),
        };
        try {
            const res = await axiosInstance.post('/wallet/create-deposit', depositInfo);
            console.log(res);
            if (res.status === 200) {
                reset();
                mainWalletRefetch();
                toast.success(`${res?.data?.message}`);
            }
        } catch (error: any) {
            if (error) {
                toast.error("There is something wrong");
            }
        }
        setLoading(false);
    }

    return (
        <div>
            {/* balance */}
            <div className='my-1'>
                <h3 className="">Available Balance</h3>
            </div>
            <div className='mt-1 mb-5'>
                <h2 className="font-semibold">$ <span className='text-5xl'>{mainWallet?.balance}.0</span>USD</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                {/* Amount Field */}
                <div className="mb-3">
                    <label className="text-[14px]">Enter Your Amount</label>
                    <input
                        type="number"
                        {...register("amount", {
                            required: "Amount is required",
                        })}
                        className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-2xl focus:outline-none font-semibold text-[14px]`}
                        placeholder="Enter Amount Here....."
                    />
                    {errors.amount?.type === 'required' && (
                        <p className="text-red-500 text-xs">{errors.amount.message}</p>
                    )}
                </div>

                {/* Bank and Account number Field */}
                <div className="mb-3">
                    <label className="text-[14px]">Deposit Bank and Account Number</label>
                    <input
                        type="text"
                        {...register("bank_accountNumber", {
                            required: "Bank and Account Number is required",
                        })}
                        className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-2xl focus:outline-none font-semibold text-[14px]`}
                        placeholder="Asia Bank | 123032420234"
                    />
                    {errors.bank_accountNumber?.type === 'required' && (
                        <p className="text-red-500 text-xs">{errors.bank_accountNumber.message}</p>
                    )}
                </div>
                {/* Transaction ID Field */}
                <div className="mb-3">
                    <label className="text-[14px]">Enter Transaction ID</label>
                    <input
                        type="text"
                        {...register("transactionID", {
                            required: "Transaction ID is required",
                        })}
                        className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-2xl focus:outline-none font-semibold text-[14px]`}
                        placeholder="Enter Transaction ID....."
                    />
                    {errors.transactionID?.type === 'required' && (
                        <p className="text-red-500 text-xs">{errors.transactionID.message}</p>
                    )}
                </div>
                {/* Pin Field */}
                <div className="mb-3">
                    <label className="text-[14px]">Enter Your PIN</label>
                    <div className="relative">
                        <input
                            type={'number'}
                            {...register("pin", {
                                required: "Pin is required",
                                minLength: 4,
                            })}
                            className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-2xl focus:outline-none font-semibold text-[14px]`}
                            placeholder="Enter PIN...."
                        />
                        <button
                            type="button"
                            onClick={() => setPin(!pin)}
                            className="absolute top-2.5 right-4 text-[11px]"
                        >
                            {pin ? <LiaEyeSolid className='text-base' /> : <LiaEyeSlashSolid className='text-base' />}
                        </button>
                    </div>

                    {errors.pin?.type === 'required' && (
                        <p className="text-red-500 text-xs">Pin is required</p>
                    )}
                    {errors.pin?.type === 'minLength' && (
                        <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
                    )}
                </div>
                <div className='flex flex-row justify-end'>
                    <button
                        onClick={() => handleForgetPIN(mainWallet)}
                        className='text-[#723EEB] text-right  text-xs pt-1'>
                        Forget PIN?
                    </button>
                </div>
                {/* Deposit */}
                <div className="w-full mx-auto pb-5">
                    <button
                        type="submit"
                        className="mt-1 w-full bg-[#3eae50] text-white p-2 rounded text-[10px]"
                    >
                        {loading ? <LoadingSpinner className='h-4 w-4' /> : 'I Have Made Deposit'}
                        {/* I Have Made Deposit */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DepositForm;