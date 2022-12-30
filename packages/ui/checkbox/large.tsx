import { Typography } from '../typography'

interface LargeCheckBoxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  title: string
  description?: string
  className?: string
  type?: 'radio' | 'checkbox'
}

export const LargeCheckBox = ({
  checked = false,
  onChange,
  title,
  description,
  className = '',
  type = 'radio',
}: LargeCheckBoxProps) => {
  return (
    <label
      className={`flex w-full py-6 rounded-lg cursor-pointer bg-gray-100  transition duration-200 ease-in-out ${
        checked ? 'bg-primary-200' : 'hover:bg-gray-200'
      } ${className}`}
    >
      <input
        type={type}
        value={title}
        checked={checked}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.checked)
          }
        }}
        className="w-8 ml-4 mr-4"
      />
      <div className="pr-4">
        <Typography variant="h6" weight={500} className="text-gray-800">
          {title}
        </Typography>
        <Typography variant="p" className="mt-3 text-gray-500" weight={300}>
          {description}
        </Typography>
      </div>
    </label>
  )
}
