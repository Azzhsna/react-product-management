import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setClosing(false);
      document.body.style.overflow = 'hidden';
    } else if (visible) {
      handleClose();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      document.body.style.overflow = '';
      onClose?.();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible, handleClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!visible) return null;

  return createPortal(
    <div
      className={`modal-overlay${closing ? ' modal-overlay--closing' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={`modal-panel modal-panel--${size}`}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={handleClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
