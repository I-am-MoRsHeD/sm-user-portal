import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useCurrency from '../hooks/useCurrency';
import useMainWallet from '../hooks/useMainWallet';
import useSubWallets from '../hooks/useSubWallets';
import LoadingSpinner from '../common/Loading/LoadingSpinner';
import Swal from 'sweetalert2';

interface FormData {
    walletName: string;
    email: string;
    currency: string;
    securityQuestion: string;
    answer: string;
    newPin: number;
}

const CreateNewWalletForm = () => {
    const [loading, setLoading] =  useState(false);
    const [currency] = useCurrency();
    const [mainWallet] = useMainWallet();
    const [, refetch] = useSubWallets();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [pin, setPin] = useState(false);
    const axiosInstance = useAxiosSecure();


    const onSubmit = async (data: any) => {
        const currencyId = await currency.filter((c: any) => c.name === data.currency);
        setLoading(true);
        try {
            if (!mainWallet?.userId) {
                const walletInfo = {
                    currencyId: currencyId[0]?.id,
                    category: 'PRIMARY',
                    walletEmail: data?.email,
                    walletName: data?.walletName,
                    securityQuestion: data?.securityQuestion,
                    answer: data?.answer,
                    pinNumber: parseInt(data?.newPin)
                };
                const res = await axiosInstance.post('/wallet/create-wallet', walletInfo)
                if (res.status === 200) {
                    setLoading(false);
                    reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Wallet created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // toast('Wallet has been created successfully');
                }
            } else {
                const walletInfo = {
                    currencyId: currencyId[0]?.id,
                    category: 'SECONDARY',
                    walletEmail: data?.email,
                    walletName: data?.walletName,
                    securityQuestion: data?.securityQuestion,
                    answer: data?.answer,
                    pinNumber: parseInt(data?.newPin)
                };
                const res = await axiosInstance.post('/wallet/create-wallet', walletInfo);
                console.log(res);
                if (res.status === 200) {
                    setLoading(false);
                    refetch();
                    reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Wallet created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // toast('Sub Wallet has been created successfully');
                }
            };
        } catch (error: any) {
            if (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "There is something wrong",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <>
            <form className='text-[10px] sm:text-sm' onSubmit={handleSubmit(onSubmit)}>
                <h3 className="font-semibold pb-3 text-base">Create New Wallet</h3>
                {/* wallet name Field */}
                <div className="mb-3">
                    <label className="text-gray-600  font-semibold">Wallet Name</label>
                    <input
                        type="text"
                        {...register("walletName", {
                            required: "Wallet Name is required",
                        })}
                        className={`mt-1 w-full px-3 py-1  border border-gray-400 rounded-[10px] focus:outline-none placeholder:text-xs`}
                        placeholder="Enter Wallet Name....."
                    />
                    {errors.walletName?.type === 'required' && (
                        <p className="text-red-500 text-xs">Wallet name is required</p>
                    )}
                </div>
                {/* Email Field */}
                <div className="mb-3">
                    <label className="text-gray-600  font-semibold">Email</label>
                    <input
                        type="text"
                        {...register("email", {
                            required: "Email is required",
                        })}
                        className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-[10px] focus:outline-none placeholder:text-xs`}
                        placeholder="Enter Wallet Email....."
                    />
                    {errors.email?.type === 'required' && (
                        <p className="text-red-500 text-xs">Email is required</p>
                    )}
                </div>
                {/* currency */}
                <div className="mb-3 mt-1 w-full">
                    <label className="text-gray-600  font-semibold">Select Currency*</label>
                    <select
                        className="mt-1 w-full px-3 py-[5px] border border-gray-400 rounded-[10px] cursor-pointer focus:outline-none placeholder:text-xs"
                        {...register("currency", {
                            required: 'Please select a currency'
                        })}
                    // value={filter}
                    >
                        {currency?.map((data: any) => (
                            <option className='text-xs' value={data?.name} key={data._id}>
                                {data?.name}
                            </option>
                        ))}
                    </select>
                    {errors.currency?.type === 'required' && (
                        <p className="text-red-500 text-xs">Currency is required</p>
                    )}
                </div>
                {/* security question Field */}
                <div className="mb-3">
                    <label className="text-gray-600   font-semibold">Enter a Security Question</label>
                    <input
                        type="text"
                        {...register("securityQuestion", {
                            required: "Security Question is required",
                        })}
                        className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-[10px] focus:outline-none placeholder:text-xs`}
                        placeholder="Enter a Security Question....."
                    />
                    {errors.securityQuestion?.type === 'required' && (
                        <p className="text-red-500 text-xs">Security Question is required</p>
                    )}
                </div>
                {/* Answer Field */}
                <div className="mb-3">
                    <label className="text-gray-600  font-semibold">Answer</label>
                    <input
                        type="text"
                        {...register("answer", {
                            required: "Answer is required",
                        })}
                        className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-[10px] focus:outline-none placeholder:text-xs`}
                        placeholder="Enter Answer....."
                    />
                    {errors.answer?.type === 'required' && (
                        <p className="text-red-500 text-xs">Answer is required</p>
                    )}
                </div>
                {/* Pin Field */}
                <div className="mb-3">
                    <label className="text-gray-600   font-semibold">Create New PIN</label>
                    <div className="relative">
                        <input
                            type={'number'}
                            {...register("newPin", {
                                required: "Pin is required",
                                minLength: 4,
                            })}
                            className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-[10px] focus:outline-none placeholder:text-xs`}
                            placeholder="Enter PIN...."
                        />
                        <button
                            type="button"
                            onClick={() => setPin(!pin)}
                            className="absolute top-2.5 right-4 text-[11px]"
                        >
                            {pin ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    {errors.newPin?.type === 'required' && (
                        <p className="text-red-500 text-xs">Pin is required</p>
                    )}
                    {errors.newPin?.type === 'minLength' && (
                        <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
                    )}
                </div>

                {/* create now Button */}
                <div className="w-full mx-auto mt-3 ">
                    <button
                        type="submit"
                        className="mt-1 w-full bg-[#723EEB] text-white cursor-pointer px-1 py-[6px] rounded text-[10px] sm:text-sm"
                    >
                        {
                            loading ? <LoadingSpinner className='h-4 w-4' /> : 'Create Now'
                        }

                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateNewWalletForm;