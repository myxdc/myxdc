import { SVGProps } from 'react'

const SettingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.144 17.883H4.67" />
      <path
        clipRule="evenodd"
        d="M15.205 17.884c0 2.042.68 2.722 2.722 2.722 2.04 0 2.721-.68 2.721-2.722s-.68-2.722-2.721-2.722-2.722.68-2.722 2.722Z"
      />
      <path d="M14.177 7.394h6.471" />
      <path
        clipRule="evenodd"
        d="M10.115 7.393c0-2.041-.68-2.722-2.722-2.722-2.041 0-2.722.681-2.722 2.722 0 2.042.68 2.722 2.722 2.722 2.041 0 2.722-.68 2.722-2.722Z"
      />
    </g>
  </svg>
)

export default SettingsIcon
