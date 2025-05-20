"use client"

import { useState, useEffect, useCallback, memo } from "react"

interface TypewriterEffectProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenTexts?: number
}

const TypewriterEffect = memo(function TypewriterEffect({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const updateText = useCallback(() => {
    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (displayText.length < texts[currentIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(texts[currentIndex].substring(0, displayText.length + 1))
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, delayBetweenTexts)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1))
        }, deletingSpeed)
      } else {
        setCurrentIndex((currentIndex + 1) % texts.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isTyping, texts, typingSpeed, deletingSpeed, delayBetweenTexts])

  useEffect(() => {
    const cleanup = updateText()
    return cleanup
  }, [updateText])

  return (
    <h2 className="text-2xl md:text-3xl font-semibold text-primary-500">
      {displayText}
      <span className="animate-blink text-primary-400">|</span>
    </h2>
  )
})

export default TypewriterEffect
