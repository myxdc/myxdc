'use client'

import { useState } from 'react'

interface FaqItemProps {
  question: string
  answer: string
}

export const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-8">
      <div
        className="flex items-center justify-between p-4 bg-gray-200 rounded-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="font-medium text-gray-900">{question}</h2>
        <svg
          className={'ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 ' + (open ? 'transform rotate-180' : '')}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <p className={`mt-4 text-gray-500 whitespace-pre-line ${open ? 'block' : 'hidden'}`}>{answer}</p>
    </div>
  )
}
