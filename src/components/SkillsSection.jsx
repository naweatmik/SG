import { motion } from 'framer-motion'
import './SkillsSection.css'

const TARGETS = [
  { icon: '🚀', title: '취업 준비생',      desc: 'UX/UI 디자이너 · 웹 퍼블리셔 · 프론트엔드로 취업을 목표로 하는 분', accent: '#f472b6' },
  { icon: '🔄', title: '직무 전환 희망자',  desc: '타 직종에서 디자인 · 웹 분야로 전환하고 실무 포트폴리오가 필요한 분', accent: '#fbbf24' },
  { icon: '💼', title: '재직자 · 프리랜서', desc: '현업 역량을 높이거나 쇼핑몰 · 상세페이지 제작 능력이 필요한 분',    accent: '#a78bfa' },
  { icon: '🏪', title: '1인 창업 · 소상공인', desc: '직접 브랜딩 · 홈페이지 · 카페24 쇼핑몰을 구축하고 운영하고 싶은 분', accent: '#34d399' },
]

const JOBS = [
  { color: '#8b5cf6', icon: '✦', title: 'UI/UX 디자이너',   desc: '사용자 경험을 설계하고 인터페이스를 디자인하는 핵심 직군. IT 기업·스타트업 수요 1위.', tags: ['Figma', '프로토타입', '서비스 설계'] },
  { color: '#22d3ee', icon: '◈', title: '웹 디자이너',       desc: '웹사이트 시각 디자인 전반을 담당. 에이전시·인하우스 디자인팀에서 폭넓게 활동.',     tags: ['웹 디자인', '브랜딩', '시각 시스템'] },
  { color: '#f472b6', icon: '◇', title: '웹 퍼블리셔',       desc: '디자인을 HTML·CSS로 구현하는 퍼블리싱 전문 직군. 기업 채용 수요가 꾸준히 높다.',     tags: ['HTML/CSS', 'jQuery', '반응형'] },
  { color: '#60a5fa', icon: '▣', title: '모바일 앱 디자이너', desc: '모바일·태블릿 기기별 UX 설계 역량 보유. 앱 서비스 중심 IT 기업·스타트업 취업에 유리.', tags: ['앱 디자인', '모바일 UX', '기기 대응'] },
  { color: '#fbbf24', icon: '◉', title: '쇼핑몰 운영·MD',    desc: '카페24 기반 쇼핑몰 구축부터 운영까지. 상세페이지 기획·디자인으로 독립 창업도 가능.',  tags: ['카페24', '상세페이지', '이커머스'] },
  { color: '#34d399', icon: '◎', title: '프리랜서 디자이너',  desc: '클라이언트 프로젝트 단위로 활동. 포트폴리오 완성 후 즉시 수주 가능한 실전 역량 보유.', tags: ['포트폴리오', '프리랜서', '외주'] },
]

function TargetCard({ target, index }) {
  return (
    <motion.div
      className="tc-card"
      style={{ '--accent': target.accent }}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="tc-icon">{target.icon}</span>
      <h3 className="tc-title">{target.title}</h3>
      <p className="tc-desc">{target.desc}</p>
      <div className="tc-bar" />
    </motion.div>
  )
}

function JobCard({ job, index }) {
  return (
    <motion.div
      className="job-card"
      style={{ '--accent': job.color }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="job-card-bar" style={{ background: job.color }} />
      <div className="job-icon" style={{ color: job.color }}>{job.icon}</div>
      <h4 className="job-title" style={{ color: job.color }}>{job.title}</h4>
      <p className="job-desc">{job.desc}</p>
      <div className="job-tags">
        {job.tags.map((tag) => (
          <span key={tag} className="job-tag" style={{ color: job.color }}>{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-container">

        <div className="tc-layout">
          <div className="tc-sticky">
            <h2 className="section-title">이런 분께 딱입니다</h2>
            <p className="section-desc">
              비전공자의 기초부터<br />창업자의 실전까지,<br />당신의 배경을 실력으로 바꿉니다
            </p>
          </div>
          <div className="tc-cards">
            {TARGETS.map((t, i) => <TargetCard key={t.title} target={t} index={i} />)}
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">취업</h2>
          <p className="section-desc">국비과정 수료 후 취업할 수 있는 직군과 업계</p>
        </div>

        <div className="jobs-grid">
          {JOBS.map((job, i) => <JobCard key={job.title} job={job} index={i} />)}
        </div>

      </div>
    </section>
  )
}
