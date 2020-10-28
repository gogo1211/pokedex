import * as React from 'react'

interface InputProps {
  label?: string
  value?: string
  placeholder?: string
  helper?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  placeholder,
  helper,
  onChange
}) => {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder={placeholder || ''}
          value={value}
          onChange={onChange}
        />
      </div>
      {helper && <p className="help">{helper}</p>}
    </div>
  )
}

export default Input
