import { Faq } from '@myxdc/ui'

export default function Page() {
  return (
    <Faq
      data={FAQS}
      label="Ledger FAQ"
      title="Ledger Frequently Asked Questions"
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
    question: 'What is a Ledger hardware wallet?',
    answer:
      'A Ledger hardware wallet is a device that securely stores your cryptocurrency private keys. It allows you to manage your cryptocurrencies and make transactions on the XDC Network and other blockchain networks without exposing your private keys to the internet.',
  },
  {
    question: 'What do I need to use a Ledger with the XDC Network on a MyXDC?',
    answer: `To use a Ledger with the XDC Network on a web app, you will need the following:\n
    - A Ledger hardware wallet, such as a Ledger Nano S or Ledger Nano X.\n
    - A computer with a USB port.\n
    - A web browser, such as Chrome or Firefox.\n
    - The Ledger Live app, which you can download from the Ledger website.`,
  },
  {
    question: 'How do I set up my Ledger hardware wallet?',
    answer: 'Visit the official Ledger website to learn how to set up your Ledger hardware wallet.',
  },
  {
    question: 'How do I connect my Ledger hardware wallet to MyXDC?',
    answer: `To use your Ledger with the XDC Network on a web app, follow these steps:\n
    1. Connect your Ledger hardware wallet to your computer using a USB cable.\n
    2. Open the Ledger Live app on your computer.\n
    3. Open the XDC Network app on your Ledger hardware wallet.\n
    4. Open the MyXDC app on your computer.\n
    5. Click the Connect to Ledger button.\n
    6. Follow the instructions on your Ledger hardware wallet to approve the connection.`,
  },
  {
    question: 'Where can I find the XDC Network app on my Ledger hardware wallet?',
    answer: `The XDC Network app is available on the Ledger Live app store. To install it, follow these steps:\n
    1. Open the Ledger Live app on your computer.\n
    2. Click the Manager tab.\n
    3. Click the Install app button.\n
    4. Search for XDC Network.\n
    5. Click the Install button next to the XDC Network app.\n
    6. Follow the instructions on your Ledger hardware wallet to approve the installation.`,
  },
  {
    question: 'Is it safe to use Ledger hardware wallet with MyXDC?',
    answer: `MyXDC does not have access to your private keys. Your private keys are stored securely on your Ledger hardware wallet. MyXDC only communicates with your Ledger hardware wallet to sign transactions and display your XDC balance.\n
    But you should still take precautions to protect your Ledger hardware wallet. For example, you should never connect your Ledger hardware wallet to a computer that you don't trust.`,
  },
]
