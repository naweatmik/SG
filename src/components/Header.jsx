import { useState, useEffect } from 'react'
import LogoMark from './LogoMark'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <div className="nav-logo">
          <LogoMark size={32} />
          <div className="logo-text-group">
            <span className="logo-word">UI/UX</span>
          </div>
        </div>

        <a href="https://www.work24.go.kr/hr/a/a/3100/selectTracseDetl.do?tracseId=AIG20250000530231&tracseTme=1&cstmConsTme=&crseTracseSe=C0061&trainstCstmrId=500020061182&tracseReqstsCd=&focusId=" className="nav-cta" target='_blank'>수강 신청</a>
      </div>
    </header>
  )
}
