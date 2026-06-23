import './Input.css';

export default function Input({
  label,
  type = 'text',
  placeholder = ' ',
  value,
  onChange,
  error,
  icon,
  name,
  required = false,
}) {
  const fieldClasses = [
    'input-field',
    icon ? 'input-field--has-icon' : '',
    error ? 'input-field--error' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = [
    'input-label',
    icon ? 'input-label--has-icon' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-group">
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          className={fieldClasses}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          id={name}
        />
        {label && (
          <label className={labelClasses} htmlFor={name}>
            {label}
            {required && ' *'}
          </label>
        )}
      </div>
      {error && (
        <span className="input-error-message">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}
