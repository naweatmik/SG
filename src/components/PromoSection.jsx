import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PromoSection.css'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    icon: '💳',
    title: '국민내일배움카드 발급',
    desc: '고용센터 방문 또는 온라인 신청\n카드 잔액 200만 원 이상 필수',
  },
  {
    num: '02',
    icon: '📋',
    title: '과정 신청',
    desc: 'HRD-Net 또는 work24에서\n본 과정 수강 신청',
  },
  {
    num: '03',
    icon: '🚀',
    title: '수강 시작',
    desc: '담당 멘토쌤과 함께\n실무 포트폴리오 완성까지',
  },
]

const BENEFITS = [
  { icon: '💰', label: '수강료 지원', value: '최대 100%' },
  { icon: '📅', label: '수강 기간', value: '약 6개월' },
  { icon: '🎨', label: '포트폴리오', value: '3개 이상' },
  { icon: '💼', label: '취업 연계', value: '수료 후 지원' },
]

export default function PromoSection() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const costRef = useRef()
  const finalRef = useRef()
  const barGovRef = useRef()
  const stepsRef = useRef()
  const benefitsRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 타이틀
      gsap.set(titleRef.current, { y: 30, opacity: 0 })
      gsap.to(titleRef.current, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      })

      // 비용 카드 — 전체 페이드
      gsap.set(costRef.current, { opacity: 0, y: 20 })
      gsap.to(costRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: costRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      })

      // 최종 가격 숫자 — scale up 강조
      gsap.set(finalRef.current, { scale: 0.4, opacity: 0 })
      gsap.to(finalRef.current, {
        scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.55)',
        scrollTrigger: { trigger: costRef.current, start: 'top 78%', toggleActions: 'play none none none' },
        delay: 0.2,
      })

      // 바 — width 0 → 92%
      gsap.set(barGovRef.current, { width: '0%' })
      gsap.to(barGovRef.current, {
        width: '92%', duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: costRef.current, start: 'top 78%', toggleActions: 'play none none none' },
        delay: 0.4,
      })

      // 스텝 카드 stagger
      const stepCards = stepsRef.current.querySelectorAll('.promo-step')
      gsap.set(stepCards, { y: 50, opacity: 0 })
      gsap.to(stepCards, {
        y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 78%', toggleActions: 'play none none none' },
      })

      // 혜택 카드 stagger
      const benefitCards = benefitsRef.current.querySelectorAll('.promo-benefit')
      gsap.set(benefitCards, { y: 30, opacity: 0, scale: 0.9 })
      gsap.to(benefitCards, {
        y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: benefitsRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="promo-section" ref={sectionRef}>
      {/* 배경 글로우 */}
      <div className="promo-glow promo-glow-l" />
      <div className="promo-glow promo-glow-r" />

      <div className="section-container">

        {/* 헤더 */}
        <div className="promo-header">
          <h2 className="promo-title" ref={titleRef}>
            396만원의 가치를 <br /> 단 <span className="promo-hl">30만원</span> <br />지금 당신의 커리어를 업그레이드하세요.
          </h2>
        </div>

        {/* 비용 비교 카드 */}
        <div className="promo-cost-card" ref={costRef}>
          <div className="cost-saving-badge">92% 절감</div>

          <div className="cost-top">
            <span className="cost-original">정가 <s>3,960,000원</s></span>
            <span className="cost-arrow">→</span>
            <span className="cost-final" ref={finalRef}>300,000<small>원</small></span>
          </div>

          <div className="cost-bar-wrap">
            <div className="cost-bar">
              <div className="cost-bar-gov" ref={barGovRef}>
                <span className="cost-bar-label">국비 지원 92%</span>
              </div>
              <div className="cost-bar-self">
                <span className="cost-bar-label">자부담 8%</span>
              </div>
            </div>
          </div>

          <p className="cost-note">국민내일배움카드 발급 시 최대 100% 지원</p>
        </div>

        {/* 신청 단계 */}
        <div className="promo-steps-wrap" ref={stepsRef}>
          <p className="promo-steps-title">신청 방법 3단계</p>
          <div className="promo-steps">
            {STEPS.map((step, i) => (
              <div className="promo-step" key={step.num}>
                <div className="step-icon">{step.icon}</div>
                <div className="step-num">{step.num}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
                {i < STEPS.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>
        </div>

        {/* 혜택 요약 */}
        <div className="promo-benefits" ref={benefitsRef}>
          {BENEFITS.map(b => (
            <div className="promo-benefit" key={b.label}>
              <span className="benefit-icon">{b.icon}</span>
              <span className="benefit-value">{b.value}</span>
              <span className="benefit-label">{b.label}</span>
            </div>
          ))}
        </div>

        {/* 주의사항 */}
        <p className="promo-notice">
          ※ 국민내일배움카드 발급 필수 · 카드 잔액 200만 원 이상 · 자세한 문의 <strong>053-427-8555</strong>
        </p>

      </div>
    </section >
  )
}
