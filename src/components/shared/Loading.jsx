import './Loading.css';

export default function Loading({ fullPage = false, text }) {
  return (
    <div className={`loading ${fullPage ? 'loading--full-page' : 'loading--inline'}`}>
      <div className="loading__ring" />
      {text && <span className="loading__text">{text}</span>}
    </div>
  );
}
