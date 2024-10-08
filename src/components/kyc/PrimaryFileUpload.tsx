import { Controller } from "react-hook-form"
import InputSelectKyc from "./InputSelect"
interface PropTypes {
    control: any
    errors: any
    register: any
}
const PrimaryFileUpload = ({ control, errors, register }: PropTypes) => {
    return (
      <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-3 lg:gap-10 my-3">
      <div className="mb-4 w-full">=
            <InputSelectKyc
                name="documentType"
                label="Document Type*"
                errors={errors}
                register={register}
                options={["Driving License", "Passport", "Voters Card"]}
                validation={{ required: "Document type is required" }}
            />
      </div>
      <div className="w-full">
        <label className="block text-gray-700 font-bold space-y-3">
          <h1>Front Part*</h1>
          <Controller
            control={control}
            name="frontPart"
            rules={{ required: 'Front part document is required' }}
            render={({ field }) => (
              <div
                className={`border-[1.5px] rounded-xl border-dashed h-16 flex items-center justify-center cursor-pointer ${
                  errors.frontPart ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <input
                  id="frontPart"
                  type="file"
                  {...field}
                  className="hidden"
                  accept="image/*,application/pdf"
                />
                {field.value ? (
                  <span>{field.value.name}</span>
                ) : (
                  <div className="text-center">
                    <svg
                      className="text-[#723EEB] mx-auto w-6"
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
                    <div className='text-center'>
                      Drop your file or{' '}
                      <span className='text-[#723EEB] font-semibold underline'>
                        Click
                      </span>{' '}
                      to select
                    </div>
                  </div>
                )}
              </div>
            )}
          />
          {errors.frontPart && (
            <p className="text-red-500 text-xs mt-1">{errors.frontPart.message}</p>
          )}
        </label>
      </div>

      <div className="w-full">
        <label className="block text-gray-700 font-bold space-y-3">
          <h1>Back Part*</h1>
          <Controller
            control={control}
            name="backPart"
            rules={{ required: 'Back part document is required' }}
            render={({ field }) => (
              <div
                className={`border-[1.5px] rounded-xl border-dashed h-16 flex items-center justify-center cursor-pointer ${
                  errors.backPart ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <input
                  id="backPart"
                  type="file"
                  {...field}
                  className="hidden"
                  accept="image/*,application/pdf"
                />
                {field.value ? (
                  <span>{field.value.name}</span>
                ) : (
                  <div className="text-center">
                    {/* //TODO: svg */}
                    <div className='text-center'>
                      Drop your file or{' '}
                      <span className='text-[#723EEB] font-semibold underline'>
                        Click
                      </span>{' '}
                      to select
                    </div>
                  </div>
                )}
              </div>
            )}
          />
          {errors.backPart && (
            <p className="text-red-500 text-xs mt-1">{errors.backPart.message}</p>
          )}
        </label>
      </div>
    </div>
    )
}
export default PrimaryFileUpload