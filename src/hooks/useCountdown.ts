/**
 * useCountdown — real-time countdown timer hook.
 */
import { useState, useEffect } from 'react'
import type { CountdownTime } from '../types'

function computeTimeLeft(target: Date): CountdownTime {
  const diff = target.getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function useCountdown(target: Date): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() => computeTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(computeTimeLeft(target))
    }, 1000)

    // clearInterval prevents the interval from running after the component unmounts
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}
