import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CtaSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function CtaSection() {
  const sectionRef = useRef()

  useEffect(() => {
    const el = sectionRef.current
    const cards = el.querySelectorAll('.cta-card')
    gsap.set(cards, { y: 36, opacity: 0, scale: 0.97 })
    ScrollTrigger.create({
      trigger: el,
      start: 'top 78%',
      onEnter: () =>
        gsap.to(cards, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }),
      once: true,
    })
    return () => ScrollTrigger.getAll().forEach(s => s.kill())
  }, [])

  return (
    <section id="cta" className="cta-section" ref={sectionRef}>
      {/* 배경 오로라 */}
      <div className="cta-aurora cta-aurora-l" />
      <div className="cta-aurora cta-aurora-r" />

      <div className="section-container">
        <div className="cta-bento">

          {/* 메인 카드 — 헤드라인 */}
          <div className="cta-card cta-main">
            <div className="cta-noise" />
            <span className="cta-eyebrow">지금 시작할 때입니다</span>
            <h2 className="cta-headline">
              실무 포트폴리오<br />
              <span className="cta-hl">6개월 완성</span>
            </h2>
            <p className="cta-desc">
              국비 100% 지원 · 담당 멘토 1:1 관리<br />
              취업 연계까지 끝까지 함께합니다
            </p>
            <a
              href="https://www.work24.go.kr/hr/a/a/3100/selectTracseDetl.do?tracseId=AIG20250000530231&tracseTme=1&cstmConsTme=&crseTracseSe=C0061&trainstCstmrId=500020061182&tracseReqstsCd=&focusId="
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              수강 신청하기
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* 문의 */}
          <div className="cta-card cta-contact-card">
            <span className="cta-card-label">개별 문의</span>
            <p className="cta-contact-desc">담당 멘토쌤한테 직접문의하세요</p>
            <a href="tel:053-427-8555" className="cta-tel">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 10.5c0 .3-.1.6-.2.8-.2.2-.4.4-.6.5-.4.2-.9.2-1.4.1-.8-.2-1.7-.6-2.5-1.2C7.5 10 6.8 9.3 6.2 8.5c-.6-.8-1-1.7-1.2-2.5C4.9 5.5 4.9 5 5.1 4.6c.1-.2.3-.4.5-.6.2-.1.5-.2.8-.2.1 0 .2 0 .3.1l1.5 2.1c.1.1.1.2 0 .3L7.4 7c-.1.1-.1.2 0 .3.3.5.6.9 1 1.3.4.4.8.7 1.3 1 .1.1.2.1.3 0l.7-.8c.1-.1.2-.1.3 0L13 10.2c.1.1.1.2 0 .3z" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
              053-427-8555
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
