import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTilt } from '../hooks/useTilt'
import './WhySection.css'

function TiltCard({ className, children }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(10)
  return (
    <div
      className={`why-card ${className}`}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function WhySection() {
  const titleRef = useScrollReveal()
  const quoteRef = useScrollReveal()

  return (
    <section id="why" className="why-section">
      <div className="section-container">
        <div className="section-header reveal" ref={titleRef}>
          <h2 className="section-title">
            AI가 못 하는 것들
          </h2>
          <p className="section-desc">
            기술에 의존하는 디자이너는 대체되지만, 기술을 부리는 디자이너는 독보적인 존재가 됩니다.
          </p>
        </div>

        <div className="why-grid">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0}
          >
            <TiltCard className="ai-can">
              <div className="card-header">
                <span className="card-icon">🤖</span>
                <h3>AI가 <span className="text-cyan">할 수 있는</span> 것</h3>
              </div>
              <ul className="card-list">
                {['코드 자동 생성', '이미지 생성', '레이아웃 초안', '색상 팔레트 추천', '반복 작업 자동화', '기본 와이어프레임'].map(item => (
                  <li key={item} className="list-item">
                    <span className="check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>

          <div className="vs-divider">
            <div className="vs-line" />
            <span className="vs-text">VS</span>
            <div className="vs-line" />
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={1}
          >
            <TiltCard className="ai-cannot">
              <div className="card-header">
                <span className="card-icon">🧠</span>
                <h3>AI가 <span className="text-pink">못 하는</span> 것</h3>
              </div>
              <ul className="card-list">
                {['사용자 감정 이해', '문화적 맥락 해석', '브랜드 아이덴티티', '진정한 공감 디자인', '비즈니스 목표 연결', '윤리적 판단'].map(item => (
                  <li key={item} className="list-item">
                    <span className="cross">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>
        </div>

        <div className="why-quote reveal" ref={quoteRef}>
          <motion.div
            className="quote-box"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              AI는 <strong>도구</strong>다. 도구를 제대로 쓰려면,<br />
              <strong>무엇을 만들어야 하는지</strong> 아는 사람이 필요하다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
