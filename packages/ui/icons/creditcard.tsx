import { SVGProps } from 'react'

export const CreditCardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="2em" height="2em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <g fill="currentColor">
      <path d="M3.75 9a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5z" />
      <path
        fillRule="evenodd"
        d="M0 4.25A2.25 2.25 0 0 1 2.25 2h11.5A2.25 2.25 0 0 1 16 4.25v7.5A2.25 2.25 0 0 1 13.75 14H2.25A2.25 2.25 0 0 1 0 11.75v-7.5zm14.5 0V5h-13v-.75a.75.75 0 0 1 .75-.75h11.5a.75.75 0 0 1 .75.75zm0 2.75h-13v4.75c0 .414.336.75.75.75h11.5a.75.75 0 0 0 .75-.75V7z"
        clipRule="evenodd"
      />
    </g>
  </svg>
)
