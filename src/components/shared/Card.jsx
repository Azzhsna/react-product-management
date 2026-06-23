import './Card.css';

export default function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
}) {
  const classes = [
    'card',
    hoverable ? 'card--hoverable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}
