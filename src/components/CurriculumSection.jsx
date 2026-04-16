import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CurriculumSection.css'

gsap.registerPlugin(ScrollTrigger)

const CURRICULUM = [
  {
    id: '01', color: '#8b5cf6',
    tag: '피그마',
    heading: '피그마 기초',
    items: ['인터페이스 & 기본 툴', '오토 레이아웃', '컴포넌트 & 베리언츠', '팀 협업 세팅'],
    note: 'Photoshop · Illustrator 이수 권장',
  },
  {
    id: '02', color: '#22d3ee',
    tag: 'UX · 서비스 설계',
    heading: '사용자 경험 · 와이어프레임 · 프로토타입',
    items: ['인터랙션 기법', '와이어프레임 제작', '모바일/데스크탑 UX 설계', '경쟁사 분석 & 리서치'],
  },
  {
    id: '03', color: '#f472b6',
    tag: '프로토타입 · UI 제작',
    heading: 'Figma 컴포넌트 · 디자인 시스템 · 반응형',
    items: ['컴포넌트화 & 베리언트', '기기별 사이즈 설계', '프로토타입 인터랙션', '디자인 시스템 구축'],
  },
  {
    id: '04', color: '#60a5fa',
    tag: '디자인 완성',
    heading: 'UI 시각 디자인 · 포트폴리오 제작',
    items: ['컬러 & 타이포그래피', '시각 계층 & 정렬', 'QA & 피드백 반영', '포트폴리오 케이스 스터디'],
  },
  {
    id: '05', color: '#fbbf24',
    tag: '카페24 · 상세페이지',
    heading: '쇼핑몰 기획 · 디자인 · 구축 · 운영',
    items: ['상세페이지 기획 & 구조', '실제 상품 디자인 실습', '카페24 구축 & 결제 연동', 'HTML·CSS 스킨 커스터마이징'],
  },
  {
    id: '06', color: '#34d399',
    tag: '웹 개발',
    heading: 'HTML · CSS · JavaScript · jQuery',
    items: ['HTML5 시맨틱 구조', 'CSS3 플렉스 & 그리드', 'JavaScript DOM & 이벤트', 'jQuery & 반응형 레이아웃'],
  },
  {
    id: '07', color: '#a78bfa',
    tag: 'React · 컴포넌트',
    heading: 'React 기반 UI 개발 · 상태관리 · 실무 프로젝트',
    items: ['JSX · Props · State', 'React Hooks', '컴포넌트 설계 & CSS 모듈', '포트폴리오 사이트 완성 & 배포'],
  },
  {
    id: '08', color: '#fb923c',
    tag: '포트폴리오',
    heading: '최종 포트폴리오 제작 · 발표 · 취업 준비',
    items: ['케이스 스터디 정리', '포트폴리오 사이트 퍼블리싱', '이력서 & 자기소개서 첨삭', '취업 연계 & 면접 준비'],
  },
]

export default function CurriculumSection() {
  const headerRef = useRef()
  const listRef   = useRef()

  useEffect(() => {
    gsap.set(headerRef.current, { y: 30, opacity: 0 })
    ScrollTrigger.create({
      trigger: headerRef.current,
      start: 'top 82%',
      onEnter: () => gsap.to(headerRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }),
      once: true,
    })

    const rows = listRef.current.querySelectorAll('.cl-row')
    gsap.set(rows, { x: -24, opacity: 0 })
    ScrollTrigger.create({
      trigger: listRef.current,
      start: 'top 78%',
      onEnter: () =>
        gsap.to(rows, { x: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out' }),
      once: true,
    })

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <section id="curriculum" className="curriculum-section">
      <div className="section-container">

        <div className="section-header" ref={headerRef}>
          <h2 className="section-title">커리큘럼</h2>
          <p className="section-desc">피그마 기초부터 포트폴리오 완성까지 — 총 8단계</p>
        </div>

        <div className="cl-list" ref={listRef}>
            {CURRICULUM.map((c, idx) => (
              <div key={c.id} className="cl-row" style={{ '--c': c.color }}>
                <div className="cl-aside">
                  <span className="cl-num">{c.id}</span>
                  {idx < CURRICULUM.length - 1 && <span className="cl-line" />}
                </div>

                <div className="cl-body">
                  <div className="cl-top">
                    <span className="cl-tag">{c.tag}</span>
                    {c.note && (
                      <span className="cl-note">
                        {c.note}<br />
                        (국민취업지원제도 유형별 자부담금 금액 상이)
                      </span>
                    )}
                  </div>
                  <h3 className="cl-heading">{c.heading}</h3>
                  <div className="cl-pills">
                    {c.items.map((item, i) => (
                      <span key={i} className="cl-pill">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>

      </div>
    </section>
  )
}
