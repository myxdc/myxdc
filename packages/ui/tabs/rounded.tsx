import { Typography } from '../typography'

interface RoundedTabsProps {
  linkComponent?: React.ElementType
  tabs: {
    label: string
    href: string
    active: boolean
    [key: string]: any
  }[]
  className?: string
  [key: string]: any
}

export const RoundedTabs = ({ linkComponent = 'a', tabs, className, ...rest }: RoundedTabsProps) => {
  return (
    <div className={'flex w-full gap-2 p-2 text-center bg-white rounded-full shadow-lg ' + className} {...rest}>
      {tabs.map(({ active, href, label, ...props }, i) => (
        <Typography
          variant="base"
          as={linkComponent}
          key={i}
          className={`flex-1 p-2.5 rounded-full transition-colors cursor-pointer 
          ${active ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'}`}
          weight={500}
          href={href}
          {...props}
        >
          {label}
        </Typography>
      ))}
    </div>
  )
}
