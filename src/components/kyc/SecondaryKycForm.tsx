import TextInputKYC from './TextInputField';
import InputSelectKyc from './InputSelect';
import { useForm } from 'react-hook-form';
import SecondaryFileUpload from './SecondaryFileUpload';

const SecondaryKycForm = () => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data: any) => {
        console.log('secondary data:', data);
      };
    return (
        <div>
            <div className='lg:w-1/2 px-2 lg:px-0 mx-auto my-10'>
                <div className='text-center mb-14 space-y-2'>
                    <h1 className="text-xl font-bold">Upload a proof of your identity</h1>
                    <p className='text-xs'>DiasporeX Requires a valid government issue ID(drivers license,passport,national ID)</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='text-xs'>
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-3 lg:gap-10 my-3">
                        <div className="w-full">
                            <TextInputKYC
                                label="Full Name"
                                name="fullName"
                                register={register}
                                validation={{ required: 'Full Name is required' }}
                                errors={errors}
                                placeholder="Enter Full Name ..."
                            />
                        </div>
                        <div className="w-full">
                            <TextInputKYC
                                label="Email"
                                name="email"
                                register={register}
                                validation={{ required: 'Email is required' }}
                                errors={errors}
                                placeholder="Enter Email ..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-3 lg:gap-10 my-7">
                        <div className=" w-full">
                            <InputSelectKyc
                                name="country"
                                label="Country"
                                errors={errors}
                                register={register}
                                options={["Nigeria", "Ghana", "Togo"]}
                                validation={{ required: "Country is required" }}
                            />
                        </div>
                        <div className=" w-full">
                            <InputSelectKyc
                                name="documentType"
                                label="Document Type"
                                errors={errors}
                                register={register}
                                options={["Driving License", "Passport", "Voters Card"]}
                                validation={{ required: "Document type is required" }}
                            />
                        </div>
                    </div>
                    <SecondaryFileUpload
                        control={control}
                        errors={errors}
                    />
                    <div className='w-full pt-5 pb-7 '>
                        <input className='w-full bg-[#723EEB] lg:text-sm text-white px-1 py-[6px] rounded-[5px] cursor-pointer' type="submit" value="Apply" />
                    </div>
                </form>
            </div>

        </div>
    );
};

export default SecondaryKycForm;