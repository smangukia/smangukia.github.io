"use client"

import { useEffect, useRef } from "react"

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasDimensions = () => {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    updateCanvasDimensions()

    // Mouse position tracking
    let mouseX = canvas!.width / 2
    let mouseY = canvas!.height / 2
    let isMouseActive = false

    // Colors
    const colors = {
      stars: ["#FFFFFF", "#FFFFDD", "#EEEEFF", "#FFDDDD", "#DDFFEE"],
      nebula: ["#FF5E5B", "#00CECB", "#8A2BE2", "#FFED66", "#3B82F6"],
      quantum: ["#00CECB", "#8A2BE2", "#FF5E5B"],
    }

    // Stars with parallax effect and improved rendering
    class Star {
      x!: number
      y!: number
      z!: number
      size!: number
      baseSize!: number
      color!: string
      speed!: number
      twinkleSpeed!: number
      twinklePhase!: number
      flareSize!: number
      flareIntensity!: number
      flareAngle!: number
      flareRotationSpeed!: number
      screenX!: number
      screenY!: number
      isTransforming!: boolean
      transformProgress!: number
      transformAngle!: number
      transformSpeed!: number
      tailLength!: number
      isActive!: boolean

      constructor() {
        this.z = Math.random() * 1000 + 1 // depth
        this.x = Math.random() * canvas!.width * 2 - canvas!.width
        this.y = Math.random() * canvas!.height * 2 - canvas!.height
        this.baseSize = Math.random() * 1.5 + 0.5
        this.size = this.baseSize
        this.color = colors.stars[Math.floor(Math.random() * colors.stars.length)]
        this.speed = Math.random() * 0.5 + 0.1

        // Twinkle effect parameters
        this.twinkleSpeed = Math.random() * 0.05 + 0.01
        this.twinklePhase = Math.random() * Math.PI * 2

        // Star flare parameters (only for larger stars)
        this.flareSize = Math.random() * 4 + 2
        this.flareIntensity = Math.random() * 0.3 + 0.1
        this.flareAngle = Math.random() * Math.PI * 2
        this.flareRotationSpeed = (Math.random() - 0.5) * 0.01

        // Screen coordinates (for interaction)
        this.screenX = 0
        this.screenY = 0

        // Shooting star transformation properties
        this.isTransforming = false
        this.transformProgress = 0
        this.transformAngle = 0
        this.transformSpeed = 0
        this.tailLength = 0
        this.isActive = true
      }

      update(mouseX: number, mouseY: number, time: number) {
        if (this.isTransforming) {
          // Update as shooting star
          this.x += Math.cos(this.transformAngle) * this.transformSpeed
          this.y += Math.sin(this.transformAngle) * this.transformSpeed
          this.transformProgress += 0.01

          // Check if off screen
          this.screenX = (this.x / this.z) * 500 + canvas!.width / 2
          this.screenY = (this.y / this.z) * 500 + canvas!.height / 2

          if (
            this.screenX < -100 ||
            this.screenX > canvas!.width + 100 ||
            this.screenY < -100 ||
            this.screenY > canvas!.height + 100
          ) {
            // Reset as a new star
            this.isTransforming = false
            this.z = 1000
            this.x = Math.random() * canvas!.width * 2 - canvas!.width
            this.y = Math.random() * canvas!.height * 2 - canvas!.height
            this.isActive = true
          }
        } else {
          // Move stars based on depth (parallax)
          this.z -= this.speed

          // Reset star when it gets too close
          if (this.z <= 0) {
            this.z = 1000
            this.x = Math.random() * canvas!.width * 2 - canvas!.width
            this.y = Math.random() * canvas!.height * 2 - canvas!.height
          }

          // Subtle mouse influence on star movement - REDUCED SPEED
          if (isMouseActive) {
            // Reduced from 0.001 to 0.0003 for slower movement
            const dx = (mouseX - canvas!.width / 2) * 0.0003
            const dy = (mouseY - canvas!.height / 2) * 0.0003
            this.x -= dx * (1000 / this.z)
            this.y -= dy * (1000 / this.z)
          }

          // Twinkle effect - vary the size slightly over time
          this.twinklePhase += this.twinkleSpeed
          const twinkleFactor = 0.2 * Math.sin(this.twinklePhase + time * 0.001)
          this.size = this.baseSize * (1 + twinkleFactor)

          // Rotate flare
          this.flareAngle += this.flareRotationSpeed

          // Calculate screen position
          this.screenX = (this.x / this.z) * 500 + canvas!.width / 2
          this.screenY = (this.y / this.z) * 500 + canvas!.height / 2
        }
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        // Only draw if on screen
        if (
          this.screenX >= -50 &&
          this.screenX <= canvas!.width + 50 &&
          this.screenY >= -50 &&
          this.screenY <= canvas!.height + 50
        ) {
          if (this.isTransforming) {
            // Draw as shooting star
            const scaledSize = this.size * (1000 / this.z) * (1 + this.transformProgress * 2)

            // Draw tail
            const tailLength = this.tailLength * (1 + this.transformProgress * 3)
            const gradient = ctx.createLinearGradient(
              this.screenX,
              this.screenY,
              this.screenX - Math.cos(this.transformAngle) * tailLength,
              this.screenY - Math.sin(this.transformAngle) * tailLength,
            )
            gradient.addColorStop(0, this.color)
            gradient.addColorStop(0.1, `${this.color}AA`)
            gradient.addColorStop(0.5, `${this.color}55`)
            gradient.addColorStop(1, `${this.color}00`)

            ctx.beginPath()
            ctx.moveTo(this.screenX, this.screenY)
            ctx.lineTo(
              this.screenX - Math.cos(this.transformAngle) * tailLength,
              this.screenY - Math.sin(this.transformAngle) * tailLength,
            )
            ctx.lineWidth = scaledSize
            ctx.strokeStyle = gradient
            ctx.stroke()

            // Draw head
            ctx.beginPath()
            ctx.arc(this.screenX, this.screenY, scaledSize * 1.5, 0, Math.PI * 2)
            ctx.fillStyle = this.color
            ctx.fill()
          } else {
            // Draw as normal star
            const scaledSize = this.size * (1000 / this.z)
            const opacity = Math.min(1, ((1000 - this.z) / 1000) * 1.5)

            // Draw star core with glow
            ctx.save()
            ctx.globalAlpha = opacity

            // Main star glow
            const gradient = ctx.createRadialGradient(
              this.screenX,
              this.screenY,
              0,
              this.screenX,
              this.screenY,
              scaledSize * 3,
            )
            gradient.addColorStop(0, this.color)
            gradient.addColorStop(0.4, `${this.color}80`)
            gradient.addColorStop(1, `${this.color}00`)

            ctx.beginPath()
            ctx.arc(this.screenX, this.screenY, scaledSize * 3, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()

            // Brighter core
            ctx.beginPath()
            ctx.arc(this.screenX, this.screenY, scaledSize, 0, Math.PI * 2)
            ctx.fillStyle = this.color
            ctx.fill()

            // Add star flares for larger stars
            if (scaledSize > 1.2) {
              // Draw more realistic flares
              const flareLength = scaledSize * this.flareSize
              const flareCount = 4

              for (let i = 0; i < flareCount; i++) {
                const angle = this.flareAngle + (i * Math.PI) / (flareCount / 2)

                // Create flare gradient
                const flareGradient = ctx.createLinearGradient(
                  this.screenX,
                  this.screenY,
                  this.screenX + Math.cos(angle) * flareLength,
                  this.screenY + Math.sin(angle) * flareLength,
                )
                flareGradient.addColorStop(0, this.color)
                flareGradient.addColorStop(1, `${this.color}00`)

                // Draw flare
                ctx.beginPath()
                ctx.moveTo(this.screenX, this.screenY)
                ctx.lineTo(this.screenX + Math.cos(angle) * flareLength, this.screenY + Math.sin(angle) * flareLength)
                ctx.lineWidth = scaledSize * 0.5
                ctx.strokeStyle = flareGradient
                ctx.globalAlpha = opacity * this.flareIntensity * (0.7 + 0.3 * Math.sin(time * 0.002 + i))
                ctx.stroke()
              }

              // Add subtle diffraction spikes (diagonal)
              const spikeCount = 4
              for (let i = 0; i < spikeCount; i++) {
                const angle = this.flareAngle + Math.PI / 4 + (i * Math.PI) / (spikeCount / 2)

                const spikeGradient = ctx.createLinearGradient(
                  this.screenX,
                  this.screenY,
                  this.screenX + Math.cos(angle) * flareLength * 0.7,
                  this.screenY + Math.sin(angle) * flareLength * 0.7,
                )
                spikeGradient.addColorStop(0, this.color)
                spikeGradient.addColorStop(1, `${this.color}00`)

                ctx.beginPath()
                ctx.moveTo(this.screenX, this.screenY)
                ctx.lineTo(
                  this.screenX + Math.cos(angle) * flareLength * 0.7,
                  this.screenY + Math.sin(angle) * flareLength * 0.7,
                )
                ctx.lineWidth = scaledSize * 0.3
                ctx.strokeStyle = spikeGradient
                ctx.globalAlpha = opacity * this.flareIntensity * 0.5 * (0.7 + 0.3 * Math.sin(time * 0.003 + i))
                ctx.stroke()
              }
            }

            ctx.restore()
          }
        }
      }

      transformToShootingStar() {
        if (!this.isTransforming && this.isActive) {
          this.isTransforming = true
          this.transformProgress = 0

          // Random angle for shooting direction
          this.transformAngle = Math.random() * Math.PI * 2

          // Speed based on star size (bigger stars = faster comets)
          this.transformSpeed = 5 + this.baseSize * 3

          // Tail length based on star size
          this.tailLength = 50 + this.baseSize * 30

          // Prevent clicking on this star again while it's transforming
          this.isActive = false

          return true
        }
        return false
      }

      isClickable() {
        return !this.isTransforming && this.isActive
      }

      distanceToPoint(x: number, y: number) {
        const dx = this.screenX - x
        const dy = this.screenY - y
        return Math.sqrt(dx * dx + dy * dy)
      }
    }

    // Nebula clouds
    class NebulaCloud {
      x!: number
      y!: number
      size!: number
      color!: string
      points!: Array<{ x: number; y: number; radius: number }>
      rotation!: number
      rotationSpeed!: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 200 + 100
        this.color = colors.nebula[Math.floor(Math.random() * colors.nebula.length)]
        this.points = []
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.001

        // Generate cloud shape
        const pointCount = Math.floor(Math.random() * 5) + 5
        for (let i = 0; i < pointCount; i++) {
          const angle = (i / pointCount) * Math.PI * 2
          const radius = this.size * (0.7 + Math.random() * 0.3)
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          this.points.push({
            x,
            y,
            radius: Math.random() * 50 + 30,
          })
        }
      }

      update() {
        this.rotation += this.rotationSpeed

        // Slowly move across screen
        this.x += Math.sin(this.rotation) * 0.2
        this.y += Math.cos(this.rotation) * 0.1

        // Wrap around screen
        if (this.x < -this.size) this.x = canvas!.width + this.size
        if (this.x > canvas!.width + this.size) this.x = -this.size
        if (this.y < -this.size) this.y = canvas!.height + this.size
        if (this.y > canvas!.height + this.size) this.y = -this.size
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        // Draw cloud using radial gradients
        for (const point of this.points) {
          const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)
          gradient.addColorStop(0, `${this.color}30`)
          gradient.addColorStop(1, `${this.color}00`)

          ctx.beginPath()
          ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        ctx.restore()
      }
    }

    // Quantum particles
    class QuantumParticle {
      x!: number
      y!: number
      size!: number
      color!: string
      waveAmplitude!: number
      waveFrequency!: number
      wavePhase!: number
      speed!: number
      angle!: number
      orbitRadius!: number
      orbitSpeed!: number
      orbitCenter!: { x: number; y: number }

      constructor() {
        this.orbitCenter = {
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
        }
        this.orbitRadius = Math.random() * 100 + 50
        this.angle = Math.random() * Math.PI * 2
        this.orbitSpeed = (Math.random() - 0.5) * 0.02

        this.x = this.orbitCenter.x + Math.cos(this.angle) * this.orbitRadius
        this.y = this.orbitCenter.y + Math.sin(this.angle) * this.orbitRadius

        this.size = Math.random() * 3 + 1
        this.color = colors.quantum[Math.floor(Math.random() * colors.quantum.length)]
        this.waveAmplitude = Math.random() * 20 + 10
        this.waveFrequency = Math.random() * 0.1 + 0.05
        this.wavePhase = Math.random() * Math.PI * 2
        this.speed = Math.random() * 0.02 + 0.01
      }

      update(time: number) {
        // Orbit around center
        this.angle += this.orbitSpeed

        // Base position from orbit
        const baseX = this.orbitCenter.x + Math.cos(this.angle) * this.orbitRadius
        const baseY = this.orbitCenter.y + Math.sin(this.angle) * this.orbitRadius

        // Add wave function displacement
        this.wavePhase += this.speed
        const waveX = Math.sin(this.wavePhase) * this.waveAmplitude
        const waveY = Math.cos(this.wavePhase * 1.3) * this.waveAmplitude

        this.x = baseX + waveX
        this.y = baseY + waveY

        // Wrap around screen
        if (this.orbitCenter.x < -this.orbitRadius * 2) this.orbitCenter.x = canvas!.width + this.orbitRadius
        if (this.orbitCenter.x > canvas!.width + this.orbitRadius * 2) this.orbitCenter.x = -this.orbitRadius
        if (this.orbitCenter.y < -this.orbitRadius * 2) this.orbitCenter.y = canvas!.height + this.orbitRadius
        if (this.orbitCenter.y > canvas!.width + this.orbitRadius * 2) this.orbitCenter.y = -this.orbitRadius

        // Slowly drift orbit centers
        this.orbitCenter.x += Math.sin(time * 0.001) * 0.2
        this.orbitCenter.y += Math.cos(time * 0.001) * 0.2
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw particle
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Draw probability wave
        ctx.beginPath()
        const wavePoints = 20
        const waveRadius = 30

        for (let i = 0; i <= wavePoints; i++) {
          const angle = (i / wavePoints) * Math.PI * 2
          const waveHeight = Math.sin(angle * 3 + this.wavePhase) * 5 + 10
          const x = this.x + (Math.cos(angle) * waveRadius * waveHeight) / 10
          const y = this.y + (Math.sin(angle) * waveRadius * waveHeight) / 10

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.closePath()
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, waveRadius)
        gradient.addColorStop(0, `${this.color}30`)
        gradient.addColorStop(1, `${this.color}00`)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    // Rocket/comet class
    class Rocket {
      x!: number
      y!: number
      angle!: number
      speed!: number
      size!: number
      tailLength!: number
      active!: boolean
      color!: string

      constructor() {
        this.reset()
        // Start off-screen
        this.x = -100
        this.y = Math.random() * canvas!.height
      }

      reset() {
        // Position at random edge of screen
        const side = Math.floor(Math.random() * 4)
        switch (side) {
          case 0: // top
            this.x = Math.random() * canvas!.width
            this.y = -50
            this.angle = Math.PI / 2 + (Math.random() - 0.5) * 0.5
            break
          case 1: // right
            this.x = canvas!.width + 50
            this.y = Math.random() * canvas!.height
            this.angle = Math.PI + (Math.random() - 0.5) * 0.5
            break
          case 2: // bottom
            this.x = Math.random() * canvas!.width
            this.y = canvas!.height + 50
            this.angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5
            break
          case 3: // left
            this.x = -50
            this.y = Math.random() * canvas!.height
            this.angle = 0 + (Math.random() - 0.5) * 0.5
            break
        }

        this.speed = Math.random() * 3 + 2
        this.size = Math.random() * 3 + 2
        this.tailLength = Math.random() * 100 + 50
        this.active = true
        this.color = Math.random() > 0.5 ? "#FFFFFF" : "#FFDD99"
      }

      update() {
        // Move rocket
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        // Check if off screen
        if (this.x < -100 || this.x > canvas!.width + 100 || this.y < -100 || this.y > canvas!.height + 100) {
          // Only reset if it was previously on screen
          if (this.active) {
            this.active = false
            // Random delay before resetting
            setTimeout(() => this.reset(), Math.random() * 10000 + 5000)
          }
        } else {
          this.active = true
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return

        // Draw rocket tail
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.tailLength,
          this.y - Math.sin(this.angle) * this.tailLength,
        )
        gradient.addColorStop(0, `${this.color}FF`)
        gradient.addColorStop(0.1, `${this.color}AA`)
        gradient.addColorStop(0.5, `${this.color}55`)
        gradient.addColorStop(1, `${this.color}00`)

        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x - Math.cos(this.angle) * this.tailLength, this.y - Math.sin(this.angle) * this.tailLength)
        ctx.lineWidth = this.size
        ctx.strokeStyle = gradient
        ctx.stroke()

        // Draw rocket head
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create objects
    const stars: Star[] = []
    // Reduced star count from 500 to 300
    const starCount = 300
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star())
    }

    const nebulaClouds: NebulaCloud[] = []
    const nebulaCount = 5
    for (let i = 0; i < nebulaCount; i++) {
      nebulaClouds.push(new NebulaCloud())
    }

    const quantumParticles: QuantumParticle[] = []
    // Reduced particle count from 20 to 15
    const particleCount = 15
    for (let i = 0; i < particleCount; i++) {
      quantumParticles.push(new QuantumParticle())
    }

    const rockets: Rocket[] = []
    const rocketCount = 3
    for (let i = 0; i < rocketCount; i++) {
      const rocket = new Rocket()
      // Stagger rocket appearances
      setTimeout(() => rockets.push(rocket), i * 3000)
    }

    // Animation loop
    let animationFrameId: number
    let time = 0

    const render = () => {
      time++

      // Create a space background
      ctx.fillStyle = "#050A20"
      ctx.fillRect(0, 0, canvas!.width, canvas!.height)

      // Draw nebula clouds (background layer)
      for (const cloud of nebulaClouds) {
        cloud.update()
        cloud.draw(ctx)
      }

      // Draw stars
      for (const star of stars) {
        star.update(mouseX, mouseY, time)
        star.draw(ctx, time)
      }

      // Draw quantum particles
      for (const particle of quantumParticles) {
        particle.update(time)
        particle.draw(ctx)
      }

      // Draw rockets
      for (const rocket of rockets) {
        rocket.update()
        rocket.draw(ctx)
      }

      // Draw mouse interaction effect when active
      if (isMouseActive) {
        const radius = 100
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, radius)
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseEnter = () => {
      isMouseActive = true
    }

    const handleMouseLeave = () => {
      isMouseActive = false
    }

    // Click handler to transform stars into shooting stars
    const handleClick = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      // Find the closest star to the click position
      let closestStar: Star | null = null
      let closestDistance = Number.POSITIVE_INFINITY

      for (const star of stars) {
        if (star.isClickable()) {
          const distance = star.distanceToPoint(clickX, clickY)
          // Only consider stars that are close enough to be clicked (within 30 pixels)
          if (distance < 30 && distance < closestDistance) {
            closestDistance = distance
            closestStar = star
          }
        }
      }

      // Transform the closest star into a shooting star
      if (closestStar) {
        closestStar.transformToShootingStar()

        // Add a visual effect at the click position
        const clickEffect = document.createElement("div")
        clickEffect.style.position = "absolute"
        clickEffect.style.left = `${e.clientX}px`
        clickEffect.style.top = `${e.clientY}px`
        clickEffect.style.width = "20px"
        clickEffect.style.height = "20px"
        clickEffect.style.borderRadius = "50%"
        clickEffect.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
        clickEffect.style.transform = "translate(-50%, -50%)"
        clickEffect.style.pointerEvents = "none"
        clickEffect.style.transition = "all 0.3s ease-out"
        document.body.appendChild(clickEffect)

        // Animate and remove the effect
        setTimeout(() => {
          clickEffect.style.width = "40px"
          clickEffect.style.height = "40px"
          clickEffect.style.opacity = "0"
          setTimeout(() => {
            document.body.removeChild(clickEffect)
          }, 300)
        }, 10)
      }
    }

    // Handle window resize
    const handleResize = () => {
      updateCanvasDimensions()
    }

    // Add event listeners
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("click", handleClick)
    window.addEventListener("resize", handleResize)

    // Start animation
    render()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)

      // Fix: Add null check before removing event listeners
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove)
        canvas.removeEventListener("mouseenter", handleMouseEnter)
        canvas.removeEventListener("mouseleave", handleMouseLeave)
        canvas.removeEventListener("click", handleClick)
      }

      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-auto"
      style={{ cursor: "pointer" }}
    />
  )
}
