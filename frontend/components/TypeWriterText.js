"use client"
import { useEffect, useState } from "react"

export const TypewriterText = ({ texts }) => {
    const [index, setIndex] = useState(0)
    const [displayText, setDisplayText] = useState('')
    const [subIndex, setSubIndex] = useState(0)
    const [reverse, setReverse] = useState(false)
  
    useEffect(() => {
      if (subIndex === texts[index].length + 1 && !reverse) {
        setTimeout(() => setReverse(true), 1000)
        return
      }
      if (subIndex === 0 && reverse) {
        setReverse(false)
        setIndex((prev) => (prev + 1) % texts.length)
        return
      }
      const timeout = setTimeout(() => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1))
      }, 150)
  
      return () => clearTimeout(timeout)
    }, [subIndex, reverse, index, texts])
  
    useEffect(() => {
      setDisplayText(texts[index].substring(0, subIndex))
    }, [subIndex, index, texts])
  
    return (
      <span className="font-medium text-orange-600">
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    )
  }