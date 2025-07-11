'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

export default function FuturisticCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = isMobile ? 200 : 400
      setIsMobile(window.innerWidth < 768)
    }

    resize()

    let bgParticles: any[] = []
    let textParticles: any[] = []
    let textImageData: ImageData | null = null
    let scale = 1

    const sigmoid = (x: number) => 1 / (1 + Math.exp(-x))

    const memoryMap = Array.from({ length: 50 }, () => Array(50).fill(0))

    const trackMemory = (x: number, y: number) => {
      const gx = Math.floor((x / canvas!.width) * 50)
      const gy = Math.floor((y / canvas!.height) * 50)
      if (gx >= 0 && gx < 50 && gy >= 0 && gy < 50) {
        memoryMap[gx][gy] += 1
      }
    }

    const getEnergyFromMemory = (x: number, y: number) => {
      const gx = Math.floor((x / canvas!.width) * 50)
      const gy = Math.floor((y / canvas!.height) * 50)
      if (gx >= 0 && gx < 50 && gy >= 0 && gy < 50) {
        return sigmoid(memoryMap[gx][gy] / 20)
      }
      return 0
    }

    const createTextImage = () => {
      if (!ctx || !canvas) return 0
      const logoHeight = isMobile ? 60 : 120
      const fontSize = logoHeight

      ctx.font = `${fontSize}px 'Orbitron', sans-serif`
      ctx.shadowColor = '#000000ff'
      ctx.shadowBlur = 40
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.fillStyle = '#ffffff'
      const text = 'ENY-GNA'
      const textWidth = ctx.measureText(text).width
      ctx.save()
      ctx.translate(canvas.width / 2 - textWidth / 2, canvas.height / 2 + fontSize / 3)
      ctx.fillText(text, 0, 0)
      ctx.restore()

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return fontSize / 100
    }

    const createBackgroundParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      phase: Math.random() * Math.PI * 2,
      energy: Math.random() * 0.5 + 0.5,
      hue: Math.floor(Math.random() * 360)
    })

    const createTextParticle = () => {
      if (!textImageData || !canvas) return null
      const data = textImageData.data
      for (let i = 0; i < 100; i++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)
        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          return {
            x, y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1.5 + 0.5,
            opacity: 1,
            energy: Math.random() * 0.5 + 0.5,
            phase: Math.random() * Math.PI * 2,
            hue: Math.floor(Math.random() * 360)
          }
        }
      }
      return null
    }

    const initParticles = () => {
      bgParticles = Array.from({ length: isMobile ? 40 : 80 }, createBackgroundParticle)
      const textCount = Math.floor(7000 * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)))
      textParticles = []
      for (let i = 0; i < textCount; i++) {
        const p = createTextParticle()
        if (p) textParticles.push(p)
      }
    }

    let frameId: number

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = performance.now() * 0.002
      const { x: mouseX, y: mouseY } = mouseRef.current

      trackMemory(mouseX, mouseY)

      for (let p of bgParticles) {
        const qOsc = Math.sin(time + p.phase) * p.energy * 2
        p.x += Math.cos(p.phase + time * 1.5) * 0.5 + qOsc * 0.2
        p.y += Math.sin(p.phase + time * 1.5) * 0.5 + qOsc * 0.2

        p.hue = (p.hue + 1) % 360

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${p.hue}, 80%, 70%)`
        ctx.fill()
      }

      for (let p of textParticles) {
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const attract = sigmoid(3 - dist / 80) + getEnergyFromMemory(p.x, p.y) * 2
        const quantumFlux = Math.sin(time + p.phase) * p.energy * 2

        p.x += (p.baseX - p.x) * 1.06 + dx * 0.0003 * attract + quantumFlux * 0.02
        p.y += (p.baseY - p.y) * 1.06 + dy * 0.0003 * attract + quantumFlux * 0.02
        p.hue = (p.hue + 2) % 360

        ctx.beginPath()
        ctx.fillStyle = `hsl(${p.hue}, 90%, 90%)`
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }

      frameId = requestAnimationFrame(animate)
    }

    scale = createTextImage()
    initParticles()
    animate()

    const onResize = () => {
      resize()
      scale = createTextImage()
      initParticles()
    }

    const onMove = (x: number, y: number) => {
      mouseRef.current = { x, y }
    }

    window.addEventListener('resize', onResize)
    canvas.addEventListener('mousemove', e => onMove(e.clientX, e.clientY))
    canvas.addEventListener('touchmove', e => {
      if (e.touches.length > 0) {
        e.preventDefault()
        onMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }, { passive: false })

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frameId)
    }
  }, [isMobile])

  return (
    <div className="relative w-full h-[120px] flex items-center justify-center bg-transparent">
      <canvas ref={canvasRef} className="w-full h-full absolute top-0 left-0 touch-none bg-transparent" />
      <div className="absolute bottom-5 text-center z-10">
        
      </div>
    </div>
  )
}
