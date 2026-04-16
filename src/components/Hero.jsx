import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import HeroBackground from './HeroBackground'
import Hero3D from './Hero3D'
import './Hero.css'

const STATS = [
  { value: '100%', label: '국비 지원' },
  { value: '14주', label: '커리큘럼' },
  { value: '3개+', label: '포트폴리오' },
]

export default function Hero() {
  const line1Ref = useRef()
  const line2Ref = useRef()
  const subRef   = useRef()
  const actRef   = useRef()
  const statsRef = useRef()
  const btnRef   = useRef()

  /* ── 입장 타임라인 ── */
  useEffect(() => {
    const line1Chars = line1Ref.current.querySelectorAll('.char')
    const line2Chars = line2Ref.current.querySelectorAll('.char')
    const statItems  = statsRef.current.querySelectorAll('.stat-item')

    gsap.set(line1Chars,      { y: 72, opacity: 0, rotationX: -50, transformOrigin: '50% 100%' })
    gsap.set(line2Chars,      { y: 72, opacity: 0, rotationX: -50, transformOrigin: '50% 100%' })
    gsap.set(subRef.current,  { y: 22, opacity: 0, filter: 'blur(10px)' })
    gsap.set(actRef.current,  { y: 18, opacity: 0, scale: 0.92 })
    gsap.set(statItems,       { y: 28, opacity: 0, scale: 0.82 })

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.to(line1Chars, {
        y: 0, opacity: 1, rotationX: 0,
        duration: 0.75,
        stagger: 0.032,
        delay: 0.15,
      })
      .to(line2Chars, {
        y: 0, opacity: 1, rotationX: 0,
        duration: 0.75,
        stagger: 0.028,
      }, '-=0.45')
      .to(subRef.current, {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: 0.9,
      }, '-=0.4')
      .to(actRef.current, {
        y: 0, opacity: 1, scale: 1,
        duration: 0.6,
      }, '-=0.55')
      .to(statItems, {
        y: 0, opacity: 1, scale: 1,
        duration: 0.55,
        stagger: 0.1,
      }, '-=0.45')

    return () => tl.kill()
  }, [])

  /* ── 버튼 글로우 pulse 루프 ── */
  useEffect(() => {
    const pulse = gsap.to(btnRef.current, {
      boxShadow: '0 0 52px rgba(139,92,246,0.75), 0 8px 32px rgba(0,0,0,0.4)',
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2,
    })
    return () => pulse.kill()
  }, [])

  /* ── 버튼 magnetic ── */
  const handleBtnMove = (e) => {
    const btn  = btnRef.current
    const rect = btn.getBoundingClientRect()
    const dx   = e.clientX - (rect.left + rect.width  / 2)
    const dy   = e.clientY - (rect.top  + rect.height / 2)
    gsap.to(btn, { x: dx * 0.28, y: dy * 0.22, duration: 0.35, ease: 'power2.out' })
  }
  const handleBtnLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,0.5)' })
  }

  return (
    <section className="hero">
      <HeroBackground />
      <div className="hero-overlay" />
      <Hero3D />

      <div className="hero-content">

        <h1 className="hero-title">
          <span className="hero-title-line1" ref={line1Ref} style={{ perspective: '600px' }}>
            {'AI 시대에도'.split('').map((ch, i) => (
              <span key={i} className="char" style={{ display: 'inline-block' }}>
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </span>
          <span className="hero-title-line2" ref={line2Ref} style={{ perspective: '600px' }}>
            {'UI/UX를 배워야 한다'.split('').map((ch, i) => (
              <span key={i} className="char" style={{ display: 'inline-block' }}>
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-sub" ref={subRef}>
          AI가 다 만들어 주는 세상. 그래도{' '}
          <span className="hl">사람의 감각</span>과{' '}
          <span className="hl">디자인 사고</span>는 사라지지 않는다.
        </p>

        <div className="hero-actions" ref={actRef}>
          <a
            href="#reasons"
            className="btn-primary"
            ref={btnRef}
            onMouseMove={handleBtnMove}
            onMouseLeave={handleBtnLeave}
          >
            이유가 궁금하다면 →
          </a>
        </div>

        <div className="hero-stats" ref={statsRef}>
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-item">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>

      <div className="hero-scroll">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span className="scroll-label">Scroll</span>
      </div>
    </section>
  )
}
