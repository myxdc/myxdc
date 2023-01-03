import { Typography } from '../typography'

export interface AddressInputProps {
  label?: string
  value?: string
  disabled?: boolean
  setValue?: (value: string) => void
  className?: string
}

export const AddressInput = ({
  label = 'Address',
  disabled = false,
  className = '',
  value,
  setValue = () => {},
}: AddressInputProps) => {
  const pasteFromClipboard = () => {
    navigator.clipboard.readText().then((text) => {
      setValue(text)
    })
  }

  return (
    <div className={className}>
      <Typography variant="tiny" className="relative block pl-2 text-gray-500 w-fit h-7" weight={600}>
        {label}
      </Typography>
      <div className="flex pl-4 py-3 rounded-[2rem] pr-2 bg-gray-100 ">
        <input
          className="flex-1 w-full min-w-0 text-xl font-medium text-gray-700 bg-transparent outline-none "
          placeholder="xdc..."
          value={value}
          onChange={(e) => !disabled && setValue(e.target.value)}
          disabled={disabled}
          type="text"
        />
        <button
          className="flex flex-col items-end gap-3 px-4 py-2 ml-2 font-medium transition-colors duration-200 text-primary-600 hover:text-primary-700"
          onClick={() => pasteFromClipboard()}
        >
          Paste
        </button>
      </div>
    </div>
  )
}
