import { config } from '@myxdc/constants'
import XRC20 from '@myxdc/constants/artifacts/XRC20.json'
import { isAddress, toChecksumAddress } from '@myxdc/utils/web3'
import Cors from 'cors'
import Web3 from 'web3'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: '*',
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const RPC_URL = config.RPC_URL
const contractAddress = '0x81c3d6C3329a44D548e52d68B6486a8Ad3efDff3'
const web3 = new Web3(RPC_URL)
const contract = new web3.eth.Contract(XRC20.abi as any, contractAddress)
const privateKey = process.env.MXDC_FAUCET_PRIVATE_KEY!

export default async function handler(req: any, res: any) {
  await runMiddleware(req, res, cors)

  if (config.CHAIN_ID !== 51) {
    return res.status(400).send({ error: 'MXDC faucet is only available on XDC testnet' })
  }

  const { address } = req.query

  if (!isAddress(address)) {
    return res.status(400).send({ error: 'Invalid Ethereum address' })
  }

  // 1000 XDC
  const amount = '1000000000000000000000'

  try {
    const faucetAddress = '0x74E54ea0f23156b5756625787a077a9581AF0717'

    const nonce = await web3.eth.getTransactionCount(faucetAddress)

    const txData = {
      nonce: nonce,
      gasPrice: web3.utils.toHex(21000000000),
      gas: web3.utils.toHex(1000000),
      to: contractAddress,
      value: '0x0',
      data: contract.methods.transfer(toChecksumAddress(address), amount).encodeABI(),
    }

    const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey)

    const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!)

    return res.send({ txHash })
  } catch (error: any) {
    return res.status(500).send({ error: error.message })
  }
}
