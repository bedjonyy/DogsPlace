/**
 * useCountdown — real-time countdown timer hook.
 *
 * Design decisions:
 *   - computeTimeLeft is extracted to a pure function so it can be unit-tested
 *     without rendering a component.
 *   - useState uses a lazy initialiser (() => computeTimeLeft(target)) so the
 *     first render already shows the correct time instead of showing zeros for
 *     one tick before the effect fires.
 *   - The interval is set to 1000 ms (1 second). It does not try to compensate
 *     for drift because a 1-second display timer does not require sub-second
 *     accuracy — the target date is the source of truth on every tick.
 *   - When the target is in the past, all values clamp to 0 so the UI shows
 *     "0 DAYS 0 HOURS 0 MINUTES 0 SECONDS" rather than negative numbers.
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
