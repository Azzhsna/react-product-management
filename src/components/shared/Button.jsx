import './Button.css';

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    loading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading && <span className="btn__spinner" />}
      <span className="btn__content">
        {icon && <span className="btn__icon">{icon}</span>}
        {children}
      </span>
    </button>
  );
}
