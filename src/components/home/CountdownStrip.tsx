import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCountdown } from '../../hooks/useCountdown'
import { COUNTDOWN_TARGET_HOURS } from '../../constants'
import { getCountdownTarget } from '../../lib/utils'

function TimeUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="text-center">
      <p className="font-display text-5xl md:text-6xl font-light text-ceramic-950 leading-none tabular-nums">
        {display}
      </p>
      <p className="text-[9px] tracking-[0.25em] uppercase text-ceramic-500 mt-1">{label}</p>
    </div>
  )
}

export function CountdownStrip() {
  const target = useMemo(() => getCountdownTarget(COUNTDOWN_TARGET_HOURS), [])
  const { days, hours, minutes, seconds } = useCountdown(target)

  return (
    <section className="bg-white border-y border-ceramic-200 py-10 px-6" aria-label="Limited time offer">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
        {/* Left */}
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-ceramic-500 mb-2">
            They&apos;re here, but not for long.
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-normal text-ceramic-950 mb-5">
            Pet Bowls &amp; Trinkets 48 hours only
          </h2>
          <Link
            to="/ready-to-ship"
            className="inline-block border border-ceramic-950 px-5 py-2 text-[10px] tracking-[0.2em] uppercase text-ceramic-950 hover:bg-ceramic-950 hover:text-white transition-colors"
          >
            Shop Now
          </Link>
        </div>

        {/* Countdown */}
        <div className="flex items-end gap-6 md:gap-10" role="timer" aria-live="polite">
          <TimeUnit value={days} label="Days" />
          <TimeUnit value={hours} label="Hours" />
          <TimeUnit value={minutes} label="Minutes" />
          <TimeUnit value={seconds} label="Seconds" />
        </div>
      </div>
    </section>
  )
}
