'use client'
import Image from "next/image";
import avatar from '../../../public/user-avater.png';
import { useState } from "react";
import { Controller } from "react-hook-form";

const SecondaryFileUpload = ({ control, errors }: { control: any, errors: any }) => {
    const [profile, setProfile] = useState<string | null>(avatar as unknown as string | null);

    // Handle file change for preview
    const handleFileChange = (e: any, onChange: any) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setProfile(fileURL);
            onChange(fileURL); 
        }
    };

    return (
        <>
            <div className="flex flex-row justify-between w-full gap-3 lg:gap-10 my-3 h-52 mt-12">
                <label className="block text-gray-700 space-y-3 w-1/2 ">
                    <div className="flex flex-row justify-between font-bold">
                        <h1>Front Part</h1>
                        <h1>Back Part</h1>
                    </div>
                    <div className="border-[1.5px] border-gray-200 rounded-xl border-dashed flex flex-col justify-center h-44">
                        <Controller
                            control={control}
                            name="frontPart"
                            rules={{ required: 'front part document is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="file"
                                    className="hidden"
                                />
                            )}
                        />
                        <div className="cursor-pointer px-3">
                            <svg
                                className="text-[#723EEB] w-5 mx-auto mb-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <div className="text-center ">
                                Drop your file or <span className="text-[#723EEB] font-semibold underline">Click</span> to select
                            </div>
                        </div>
                        {errors.frontPart && (
                            <p className="text-red-500 text-xs mt-1">{errors.frontPart.message}</p>
                        )}
                    </div>
                </label>
                <div className="w-1/2">
                    <div className="border border-black w-full h-[203px] flex flex-col rounded-[10px]">
                        <div className="flex flex-col justify-center items-center h-full">
                            <Image className="rounded-xl" src={profile as unknown as string} width={100} height={100} alt="face" />
                        </div>
                        <div className="mb-4 w-1/2 mx-auto">
                            <label htmlFor="faceVerification" className="cursor-pointer text-xs bg-[#723EEB] text-white w-full p-1.5 rounded-2xl">
                                Facial Verification
                            </label>
                            <Controller
                                control={control}
                                name="backPart"
                                render={({ field: { onChange, value } }) => (
                                    <input
                                        id="faceVerification"
                                        type="file"
                                        onChange={(e) => handleFileChange(e, onChange)}
                                        className="hidden"
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div>
                    <Controller
                        control={control}
                        name="checkbox"
                        rules={{ required: 'This is a required field' }}
                        render={({ field }: any) => (
                            <>
                                <input
                                    {...field}
                                    type="checkbox"
                                    id="checkbox"
                                />
                                <label htmlFor="checkbox" className="font-semibold ml-1">
                                    Confirm that I uploaded valid government-issued photo ID. This ID includes my picture, signature, name, date of birth, and address.
                                </label>
                            </>
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default SecondaryFileUpload;
