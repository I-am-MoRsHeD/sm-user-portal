'use client'
import { Close } from '@/components/icons/Icon';
import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    disableCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, disableCloseButton }) => {
    // if (!isOpen) return null;
    return (
        <div>
            <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[999] ${isOpen ? 'opacity-1 visible' : 'invisible opacity-0'}`}>
                <div className={`bg-white rounded-xl shadow-lg overflow-hidden w-[95%] lg:max-w-2xl max-h-[96vh] lg:w-full overflow-y-auto transition-transform transform ease-in-out duration-500 ${isOpen ? 'opacity-1 translate-y-0 ' : '-translate-y-20 opacity-0'}`}>
                    <div className="flex justify-between items-center px-6 pt-6 pb-2">
                        <h3 className="text-lg font-semibold dark:text-max">{title}</h3>
                        <div
                            style={{ display: disableCloseButton ? 'none' : 'flex' }}
                            onClick={onClose} className='bg-[#723EEB] w-6 h-6 flex justify-center items-center text-white rounded cursor-pointer'>
                            <div
                                className="text-3xl"
                            >
                                <Close />
                            </div>
                        </div>
                    </div>
                    <div className="px-6 ">{children}</div>
                </div>
            </div>
        </div>
        // <CSSTransition
        //     in={isOpen}
        //     timeout={200}
        //     classNames='modal'
        //     unmountOnExit
        // >
        //         <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[999] ${isOpen ? 'opacity-1 visible' : 'invisible opacity-0'}`}>
        //             <div className={`bg-white rounded-xl shadow-lg overflow-hidden w-[95%] lg:max-w-2xl max-h-[96vh] lg:w-full overflow-y-auto transition-transform transform ease-in-out duration-500 ${isOpen ? 'opacity-1 translate-y-0 ' : '-translate-y-20 opacity-0'}`}>
        //                 <div className="flex justify-between items-center px-6 pt-6 pb-2">
        //                     <h3 className="text-lg font-semibold dark:text-max">{title}</h3>
        //                     <div onClick={onClose} className='bg-[#723EEB] w-6 h-6 flex justify-center items-center text-white rounded cursor-pointer'>
        //                         <div
        //                             className="text-3xl"
        //                         >
        //                             <Close />
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="px-6 ">{children}</div>
        //             </div>
        //         </div>
        //     {/* <div>
        //     </div> */}
        // </CSSTransition>
    );
};

export default Modal;
