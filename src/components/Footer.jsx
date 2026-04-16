import LogoMark from './LogoMark'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <LogoMark size={26} />
          <span className="footer-logo-text">
            <span className="footer-logo-word">UI/UX</span>
          </span>
        </div>

        <p className="footer-copy">
          © kimtaewan
        </p>
      </div>
    </footer>
  )
}
