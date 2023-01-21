import React from 'react'

export const TermsOfService = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto mt-12">
        <h1 className="my-4 text-2xl font-medium">MyXDC Terms Of Service</h1>
        <p className="my-4 text-sm">Last updated: 21st January 2023</p>
        <pre className="mb-16 font-sans text-lg leading-relaxed text-gray-800 whitespace-pre-wrap bg-white rounded">
          {`
Welcome to MyXDC, a non-custodial wallet and decentralized exchange (DEX). By using our service, you agree to be bound by the following terms and conditions (the "Terms"). Please read these Terms carefully before using our service. If you do not agree to these Terms, you should not use our service.

Service Description
MyXDC is a non-custodial wallet and DEX service that allows users to have full control over their own assets and transaction data. We do not hold or store any user assets or transaction data.

User Responsibility
By using our service, you represent and warrant that you have the legal capacity to enter into these Terms and that you will comply with all applicable laws and regulations. You are solely responsible for your use of our service, including but not limited to, the management and security of your private keys and seed phrases. We will not be responsible for any loss or damage arising from your failure to secure your private keys and seed phrases.

Third-Party Services
Our service may include links to third-party services, such as blockchain explorers, that are not owned or controlled by us. We have no control over and assume no responsibility for, the content, privacy policies, or practices of any third-party services. You should review the terms of service and privacy policies of any third-party services you use in connection with our service.

No Warranty
Our service is provided "as is" and "as available" without warranty of any kind, either express or implied, including but not limited to, the implied warranties of merchantability and fitness for a particular purpose. We do not warrant that our service will be uninterrupted or error-free.

Limitation of Liability
In no event shall we be liable for any damages whatsoever, including but not limited to, direct, indirect, special, incidental, or consequential damages, arising out of or in connection with the use or inability to use our service.

Changes to these Terms
We reserve the right to make changes to these Terms at any time. Your continued use of our service following any changes to these Terms will be deemed your acceptance of those changes.

Contact Us
If you have any questions about these Terms, please contact us.`}
        </pre>
      </div>
    </>
  )
}
