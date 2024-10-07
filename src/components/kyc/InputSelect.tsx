import { Select } from "@radix-ui/react-select";

interface Props {
    options: string[];
    register: any;
    errors: any;
    label: string;
    name: string
    validation?: any
}
const InputSelectKyc = ({ options, register, errors, label, name, validation }: Props) => {
    return (
        <>
            <label className="block mb-3 text-gray-700 font-bold">{label}</label>
            <select
                {...register(name, { required:  validation})}
                className={`w-full px-3 border rounded-xl focus:outline-none select select-sm text-[10px] ${
                errors[name] ? 'border-red-500' : 'border-gray-300'
                }`}
            >
                <option>Select a {label}</option>
                {
                    options.map((item: string) => (
                        <option key={item} value={`${item}`}>{item}</option>
                    ))
                }
            </select>
            {errors[name] && (
            <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
          )}
        </>
    )
}
export default InputSelectKyc