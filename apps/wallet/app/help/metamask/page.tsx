import { Faq } from '@myxdc/ui'

export default function Page() {
  return (
    <Faq
      data={FAQS}
      label="MetaMask FAQ"
      title="MetaMask Frequently Asked Questions"
      description={
        <>
          Can&apos;t find the answer to your question?{' '}
          <a href="https://t.me/myxdc" target="_blank" rel="noopener noreferrer">
            Ask us on Telegram
          </a>
        </>
      }
    />
  )
}
const FAQS = [
  {
    question: 'What is MetaMask?',
    answer:
      'MetaMask is a browser extension that allows you to interact with the XDC Network and other blockchain networks directly from your web browser. It acts as a bridge between your web browser and the blockchain, allowing you to securely store, manage, and trade your cryptocurrencies.',
  },
  {
    question: 'What do I need to use MetaMask with MyXDC wallet?',
    answer: `To use MetaMask with MyXDC wallet, you will need the following:\n
    - A web browser that supports MetaMask, such as Chrome, Firefox, or Brave.\n 
    - The MetaMask extension installed on your web browser. \n
    - A MetaMask account.\n
    - Correctly configured network settings in MetaMask.
    `,
  },
  {
    question: 'How do I install and use MetaMask?',
    answer: 'Visit the official MetaMask website to learn how to set up MetaMask.',
  },
  {
    question: 'How do I configure MetaMask network settings to use the XDC Network?',
    answer: `To configure MetaMask network settings to use the XDC Network, follow these steps:\n
    1. Open the MetaMask extension on your web browser.\n
    2. Click the Network drop-down menu.\n
    3. Click the Custom RPC option.\n
    4. Enter the following details:\n
    - Network Name: XDC Network\n
    - New RPC URL: https://rpc.xinfin.network\n
    - Chain ID: 50\n
    - Symbol: XDC\n
    - Block Explorer URL: https://explorer.xinfin.network\n
    5. Click the Save button.`,
  },
  {
    question: 'How do I connect MetaMask to MyXDC wallet?',
    answer: `To connect MetaMask to MyXDC wallet, follow these steps:\n
    1. Open the MetaMask extension on your web browser.\n
    2. Click the Network drop-down menu.\n
    3. Click the XDC Network option.\n
    4. Open the MyXDC wallet on your web browser.\n
    5. Click the Connect to MetaMask button.\n
    6. Follow the instructions on your MetaMask extension to approve the connection.`,
  },
  {
    question: 'Is it safe to use MetaMask with MyXDC wallet?',
    answer: `Yes, it is safe to use MetaMask with MyXDC wallet. MyXDC wallet does not store your private keys, so your funds are always secure. However, you should always take precautions to protect your MetaMask account and computer from malware and phishing attacks.`,
  },
  {
    question: 'How do I import my MetaMask accounts to MyXDC wallet?',
    answer: `Just connect your MetaMask account to MyXDC wallet and your accounts will be automatically imported. `,
  },
]
