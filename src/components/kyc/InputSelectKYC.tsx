import React from 'react'
import SelectOptions from '@/components/shared/Select-options';
import useMainWallet from '@/components/hooks/useMainWallet';
import useSubWallets from '@/components/hooks/useSubWallets';

interface PropTypes {
  control: any
  label: string
  placeholder: string
  error: string;
  name: string;
  borderColor?: boolean | undefined
}
const InputSelectKYC = ({ control, label, placeholder, error, name, borderColor }: PropTypes) => {
  const [mainWallet, isPending] = useMainWallet()
  const [subWallet] = useSubWallets()
  const walletOptions = [mainWallet, ...subWallet] 
  let options = null
  if (name === 'documentType') {
    options = [
      {
        value: 'Passport',
        label: 'Passport'
      },
      {
        value: 'National ID',
        label: 'National ID'
      },
      {
        value: 'Drivers License',
        label: 'Drivers License'
      }
    ]
  }
  if (name === 'country') {
    options = [
      {
        value: 'USA',
        label: 'USA'
      },
      {
        value: 'Canada',
        label: 'Canada'
      },
      {
        value: 'UK',
        label: 'UK'
      }
    ]
  }
  return (
    <>
      <label htmlFor={label} className='block mb-3 text-gray-700 font-bold'>{label}</label>
      <SelectOptions
            placeholder={placeholder}
            label={label}
            name={name}
            control={control}
            options={options as {
              value: string;
              label: string;
            }[]}
            error={error}
            borderColor={borderColor}
        />
    </>
  )
}

export default InputSelectKYC 