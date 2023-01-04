import { Faq } from '@myxdc/ui'
import HelpCenterLayout from '../_layout'

export default function Page() {
  return (
    <HelpCenterLayout>
      <Faq
        data={FAQS}
        label="INTRODUCTION"
        title="Getting Started with MyXDC"
        description={
          <>
            Can&apos;t find the answer to your question?{' '}
            <a href="https://t.me/myxdc" target="_blank" rel="noopener noreferrer">
              Ask us on Telegram
            </a>
          </>
        }
      />
    </HelpCenterLayout>
  )
}

const FAQS = [
  {
    question: 'What is MyXDC?',
    answer: `MyXDC is a web-based wallet that is available on all major web browsers. It is a non-custodial wallet, which means that you are in full control of your assets and your private keys are never shared with anyone. MyXDC is a secure wallet that uses the latest security technologies to protect your assets and your privacy.`,
  },
  {
    question: 'How to create a MyXDC account?',
    answer: `
    MyXDC is a non-custodial wallet where you can store, receive, send XDC assets and interact with the XDC blockchain simply and securely.
    To create a MyXDC account, follow these steps:\n
      1. Go to https://myxdc.org and click open app to open the MyXDC app.\n
      2. Click the Connect Wallet button.\n
      3. Choose Local Wallet.\n
      4. Click the Create a new account button.\n
      5. Write down your 12-word recovery phrase and keep it safe.\n
      6. Click the I have written it down button.\n
      7. Verify your recovery phrase by typing the correct word in the exact order.\n
      
      You have successfully created a MyXDC account.`,
  },
  {
    question: 'How to import an already existing XDC account?',
    answer: `
    To import an already existing XDC account, follow these steps:\n
    1. Get the private key or the 12-word recovery phrase of your XDC account.\n
    2. Go to https://myxdc.org and click open app to open the MyXDC app.\n
    3. Click the Connect Wallet button.\n
    4. Choose Local Wallet.\n
    5. Click the Import an existing account button.\n
    6. Enter your private key or 12-word recovery phrase and click the Import button.\n

    You have successfully imported your XDC account.`,
  },
  {
    question: 'How to send XDC from MyXDC?',
    answer: `
    After you have successfully created a MyXDC account, you can send XDC from your MyXDC account to any XDC address.\n
    To send XDC from MyXDC, follow these steps:\n
    1. Go to your wallet page by clicking the Wallet button on the top navigation bar.\n
    2. Click the Send button.\n
    3. Enter the XDC address of the recipient.\n
    4. Enter the amount of XDC you want to send.\n
    5. Click the Send button.\n

    You have successfully sent XDC from your MyXDC account.`,
  },
  {
    question: 'How to receive XDC in MyXDC?',
    answer: `
    After you have successfully created a MyXDC account, you can receive XDC in your MyXDC account.\n
    To receive XDC in MyXDC, follow these steps:\n
    1. Go to your wallet page by clicking the Wallet button on the top navigation bar.\n
    2. Click the Receive button.\n
    3. Copy the XDC address or scan the QR code to receive XDC.`,
  },
  {
    question: 'Where is my private key stored?',
    answer: `
    Your private key is stored in your browser&apos;s local storage. It is encrypted with a password that you set when you create your MyXDC account. If you lose your password, you will not be able to access your account.`,
  },
  {
    question: 'Should I use Local Wallet or Ledger Wallet or MetaMask?',
    answer: `It depends on your needs and security requirements:\n
    - If you want the highest level of security, you should definitely use a Ledger Wallet.\n
    - If you want a more convenient way to access your XDC assets, you should use a Local Wallet.\n
    - If you want to use your XDC assets in other DApps, you should use MetaMask.\n`,
  },
]
