import { useEffect, useRef } from 'react'

const COLORS = [
  [139, 92, 246],   // purple
  [34, 211, 238],   // cyan
  [244, 114, 182],  // pink
  [167, 139, 250],  // purple-light
]

function rand(a, b) { return a + Math.random() * (b - a) }

class Firefly {
  constructor(W, H) { this.W = W; this.H = H; this.init() }

  init() {
    this.x = rand(0, this.W)
    this.y = rand(0, this.H)
    this.r = rand(0.8, 1.8)
    this.rgb = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.alpha = rand(0.5, 0.95)
    this.baseAlpha = this.alpha
    // 움직임
    const angle = rand(0, Math.PI * 2)
    const speed = rand(0.5, 1.4)
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed
    // 깜빡임
    this.blinkSpeed = rand(0.02, 0.055)
    this.blinkOffset = rand(0, Math.PI * 2)
    this.t = rand(0, 100)
    // 방향 전환 타이머
    this.turnTimer = rand(40, 120)
    this.turnCount = 0
  }

  update() {
    this.t += this.blinkSpeed
    this.turnCount++
    if (this.turnCount > this.turnTimer) {
      const angle = rand(0, Math.PI * 2)
      const speed = rand(0.5, 1.4)
      this.vx = Math.cos(angle) * speed
      this.vy = Math.sin(angle) * speed
      this.turnTimer = rand(40, 120)
      this.turnCount = 0
    }
    this.x += this.vx
    this.y += this.vy
    // 화면 벗어나면 반대편에서 등장
    if (this.x < -20) this.x = this.W + 20
    if (this.x > this.W + 20) this.x = -20
    if (this.y < -20) this.y = this.H + 20
    if (this.y > this.H + 20) this.y = -20
  }

  draw(ctx) {
    const pulse = 0.5 + 0.5 * Math.sin(this.t + this.blinkOffset)
    const a = this.baseAlpha * (0.3 + 0.7 * pulse)
    const glow = this.r * (1 + 1 * pulse)
    const [r, g, b] = this.rgb

    // 글로우
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glow * 1.25)
    grad.addColorStop(0, `rgba(${r},${g},${b},${a * 0.6})`)
    grad.addColorStop(0.5, `rgba(${r},${g},${b},${a * 0.15})`)
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
    ctx.beginPath()
    ctx.arc(this.x, this.y, glow * 1.25, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()

    // 중심 밝은 점
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r * (0.8 + 0.3 * pulse), 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${a * 0.95})`
    ctx.fill()
  }
}

export default function PageBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W, H
    let flies = []
    const COUNT = 55

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = document.documentElement.scrollHeight
      flies = Array.from({ length: COUNT }, () => new Firefly(W, H))
    }

    // 스크롤에 따라 캔버스 높이 재조정
    const ro = new ResizeObserver(resize)
    ro.observe(document.documentElement)
    resize()

    function draw() {
      ctx.clearRect(0, 0, W, H)
      flies.forEach(f => { f.update(); f.draw(ctx) })
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <>
      {/* 느리게 흐르는 컬러 orb */}
      <div className="page-bg" aria-hidden="true">
        <div className="page-orb orb-1" />
        <div className="page-orb orb-2" />
        <div className="page-orb orb-3" />
        <div className="page-orb orb-4" />
      </div>
      {/* 반딧불이 캔버스 */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
