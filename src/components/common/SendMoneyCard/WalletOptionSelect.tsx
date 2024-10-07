import React from 'react'
import SelectOptions from '@/components/shared/Select-options';
import useMainWallet from '@/components/hooks/useMainWallet';
import useSubWallets from '@/components/hooks/useSubWallets';

const WalletOptionSelect = ({ control }: {control: any}) => {
  const [mainWallet, isPending] = useMainWallet()
  const [subWallet] = useSubWallets()
  const walletOptions = [mainWallet, ...subWallet]
  const options = walletOptions.map(item => {
    return {
      value: {
        ...item
      },
      label: item?.category === 'PRIMARY' ? `Main: ${item?.walletName}` : `Sub: ${item?.walletName}`
    }
  })
  return (
        <SelectOptions
            placeholder="Select Transfer Type"
            label="walletType"
            control={control}
            options={options}
            error="Please select wallet"
        />
  )
}

export default WalletOptionSelect