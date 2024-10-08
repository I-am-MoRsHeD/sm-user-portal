import React from 'react';
import { useForm } from 'react-hook-form';
import TextInputKYC from './TextInputField';
import InputSelectKyc from './InputSelect';
import PrimaryFileUpload from './PrimaryFileUpload';

const PrimaryKycForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white px-2 lg:px-6 pt-10 rounded-xl text-xs'
    >
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
        <div className="w-full my-3">
            <TextInputKYC
                label="Email"
                name="email"
                register={register}
                validation={{ required: 'Email is required' }}
                errors={errors}
                placeholder="Enter Email ..."
            />
        </div>
        <div className="flex flex-col lg:flex-row justify-between w-full gap-3 lg:gap-10 my-3">
            <div className="w-full">
                <InputSelectKyc
                    options={['USA', 'Canada']}
                    name="country"
                    register={register}
                    errors={errors}
                    label="Country"
                />
            </div>
            <div className="w-full">
                <TextInputKYC
                    label="City"
                    name="city"
                    register={register}
                    validation={{ required: 'City is required' }}
                    errors={errors}
                    placeholder="Enter City ..."
                />
            </div>
            <div className="w-full">
            <TextInputKYC
                label="State"
                name="state"
                register={register}
                validation={{ required: 'State is required' }}
                errors={errors}
                placeholder="Enter State ..."
                />
            </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-4 my-3">
            <div className="lg:w-1/2">
            <TextInputKYC
                label="Zip Code"
                name="zip_code"
                register={register}
                validation={{ required: 'Zip Code is required' }}
                errors={errors}
                placeholder="Enter Zip Code ..."
                />
            </div>
            <div className="lg:w-1/2">
            <TextInputKYC
                label="Phone"
                name="phone"
                register={register}
                validation={{ required: 'Phone is required' }}
                errors={errors}
                placeholder="Enter Phone ..."
                />
            </div>
        </div>
        <div className="w-full my-3">
            <TextInputKYC
                label="Address"
                name="address"
                register={register}
                validation={{ required: 'Address is required' }}
                errors={errors}
                placeholder="Enter Address ..."
                />
        </div>
        <PrimaryFileUpload control={control} errors={errors} register={register}/>
        <div className='pt-3 pb-5'>
        <button
            type="submit"
            className="bg-[#723EEB] py-[6px] text-white w-full text-max px-4 lg:text-sm text-xs rounded"
        >
            Confirm
        </button>
        </div>
    </form>
  );
};

export default PrimaryKycForm;
