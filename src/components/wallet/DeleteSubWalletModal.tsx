'use client'
import React, { useState } from 'react';
import { Close } from '../icons/Icon';
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../common/Loading/LoadingSpinner';
import useNavigationContext from '../NavigationContext/useNavigationContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useSubWallets from '../hooks/useSubWallets';

interface ModalProps {
    isDeleteSubWalletModalOpen: boolean;
    setDeleteSubWalletModalOpen: (value: boolean) => void;
    title?: string;
    disableCloseButton?: boolean;
}
interface FormData {
    confirmPin: number;
};

const DeleteSubWalletModal: React.FC<ModalProps> = ({ isDeleteSubWalletModalOpen, title, disableCloseButton, setDeleteSubWalletModalOpen }) => {
    const [showPin, setShowPin] = useState(false);
    const [loading, setLoading] = useState(false);
    const { subWalletData }: any = useNavigationContext();
    const [, refetch] = useSubWallets();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const axiosInstance = useAxiosSecure();

    const handleCloseModal = () => setDeleteSubWalletModalOpen(false);

    const onSubmit = async (data: any) => {
        const pin = {
            pinNumber: Number(data.confirmPin)
        } as any;
        setLoading(true);
        console.log(pin);
        try {
            const res = await axiosInstance.post(`/wallet/delete-wallet/${subWalletData?.id}`, pin);
            console.log(res);
            if (res.status === 200) {
                toast.success('Wallet deleted successfully');
                refetch();
            }
        } catch (error: any) {
            if (error) {
                toast.error('There is something error');
            }
        }
        setLoading(false);
        reset();
    };

    return (
        <div>
            <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[999] ${isDeleteSubWalletModalOpen ? 'opacity-1 visible' : 'invisible opacity-0'}`}>
                <div className={`bg-white rounded-xl shadow-lg overflow-hidden w-[95%] lg:max-w-lg max-h-[96vh] lg:w-full overflow-y-auto transition-transform transform ease-in-out duration-500 ${isDeleteSubWalletModalOpen ? 'opacity-1 translate-y-0 ' : '-translate-y-20 opacity-0'}`}>
                    <div className="flex justify-between items-center px-6 pt-6 pb-2">
                        <h3 className="text-lg font-semibold dark:text-max">{title}</h3>
                        <div
                            style={{ display: disableCloseButton ? 'none' : 'flex' }}
                            onClick={handleCloseModal} className='bg-[#723EEB] w-6 h-6 flex justify-center items-center text-white rounded cursor-pointer'>
                            <div
                                className="text-3xl"
                            >
                                <Close />
                            </div>
                        </div>
                    </div>
                    <div className="px-6 ">
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 w-full mx-auto'>
                            <h1 className=" text-sm">Want to Delete this Wallet?</h1>

                            {/* Confirm New Pin Field */}
                            <div className="w-full relative text-xs">
                                <label className="">Confirm PIN*</label>
                                <div className="relative">
                                    <input
                                        type={'number'}
                                        {...register("confirmPin", {
                                            required: "Pin is required",
                                            minLength: 4,
                                        })}
                                        className={`mt-1 w-full px-3 py-2  border border-gray-400 rounded-[10px] focus:outline-none`}
                                        placeholder="Type Here...."
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPin(!showPin)}
                                        className="absolute top-3 right-4 text-[11px]"
                                    >
                                        {showPin ? <LiaEyeSolid className='text-base' /> : <LiaEyeSlashSolid className='text-base' />}
                                    </button>
                                </div>

                                {errors.confirmPin?.type === 'required' && (
                                    <p className="text-red-500 text-xs">Pin is required</p>
                                )}
                                {errors.confirmPin?.type === 'minLength' && (
                                    <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
                                )}
                            </div>

                            <div className="w-4/5 mx-auto pb-4">
                                <button
                                    type="submit"
                                    className="w-full bg-[#ea5455] text-white p-2 rounded text-[10px]">

                                    {loading ? <LoadingSpinner className='h-4 w-4' /> : 'Confirm'}

                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteSubWalletModal;