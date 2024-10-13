import Link from 'next/link';
import React, { useState } from 'react';
import useNavigationContext from '../NavigationContext/useNavigationContext';
import ForgetPINModal from '../common/ForgetPINModal/ForgetPINModal';
import Modal from '../common/Modal/Modal';
import useSubWallets from '../hooks/useSubWallets';
import ChangePINForm from './ChangePINForm';
import DeleteSubWalletModal from './DeleteSubWalletModal';
import EditWalletModal from './EditWalletModal';
import SubWalletModalForm from './SubWalletModalForm';
import WithdrawIntoWalletModal from './WithdrawIntoWalletModal';

interface ModalProps {
    isSubWalletModalOpen: boolean;
    setSubWalletModalOpen: (value: boolean) => void;
    handleMakeMainWallet: (value: any) => void;
    handleSubWallet: (value: any) => void;
    data: any;
}

const SubWalletTable: React.FC<ModalProps> = ({ handleMakeMainWallet, isSubWalletModalOpen, setSubWalletModalOpen, handleSubWallet, data }) => {
    const [subWallets] = useSubWallets();
    // const [subWalletData, setSubWalletData] = useState({});
    const { setSubWalletData }: any = useNavigationContext();

    const [isWithdrawIntoWalletModalOpen, setWithdrawIntoWalletModalOpen] = useState(false);
    const [isChangePINModalOpen, setChangePINModalOpen] = useState(false);
    const [isForgetPINModalOpen, setForgetPINModalOpen] = useState(false);
    const [isEditWalletModalOpen, setEditWalletModalOpen] = useState(false);
    const [isDeleteSubWalletModalOpen, setDeleteSubWalletModalOpen] = useState(false);

    // const handleSubWallet = () => {
    //     setSubWalletModalOpen(true);
    // };

    const handleWithdrawIntoWallet = () => {
        setWithdrawIntoWalletModalOpen(true);
        setSubWalletModalOpen(false);
    };

    const handleChangePIN = (data: any) => {
        setSubWalletData(data);
        setSubWalletModalOpen(false);
        setChangePINModalOpen(true);
    };

    const handleEditSubWallet = (data: any) => {
        setSubWalletData(data);
        setEditWalletModalOpen(true);
        setSubWalletModalOpen(false);
    };

    const handleDeleteSubWallet = (data: any) => {
        setSubWalletData(data)
        setDeleteSubWalletModalOpen(true);
        setSubWalletModalOpen(false);
    };

    const handleForgetPIN = () => {
        setForgetPINModalOpen(true);
        setSubWalletModalOpen(false);
        setChangePINModalOpen(false);
    };

    const handleCloseModal = () => {
        setSubWalletModalOpen(false);
        setChangePINModalOpen(false);
    }

    return (
        <div className="overflow-x-auto">
            <div>
                <Modal
                    isOpen={isSubWalletModalOpen}
                    onClose={handleCloseModal}
                    // title="Wallet Name : Indian"
                    title={`Wallet Name : ${data?.walletName}`}
                >
                    <SubWalletModalForm
                        handleWithdrawIntoWallet={handleWithdrawIntoWallet}
                        handleChangePIN={handleChangePIN}
                        handleForgetPIN={handleForgetPIN}
                        handleEditSubWallet={handleEditSubWallet}
                        handleDeleteSubWallet={handleDeleteSubWallet}
                        subWalletData={data}
                    />
                </Modal>

                <table className="mt-3 w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <span className='w-full px-2'>
                                <td className='w-[40%] pl-2'>Wallet Name</td>
                                <td className='w-72 '>Currency</td>
                                <td className='w-[30%]'>Balance</td>
                            </span>
                            <td className='w-[10%]'></td>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            subWallets?.map((data: any) => (
                                <tr
                                    className='bg-[#f4f8fb] hover:bg-[#daeaf5] border-b border-gray-400 font-semibold cursor-pointer'
                                    key={data.id}>
                                    <span className='py-3'>
                                        <td
                                            onClick={() => handleSubWallet(data)} className='w-[40%] py-2 pl-4'>{data?.walletName}</td>
                                        <td
                                            onClick={() => handleSubWallet(data)} className='w-72 py-2 pl-2'>{data?.currency?.name}</td>
                                        <td
                                            onClick={() => handleSubWallet(data)} className='w-[30%] py-2 px-2'>{data?.balance ? data?.balance : '0.0'} {data?.currency?.code}</td>
                                    </span>
                                    <td onClick={() => handleMakeMainWallet(data)} className='w-14 py-2'>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0V22H22V0H0ZM2 2H20V20H2V2ZM16.2812 6.28125L9 13.5625L5.71875 10.2812L4.28125 11.7188L8.28125 15.7188L9 16.4062L9.71875 15.7188L17.7188 7.71875L16.2812 6.28125Z" fill="#723EEB" />
                                        </svg>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <Link href={'/user/send-money'} className=''>
                    <div className='w-[95%] mx-auto text-xs text-white p-1.5 bg-[#723EEB] text-center my-5 rounded'>
                        Send Now
                    </div>
                </Link>
            </div>


            {/* withdrawintowallet modal */}
            <WithdrawIntoWalletModal
                isWithdrawIntoWalletModalOpen={isWithdrawIntoWalletModalOpen}
                setWithdrawIntoWalletModalOpen={setWithdrawIntoWalletModalOpen}
            />

            {/* edit wallet modal */}
            <EditWalletModal
                isEditWalletModalOpen={isEditWalletModalOpen}
                setEditWalletModalOpen={setEditWalletModalOpen}
            />

            {/* delete wallet modal */}
            <DeleteSubWalletModal
                isDeleteSubWalletModalOpen={isDeleteSubWalletModalOpen}
                setDeleteSubWalletModalOpen={setDeleteSubWalletModalOpen}
            />

            {/* change pin modal */}
            <Modal
                isOpen={isChangePINModalOpen}
                onClose={handleCloseModal}
                title="Change PIN"
            >
                <ChangePINForm
                    handleForgetPIN={handleForgetPIN}
                    setChangePINModalOpen={setChangePINModalOpen}
                />
            </Modal>


            {/* forget pin modal */}
            <ForgetPINModal
                setForgetPINModalOpen={setForgetPINModalOpen}
                isForgetPINModalOpen={isForgetPINModalOpen}
                subWalletData={data}
            />
        </div>
    );
};

export default SubWalletTable;