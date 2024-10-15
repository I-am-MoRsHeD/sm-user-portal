import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import LoadingSpinner from '../common/Loading/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useCurrency from '../hooks/useCurrency';
import useMainWallet from '../hooks/useMainWallet';
import useSubWallets from '../hooks/useSubWallets';

interface FormData {
    walletName: string;
    email: string;
    currency: string;
    securityQuestion: string;
    answer: string;
    newPin: number;
}
type DropdownProps = {
    label: string;
    options: { name: string; value: string; }[];
    selectedValue: string;
    setSelectedValue: (value: string) => void;
};

// Reusable Dropdown component
const Dropdown: React.FC<DropdownProps> = ({ label, options, selectedValue, setSelectedValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options?.find(option => option.value === selectedValue);

    return (
        <div className="relative w-full text-[10px] sm:text-sm">
            <label className="block mb-1 text-gray-600 font-semibold">{label}</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="mx-auto flex w-full items-center justify-between rounded-xl px-3 py-0.5 border border-gray-400 cursor-pointer"
            >
                <h1 className="font-medium">{selectedOption ? selectedOption.name : 'select'}</h1>
                <svg className={`${isOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
            </div>

            <div className={`${isOpen ? 'visible top-12 bg-white opacity-100' : 'invisible -top-4 opacity-0'} absolute mx-auto my-4 w-full z-50 rounded-xl py-4 border duration-300`}>
                {options?.map((option, idx) => (
                    <div
                        key={idx}
                        onClick={() => {
                            setSelectedValue(option.value);
                            setIsOpen(false);
                        }}
                        className="px-6 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
                    >
                        {option.name}
                    </div>
                ))}
            </div>

        </div>
    );
};

const securityQuestionOptions = [
    {
        name: 'What is your favourite hobby?',
        value: 'What is your favourite hobby?',
    },
    {
        name: 'In which city were you born?',
        value: 'In which city were you born?',
    },
    {
        name: 'What was your childhood nickname?',
        value: 'What was your childhood nickname?',
    },
    {
        name: 'What is your favorite sports team?',
        value: 'What is your favorite sports team?',
    },
];

const CreateNewWalletForm = () => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currency] = useCurrency();
    const [securityQuestion, setSecurityQuestion] = useState(securityQuestionOptions[0].value);
    const [currencyValue, setCurrencyValue] = useState();
    const [mainWallet] = useMainWallet();
    const [, refetch] = useSubWallets();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [pin, setPin] = useState(false);
    const axiosInstance = useAxiosSecure();


    const onSubmit = async (data: any) => {
        const currencyId = await currency.filter((c: any) => c.name === currencyValue);
        setLoading(true);
        try {
            if (!mainWallet?.userId) {
                const walletInfo = {
                    currencyId: currencyId[0]?.id,
                    category: 'PRIMARY',
                    walletEmail: data?.email,
                    walletName: data?.walletName,
                    securityQuestion: securityQuestion,
                    answer: data?.answer,
                    pinNumber: parseInt(data?.newPin)
                };
                const res = await axiosInstance.post('/wallet/create-wallet', walletInfo)
                if (res.status === 200) {
                    setLoading(false);
                    reset();
                    toast.success('Wallet has been created successfully');
                }
            } else {
                const walletInfo = {
                    currencyId: currencyId[0]?.id,
                    category: 'SECONDARY',
                    walletEmail: data?.email,
                    walletName: data?.walletName,
                    securityQuestion: securityQuestion,
                    answer: data?.answer,
                    pinNumber: parseInt(data?.newPin)
                };

                const res = await axiosInstance.post('/wallet/create-wallet', walletInfo);

                if (res.status === 200) {
                    setLoading(false);
                    refetch();
                    reset();
                    toast.success('Sub Wallet has been created successfully');
                }
            };
        } catch (error: any) {
            if (error) {
                toast.error("There is something wrong");
                setLoading(false);
            }
        }
    }

    return (
        <>
            <form className='text-[10px] sm:text-sm' onSubmit={handleSubmit(onSubmit)}>
                <h3 className="font-semibold pb-3 text-base">Create {mainWallet ? 'New' : 'New Sub'} Wallet</h3>
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
                    <label className="text-gray-600 font-semibold">Email</label>
                    <input
                        type="email"
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
                {/* <div className="mb-3 mt-1 w-full">
                    <label className="text-gray-600  font-semibold">Select Currency*</label>
                    <select
                        className="mt-1 w-full px-3 py-[5px] border border-gray-400 rounded-[10px] cursor-pointer focus:outline-none placeholder:text-xs"
                        {...register("currency", {
                            required: 'Please select a currency'
                        })}
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
                </div> */}
                <div className='mb-3'>
                    <div className="relative w-full text-[10px] sm:text-sm">
                        <label className="block mb-1 text-gray-600 font-semibold">Select Currency</label>
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="mx-auto flex w-full items-center justify-between rounded-xl px-3 py-0.5 border border-gray-400 cursor-pointer"
                        >
                            <h1 className="font-medium">{currencyValue ? currencyValue : 'select'}</h1>
                            <svg className={`${isOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
                        </div>

                        <div className={`${isOpen ? 'visible top-12 bg-white opacity-100' : 'invisible -top-4 opacity-0'} absolute mx-auto my-4 w-full z-50 rounded-xl py-4 border duration-300`}>
                            {currency?.map((data: any) => (
                                <div
                                    key={data?.id}
                                    onClick={() => {
                                        setCurrencyValue(data?.name);
                                        setIsOpen(false);
                                    }}
                                    className="px-6 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
                                >
                                    {data?.name}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                {/* security question Field */}
                <div className='mb-2'>
                    <Dropdown
                        label="Select a Security Question"
                        options={securityQuestionOptions}
                        selectedValue={securityQuestion}
                        setSelectedValue={setSecurityQuestion}
                    />
                </div>
                {/* <div className="mb-3">
                    <label className="text-gray-600 font-semibold">Enter a Security Question</label>
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
                </div> */}
                {/* Answer Field */}
                <div className="mb-3">
                    <label className="text-gray-600 font-semibold">Answer</label>
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
                    <label className="text-gray-600 font-semibold">Create New PIN</label>
                    <div className="relative">
                        <input
                            type={pin ? 'text' : 'password'}
                            {...register("newPin", {
                                required: "Pin is required",
                                minLength: 4,
                                pattern: /^[0-9]*$/
                            })}
                            className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-[10px] focus:outline-none placeholder:text-xs`}
                            placeholder="Enter PIN...."
                        />
                        <button
                            type="button"
                            onClick={() => setPin(!pin)}
                            className="absolute top-3 right-4 text-[14px]"
                        >
                            {pin ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    {errors.newPin?.type === 'required' && (
                        <p className="text-red-500 text-xs">Pin is required</p>
                    )}

                    {errors.newPin?.type === 'pattern' && (
                        <p className="text-red-500 text-xs">Pin must be a number</p>
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