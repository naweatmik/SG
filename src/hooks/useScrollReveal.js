import { useEffect, useRef } from 'react'

/**
 * 요소가 뷰포트에 들어오면 'visible' 클래스를 추가하는 훅
 * @param {Object} options - IntersectionObserver 옵션
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el) // 한 번만 실행
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/**
 * 여러 자식 요소에 순서대로 딜레이를 줘서 stagger 애니메이션
 */
export function useStaggerReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const children = [...container.children]
    children.forEach((child, i) => {
      child.style.setProperty('--stagger-i', i)
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          container.classList.add('stagger-visible')
          observer.unobserve(container)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px', ...options }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return ref
}
