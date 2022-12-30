interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  children?: React.ReactNode
  label?: string
  placeholder?: string
  disabled?: boolean
  type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url'
  [key: string]: any
}

export const Input = ({
  onChange,
  className = '',
  children,
  placeholder,
  label,
  disabled = false,
  type = 'text',
  ...props
}: InputProps) => {
  return (
    <div className="relative">
      <label htmlFor={'input/' + label} className="sr-only">
        {label}
      </label>

      <input
        id={'input/' + label}
        placeholder={placeholder}
        className={'w-full px-4 py-3 pr-10 bg-gray-100 border border-gray-200 rounded-md shadow-sm ' + className}
        type={type}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />

      <span className="absolute inset-y-0 right-0 grid w-10 text-gray-500 pointer-events-none place-content-center">
        {children}
      </span>
    </div>
  )
}
