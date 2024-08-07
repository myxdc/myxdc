import { useCallback } from 'react'
import { ethers } from 'ethers'

import { useWeb3 } from '../contracts/useWeb3'
import { txObj } from './types'
import { useAccount } from './useAccount'
import { useLedger } from './useLedger'
import { useLocalWallet } from './useLocalWallet'
import { useMetaMask } from './useMetaMask'

export const useSigner = ({ type }: { type?: 'metamask' | 'ledger' | 'local' }) => {
  const { signTransaction: metaMaskSigner } = useMetaMask()
  const { signTransaction: ledgerSigner } = useLedger()
  const { signTransaction: localSigner } = useLocalWallet()
  const Web3 = useWeb3()
  const { activeAccount } = useAccount()

  const signer = useCallback(
    async (tx: txObj, accountId: string) => {
      const txObject: any = {
        ...tx,
      }
      // 1. calculate gas if not provided
      if (!txObject.gasLimit) {
        try {
          txObject.gasLimit = ethers.utils.hexlify(await Web3.eth.estimateGas(txObject))
        } catch (e) {
          console.log(e)
          txObject.gasLimit = ethers.utils.parseUnits('250000', 'gwei')
        }
      }

      // 2. set the gasPrice if not provided
      if (!txObject.gasPrice) {
        txObject.gasPrice = Web3.utils.toHex(await Web3.eth.getGasPrice())
      }

      // 3. calculate the nonce if not provided
      if (!txObject.nonce) {
        txObject.nonce = await Web3.eth.getTransactionCount(accountId)
      }

      // // 4. set the value if not provided
      if (!txObject.value) {
        txObject.value = ethers.utils.parseEther('0')
      }

      // 5. set the from address if not provided
      if (!txObject.from) {
        // txObject.from = accountId
      }
      // // 6. set data if not provided
      if (!txObject.data) {
      }

      if (!txObject.type) {
        // txObject.type = 1
      }
      console.log('obkect', txObject)
      if (type === 'metamask') {
        return metaMaskSigner(txObject, accountId)
      } else if (type === 'ledger') {
        return ledgerSigner(txObject, accountId)
      } else if (type === 'local') {
        return localSigner(txObject, accountId)
      }
      return null
    },
    [activeAccount]
  )

  return {
    signer: signer,
  }
}
