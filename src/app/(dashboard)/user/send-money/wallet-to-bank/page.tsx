'use client'
import LoadingSpin from '@/components/2fa-security/LoadingSpin';
import Topbar from '@/components/Topbar';
import SendMoneyCard from '@/components/common/SendMoneyCard/SendMoneyCard';
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import SendMoneyModal from '@/components/common/sendMoneyModal/SendMoneyModal';
import useAxiosSecure from '@/components/hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


type CurrencyOption = {
  code: string;
  name: string;
  icon: string;
};

type DropdownProps = {
  label: string;
  options: { name: string; value: string; }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
};

type CurrencyDropdownProps = {
  label: string;
  options: { name: string; value: any; }[];
  selectedValue: any;
  setSelectedValue: (value: any) => void;
};



// Reusable Dropdown component
const Dropdown: React.FC<DropdownProps> = ({ label, options, selectedValue, setSelectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options?.find(option => option.value === selectedValue);

  return (
    <div className="relative w-full text-xs">
      <label className="block mb-2 font-semibold">{label}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="mx-auto flex w-full items-center justify-between rounded-xl px-3 py-1 border cursor-pointer"
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

// Currency Dropdown component
const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({ label, options, selectedValue, setSelectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options?.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full text-xs">
      <label className="block mb-2 font-semibold">{label}</label>
      <div className="border rounded-xl flex">
        <div className="mx-auto flex w-full items-center justify-between px-3 py-1 cursor-pointer bg-gray-200 rounded-l-xl">
          {selectedValue && (
            <div className="relative w-5 h-5 mr-2">
              <Image
                src={`/flags/${''}`}
                alt={`${selectedValue?.name} flag`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          )}
          <h1 className="font-medium">{selectedValue ? selectedValue.name : `Choose ${label}`}</h1>
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="mx-auto flex items-center justify-center px-3 py-2 cursor-pointer bg-[#723EEB] rounded-r-xl text-white w-24">
          <h1 className="font-medium">{selectedValue ? selectedValue.code : ''}</h1>
          <svg
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 10L12 15L17 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-l-xl rounded-r-xl shadow-lg">
          <div className="p-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search currency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 px-3 py-2 text-xs border rounded-l-xl rounded-r-xl pr-10 focus:outline-none focus:ring-1 focus:ring-[#723EEB]"
              />
              <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option) => (
              <div
                key={option?.name}
                onClick={() => {
                  setSelectedValue(option?.value);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="relative w-5 h-5 mr-3">
                  <Image
                    src={`/flags/${''}`}
                    alt={`${option?.name} flag`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <span className="text-xs">{option.name}</span>
                <span className="ml-auto text-xs text-gray-500">{option?.value?.code}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const WalletToBankPage: React.FC = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxiosSecure();
  const router = useRouter();

  const transferOptions = [{
    name: 'Wallet to Wallet',
    value: 'WALLET_TO_WALLET',
  }, {
    name: 'Wallet to Bank',
    value: 'WALLET_TO_BANK',
  }, {
    name: 'Bank to Bank',
    value: 'BANK_TO_BANK',
  }];

  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [transferType, setTransferType] = useState(transferOptions[1].value);
  const [wallet, setWallet] = useState({} as any);
  const [walletOptions, setWalletOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [sendingCurrency, setSendingCurrency] = useState({} as any);
  const [receivingCurrency, setReceivingCurrency] = useState({} as any);
  const [sendingAmount, setSendingAmount] = useState('');




  // fetching data from the server

  const { data: userWalletData, isError: isUserWalletError, isLoading } = useQuery({
    queryKey: ['user-wallet'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/wallet/user-wallets`);
      return res?.data?.data;
    },
  });
  const { data: currencyData, isError: isGetCurrencyError, isLoading: currencyLoading } = useQuery({
    queryKey: ['currency'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/currency`);
      return res?.data?.data;
    },
  });

  //Initiate Transaction
  const { data: transactionPostData, isSuccess: isTransactionSuccess, isPending: isTransactionPending, isError: transactionError, mutate: initiateTransactionMutate } = useMutation({
    mutationFn: async (value: {}) => {
      const response = await axiosInstance.post(`/transaction/wallet-to-bank/initiate-transaction`, value);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transaction'] })
    },
  });


  // wallet options
  useEffect(() => {
    const options = userWalletData?.map((item: any) => {
      return {
        value: {
          ...item
        },
        name: item?.category === 'PRIMARY' ? `Main: ${item?.walletName}` : `Sub: ${item?.walletName}`
      }
    })
    setWalletOptions(options);
  }, [userWalletData]);

  // currency options
  useEffect(() => {
    const options = currencyData?.map((item: any) => {
      return {
        value: {
          ...item
        },
        name: item?.name
      }
    })
    setCurrencyOptions(options);
  }, [currencyData]);


  // handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const newTransfer = {
      // "transactionType": transferType,
      "transactionType": "WALLET_TO_BANK",
      "walletType": wallet?.category,
      "amount": parseFloat(sendingAmount),
      "walletId": wallet?.id,
      "sendingCurrencyId": sendingCurrency?.id,
      "receivingCurrencyId": receivingCurrency?.id
    }
    initiateTransactionMutate(newTransfer);
  }




  useEffect(() => {
    if (isUserWalletError) {
      toast.error('Get User Wallet Error');
    }
    if (isGetCurrencyError) {
      toast.error('Get User Currency Error');
    }
    if (transactionError) {
      toast.error('Something went wrong posting transaction');
    }
    if (isTransactionSuccess) {
      toast.success('Transaction Initiated');
      redirect(`/user/recipients/select-recipients?id=${transactionPostData?.data?.id}`);
    }
  }, [isUserWalletError, isGetCurrencyError, transactionError, isTransactionSuccess, router, transactionPostData]);


  return (
    <form onSubmit={handleSubmit} className='min-h-screen max-h-auto'>
      <Topbar>Send Money</Topbar>
      {/* <main className="container mx-auto px-4 py-8"> */}
      <CardSubTitle title="Send Money" />
      <SendMoneyCard title="Wallet To Bank Transfer">
        <div className='w-[95%] lg:w-[45%] mx-auto space-y-5 mt-5'>
          <Dropdown
            label="Select Transfer Type"
            options={transferOptions}
            selectedValue={transferType}
            setSelectedValue={setTransferType}
          />
          <Dropdown
            label="Select Sending Wallet"
            options={walletOptions}
            selectedValue={wallet}
            setSelectedValue={setWallet}
          />
          <CurrencyDropdown
            label="Sending Currency"
            options={currencyOptions}
            selectedValue={sendingCurrency}
            setSelectedValue={setSendingCurrency}
          />
          <CurrencyDropdown
            label="Receiving Currency"
            options={currencyOptions}
            selectedValue={receivingCurrency}
            setSelectedValue={setReceivingCurrency}
          />
          <div className='w-full'>
            <label className="block mb-1 font-semibold text-xs">Sending Amount</label>
            <input
              type="number"
              value={sendingAmount}
              onChange={(e) => setSendingAmount(e.target.value)}
              className="w-full px-3 py-2 text-xs border rounded-[10px] focus:outline-none"
              placeholder="Type Amount....."
            />
          </div>
          <div className='flex flex-row justify-between items-center text-[10px]'>
            <h5 className="text-[#733ebc] font-semibold">Have a coupon code? </h5>
            <button
              onClick={() => setCouponModalOpen(true)}
              className='font-semibold text-white p-1 rounded-full bg-[#723EEB] w-14'
            >
              Apply
            </button>
          </div>
          {/* href="/user/recipients/select-recipients" */}
          <div className='w-full'>
            <button type='submit' className='font-semibold text-white text-xs lg:text-xs p-1 lg:p-2 mt-3 rounded-full bg-[#723EEB] w-full flex justify-center'>
              {/* isTransactionPending */}
              {
                isTransactionPending ?
                  <LoadingSpin height='1rem' width='1rem' borderWidth='0.25rem' color='#fff' /> : 'Choose Recipients'
              }
            </button>
          </div>
        </div>
      </SendMoneyCard>
      {/* </main> */}

      <SendMoneyModal
        isOpen={couponModalOpen}
        onClose={() => setCouponModalOpen(false)}
      >
        <div className='space-y-2'>
          <div className="w-full">
            <label className="block mb-1 font-semibold text-xs">Coupon Code</label>
            <input
              type="text"
              name="couponCode"
              className="w-full px-3 py-2 text-xs border rounded-[10px] focus:outline-none"
            />
          </div>
          <button
            className='font-semibold text-white text-xs lg:text-xs p-[2px] lg:p-1 rounded bg-[#723EEB] w-full'>
            Apply
          </button>
        </div>
      </SendMoneyModal>
    </form>
  );
};

export default WalletToBankPage;