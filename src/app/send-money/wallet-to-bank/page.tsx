'use client'
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import SendMoneyCard from '@/components/common/SendMoneyCard/SendMoneyCard';
import SendMoneyModal from '@/components/common/sendMoneyModal/SendMoneyModal';
import Topbar from '@/components/Topbar';
import Link from 'next/link';
import React, { useState } from 'react';

const WalletToBankpage = () => {
    const [couponModalOpen, setCouponModalOpen] = useState(false);

    const [transferIsOpen, setTransferIsOpen] = useState(false);
    const [transferSelectedValue, setTransferSelectedValue] = useState("Choose One");

    const [walletIsOpen, setWalletIsOpen] = useState(false);
    const [walletSelectedValue, setWalletSelectedValue] = useState("Choose One");

    const selectOptions = ['Wallet to Wallet', 'Wallet to Bank', 'Bank to Bank'];
    const walletOptions = ['Main Wallet', 'SUB: Indian', 'SUB: Nigerian', 'SUB: Canadian'];
    const countryNames = ['United States dollar', 'Canadian dollar', 'Nigerian nira', 'Indian rupee'];
    const currencyOptions = ['USD', 'CND', 'Nira', 'Rupee'];

    const [sendingCurrencyIsOpen, setSendingCurrencyIsOpen] = useState(false);
    const [sendingCountrySelectedValue, setSendingCountrySelectedValue] = useState('Choose Sending Currency');
    const [sendingCurrencySelectedValue, setSendingCurrencySelectedValue] = useState(currencyOptions[0]);

    const [receivingCurrencyIsOpen, setReceivingCurrencyIsOpen] = useState(false);
    const [ReceivingCountrySelectedValue, setReceivingCountrySelectedValue] = useState('Choose Sending Currency');
    const [receivingCurrencySelectedValue, setReceivingCurrencySelectedValue] = useState(currencyOptions[0]);


    const hanldeCouponModal = () => {
        setCouponModalOpen(true);
    }

    const handleCloseModal = () => {
        setCouponModalOpen(false);
    };

    return (
        <div className='min-h-screen max-h-auto'>
            <Topbar>Send Money</Topbar>
            <CardSubTitle title='Send Money' />
            <div>
                <SendMoneyCard title='Wallet To Bank Transfer'>
                    {/* form */}
                    <div className='w-[95%] lg:w-[45%] mx-auto space-y-5 my-5'>
                        <div className="relative w-full text-xs">
                            <label className="block mb-2 font-semibold">Select Transfer Type</label>
                            <div onClick={() => setTransferIsOpen(!transferIsOpen)} className="mx-auto flex w-full items-center justify-between rounded-xl px-3 py-1 border cursor-pointe">
                                <h1 className="font-medium ">{transferSelectedValue}</h1>
                                <svg className={`${transferIsOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
                            </div>

                            {/* dropdown - options  */}
                            <div className={`${transferIsOpen ? 'visible top-12 bg-white opacity-100' : 'invisible -top-4 opacity-0'} absolute mx-auto my-4 w-full z-50 rounded-xl py-4 border duration-300`}>
                                {selectOptions?.map((option, idx) => (
                                    <div key={idx} onClick={(e) => { setTransferSelectedValue(option); setTransferIsOpen(false); }} className="px-6 py-2 text-gray-500 hover:bg-gray-100">
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative w-full text-xs">
                            <label className="block mb-2 font-semibold">Select Wallet</label>
                            <div onClick={() => setWalletIsOpen(!walletIsOpen)} className="mx-auto flex w-full items-center justify-between rounded-xl px-3 py-1 border cursor-pointe">
                                <h1 className="font-medium ">{walletSelectedValue}</h1>
                                <svg className={`${walletIsOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
                            </div>

                            {/* dropdown - options  */}
                            <div className={`${walletIsOpen ? 'visible top-12 bg-white opacity-100' : 'invisible -top-4 opacity-0'} absolute mx-auto my-4 w-full z-50 rounded-xl py-4 border duration-300`}>
                                {walletOptions?.map((option, idx) => (
                                    <div key={idx} onClick={(e) => { setWalletSelectedValue(option); setWalletIsOpen(false); }} className="px-6 py-2 text-gray-500 hover:bg-gray-100">
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative w-full text-xs">
                            <label className="block mb-2 font-semibold">Sending Currency</label>

                            <div className='border rounded-l-xl flex'>
                                <div className="mx-auto flex w-full items-center justify-between px-3 py-1 cursor-pointer bg-gray-200 rounded-l-xl">
                                    <h1 className="font-medium">{sendingCountrySelectedValue}</h1>
                                </div>

                                <div onClick={() => setSendingCurrencyIsOpen(!sendingCurrencyIsOpen)} className="mx-auto flex items-center justify-center px-3 py-2 cursor-pointer bg-[#733ebc] rounded-r-xl text-white w-24">
                                    <h1 className="font-medium ">{sendingCurrencySelectedValue}</h1>

                                    <svg className={`${sendingCurrencyIsOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
                                </div>
                            </div>

                            {/* dropdown - options  */}
                            <div className='flex flex-row'>
                                {/* currency */}
                                <div className={`${sendingCurrencyIsOpen ? 'visible top-12 bg-white opacity-100' : 'invisible -top-4 opacity-0'} absolute mx-auto my-4 w-full z-50 rounded-xl py-4 border duration-300`}>
                                    {currencyOptions?.map((option, idx) => (
                                        <div key={idx} onClick={(e) => { setSendingCurrencySelectedValue(option); setSendingCurrencyIsOpen(false); }} className="px-6 py-2 text-gray-500 hover:bg-gray-100">
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative w-full text-xs">
                            <label className="block mb-2 font-semibold">Receiving Currency</label>

                            <div className='border rounded-l-xl flex'>
                                <div className="mx-auto flex w-full items-center justify-between px-3 py-1 cursor-pointer bg-gray-200 rounded-l-xl">
                                    <h1 className="font-medium ">{ReceivingCountrySelectedValue}</h1>
                                </div>

                                <div onClick={() => setReceivingCurrencyIsOpen(!receivingCurrencyIsOpen)} className="mx-auto flex items-center justify-center px-3 py-2 cursor-pointer bg-[#733ebc] rounded-r-xl text-white w-24">
                                    <h1 className="font-medium ">{receivingCurrencySelectedValue}</h1>

                                    <svg className={`${receivingCurrencyIsOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
                                </div>
                            </div>

                            {/* dropdown - options  */}
                            <div className='flex flex-row'>
                                {/* currency */}
                                <div className={`${receivingCurrencyIsOpen ? 'visible top-12 bg-white opacity-100' : 'invisible -top-4 opacity-0'} absolute mx-auto my-4 w-full z-50 rounded-xl py-4 border duration-300`}>
                                    {currencyOptions?.map((option, idx) => (
                                        <div key={idx} onClick={(e) => { setReceivingCurrencySelectedValue(option); setReceivingCurrencyIsOpen(false); }} className="px-6 py-2 text-gray-500 hover:bg-gray-100">
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="block mb-1 font-semibold text-xs">Sending Amount</label>
                            <input
                                type="number"
                                name="sendingAmount"
                                className="w-full px-3 py-2 text-xs border rounded-[10px] focus:outline-none"
                                placeholder="Type Amount....."
                            />
                        </div>

                        <div className='flex flex-row justify-between items-center text-[10px]'>
                            <h5 className="text-[#733ebc] font-semibold">Have a coupon code? </h5>
                            <button
                                onClick={() => hanldeCouponModal()}
                                className='font-semibold text-white p-1 rounded-full bg-[#723EEB] w-14'>
                                Apply
                            </button>
                        </div>

                        <Link href={'/recipients/select-recipients'} className="w-full">
                            <button
                                className='font-semibold text-white text-xs lg:text-xs p-1 lg:p-2 mt-3 rounded-full bg-[#723EEB] w-full'>
                                Choose Recipients
                            </button>
                        </Link>
                    </div>
                </SendMoneyCard>
            </div>

            {/* coupon modal */}
            <SendMoneyModal
                isOpen={couponModalOpen}
                onClose={handleCloseModal}
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
        </div>
    );
};

export default WalletToBankpage;