import { SVGProps } from 'react'

export const LocalWalletIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={40} height={40} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 7a5 5 0 0 1 10 0v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7Zm5-3a3 3 0 0 0-3 3v1h6V7a3 3 0 0 0-3-3Z"
      fill="#152C70"
    />
    <path d="M9 8a5 5 0 0 0-5 5v4a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5v-4a5 5 0 0 0-5-5H9Z" fill="#4296FF" />
    <path d="M13 15.732A2 2 0 0 0 12 12a2 2 0 0 0-1 3.732V17a1 1 0 1 0 2 0v-1.268Z" fill="#152C70" />
  </svg>
)
