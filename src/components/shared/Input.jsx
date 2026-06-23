import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
  label,
  error,
  icon,
  className = '',
  required,
  ...props
}, ref) => {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        {icon && <div className="input-icon">{icon}</div>}
        
        <input
          ref={ref}
          className={`input-field ${icon ? 'has-icon' : ''} ${error ? 'is-invalid' : ''}`}
          required={required}
          {...props}
        />
      </div>
      
      {error && <div className="input-error-msg">{error}</div>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
