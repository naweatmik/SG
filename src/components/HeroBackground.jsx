import { useEffect, useRef } from 'react'

const COLORS = {
  purple: [139, 92, 246],
  cyan: [34, 211, 238],
  pink: [244, 114, 182],
}

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

export default function HeroBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W, H

    // --- Particles ---
    const COUNT = 72
    const particles = []

    function resize() {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    class Particle {
      constructor() { this.reset(true) }

      reset(init = false) {
        this.x = randomBetween(0, W)
        this.y = init ? randomBetween(0, H) : randomBetween(-20, -10)
        this.vx = randomBetween(-0.18, 0.18)
        this.vy = randomBetween(0.1, 0.32)
        this.r = randomBetween(1.2, 2.8)
        const keys = Object.keys(COLORS)
        const key = keys[Math.floor(Math.random() * keys.length)]
        this.rgb = COLORS[key]
        this.alpha = randomBetween(0.35, 0.9)
        this.twinkleSpeed = randomBetween(0.004, 0.012)
        this.twinkleOffset = Math.random() * Math.PI * 2
        this.t = 0
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.t += this.twinkleSpeed
        if (this.y > H + 20) this.reset()
      }

      draw(ctx, now) {
        const pulse = 0.5 + 0.5 * Math.sin(this.t + this.twinkleOffset)
        const a = this.alpha * (0.6 + 0.4 * pulse)
        const [r, g, b] = this.rgb
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`
        ctx.fill()
      }
    }

    resize()
    for (let i = 0; i < COUNT; i++) particles.push(new Particle())

    // --- Orbs (gradient blobs) ---
    const orbs = [
      { x: 0.2, y: 0.25, r: 0.38, rgb: COLORS.purple, a: 0.13, speed: 0.00018, phase: 0 },
      { x: 0.75, y: 0.55, r: 0.32, rgb: COLORS.cyan,   a: 0.10, speed: 0.00024, phase: 1.8 },
      { x: 0.5,  y: 0.8,  r: 0.28, rgb: COLORS.pink,   a: 0.09, speed: 0.00020, phase: 3.5 },
    ]

    function drawOrbs(t) {
      orbs.forEach(o => {
        const cx = (o.x + 0.06 * Math.sin(t * o.speed + o.phase)) * W
        const cy = (o.y + 0.06 * Math.cos(t * o.speed * 1.3 + o.phase)) * H
        const radius = o.r * Math.max(W, H)
        const [r, g, b] = o.rgb
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        grad.addColorStop(0, `rgba(${r},${g},${b},${o.a})`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      })
    }

    // --- Grid ---
    function drawGrid() {
      const SIZE = 52
      ctx.strokeStyle = 'rgba(255,255,255,0.028)'
      ctx.lineWidth = 1
      for (let x = 0; x < W; x += SIZE) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += SIZE) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }
    }

    // --- Connections between nearby particles ---
    const MAX_DIST = 130

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const t = 1 - dist / MAX_DIST
            const [r, g, b] = particles[i].rgb
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${r},${g},${b},${t * 0.25})`
            ctx.lineWidth = t * 0.9
            ctx.stroke()
          }
        }
      }
    }

    let startTime = performance.now()

    function draw(now) {
      const elapsed = now - startTime

      ctx.clearRect(0, 0, W, H)

      // Background
      ctx.fillStyle = '#020205'
      ctx.fillRect(0, 0, W, H)

      // Layers
      drawGrid()
      drawOrbs(elapsed)
      drawConnections()
      particles.forEach(p => { p.update(); p.draw(ctx, elapsed) })

      // Vignette
      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9)
      vignette.addColorStop(0, 'rgba(2,2,5,0)')
      vignette.addColorStop(1, 'rgba(2,2,5,0.7)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, W, H)

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
      }}
    />
  )
}
