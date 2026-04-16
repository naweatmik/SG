import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTilt } from '../hooks/useTilt'
import './ReasonsSection.css'

const REASONS = [
  {
    id: '01',
    icon: '🤖',
    color: 'pink',
    title: 'AI 시대일수록 사람의 감각이 더 희귀해진다',
    body: 'AI는 레이아웃을 생성하고 코드를 짠다. 하지만 "이 화면이 사용자에게 불편한가?"는 AI가 판단하지 못한다. 사람이 느끼는 불편함을 읽어내는 UX 감각은 AI가 대체할 수 없는 영역이다.',
    keywords: ['AI 한계', '사용자 감각', '디자인 직관'],
  },
  {
    id: '02',
    icon: '🚀',
    color: 'blue',
    title: '6개월 안에 취업 가능한 가장 빠른 IT 직군',
    body: '개발자는 최소 1~2년이 필요하다. UI/UX 디자이너는 다르다. 툴 숙련 + 포트폴리오 3개면 취업 시장에 진입할 수 있다. 국비지원으로 비용 부담도 없다.',
    keywords: ['빠른 취업', '6개월 완성', '국비지원'],
  },
  {
    id: '03',
    icon: '📈',
    color: 'yellow',
    title: 'UI/UX 디자이너, 지금 취업 시장에서 폭발 중이다',
    body: '사람인·원티드·링크드인 기준 UI/UX 디자이너 채용 공고는 매년 30% 이상 증가하고 있다. 스타트업부터 대기업까지, 제품을 만드는 모든 곳에 UX 인재가 필요하다. 공급보다 수요가 훨씬 많다.',
    keywords: ['채용 급증', '스타트업 수요', '대기업 채용'],
  },
]

function ReasonCard({ reason, index }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(8)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] } },
      }}
      style={{ position: 'relative', height: '100%' }}
    >
      {/* Aceternity hover glow — Spotlight cursor effect */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              inset: '-1px',
              borderRadius: '20px',
              background: 'radial-gradient(600px circle at 50% 50%, rgba(139,92,246,.12), transparent 60%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      <div
        className={`reason-card color-${reason.color}`}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); handleMouseLeave() }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="reason-top">
          <span className="reason-icon">{reason.icon}</span>
          <span className="reason-num-badge">{reason.id}</span>
        </div>
        <h3 className="reason-title">{reason.title}</h3>
        <p className="reason-text">{reason.body}</p>
        <div className="keyword-list">
          {reason.keywords.map(k => (
            <span key={k} className="keyword">{k}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ReasonsSection() {
  const titleRef = useScrollReveal()

  return (
    <section id="reasons" className="reasons-section">
      <div className="section-container">
        <div className="section-header reveal" ref={titleRef}>
          <h2 className="section-title">
            UI/UX를 배워야 하는 이유
          </h2>
          <p className="section-desc">
            AI 시대, 코드보다 방향이 더 중요해졌다
          </p>
        </div>

        <motion.div
          className="reasons-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {REASONS.map((r, i) => <ReasonCard key={r.id} reason={r} index={i} />)}
        </motion.div>
      </div>
    </section>
  )
}
