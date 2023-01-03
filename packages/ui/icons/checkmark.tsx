import * as React from 'react'
import { SVGProps } from 'react'

export const CheckMarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={800} height={800} viewBox="0 -1.5 12 12" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.707 4.293A1 1 0 0 0 .293 5.707l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.293.293L4 6.586 1.707 4.293z"
      fill="currentColor"
    />
  </svg>
)
