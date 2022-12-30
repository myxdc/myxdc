import { SVGProps } from 'react'

export const ExternalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    {...props}
  >
    <path d="M8.25 2.75h-5.5v10.5h10.5v-5.5M13.25 2.75l-5.5 5.5m3-6.5h3.5v3.5" />
  </svg>
)
