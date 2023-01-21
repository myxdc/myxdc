import React from 'react'

export const PrivacyPolicy = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto mt-12">
        <h1 className="my-4 text-2xl font-medium">MyXDC Privacy Policy</h1>
        <p className="my-4 text-sm">Last updated: 21st January 2023</p>
        <pre className="mb-16 font-sans text-lg leading-relaxed text-gray-800 whitespace-pre-wrap bg-white rounded">
          {`
At MyXDC, we take the privacy of our users very seriously. Our platform is connected to the blockchain directly without any centralized servers and allows users to have full control over their own assets and transaction data. We do not collect or store any personal information about our users, except for their blockchain addresses and preferences that are stored in the browser's local storage for the purpose of facilitating transactions on the blockchain.

We do not require users to provide any personal information such as name, address, or ID in order to use our service. We do not track or collect any information about our users' browsing or usage habits. We do not use cookies or other tracking technologies on our website or platform.

Users should be aware that any information they provide to third-party services, such as blockchain explorers or other platforms, may be collected and used by those third parties in accordance with their own privacy policies.

We will never sell or share any information about our users to any third parties for any reason. We will only disclose user information if required to do so by law or in response to a valid legal request.

If you have any questions about our privacy policy, please contact us. We will update this policy if there are any material changes.`}
        </pre>
      </div>
    </>
  )
}
