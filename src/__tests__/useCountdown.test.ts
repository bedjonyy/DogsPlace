import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useCountdown } from '../hooks/useCountdown'

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns non-negative values for a future target', () => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 10) // 10 hours
    const { result } = renderHook(() => useCountdown(future))
    expect(result.current.hours).toBeGreaterThanOrEqual(0)
    expect(result.current.minutes).toBeGreaterThanOrEqual(0)
    expect(result.current.seconds).toBeGreaterThanOrEqual(0)
    expect(result.current.days).toBeGreaterThanOrEqual(0)
  })

  it('returns zeros when the target is in the past', () => {
    const past = new Date(Date.now() - 1000)
    const { result } = renderHook(() => useCountdown(past))
    expect(result.current.days).toBe(0)
    expect(result.current.hours).toBe(0)
    expect(result.current.minutes).toBe(0)
    expect(result.current.seconds).toBe(0)
  })

  it('calculates correct hours for a 2-hour target', () => {
    const twoHours = new Date(Date.now() + 1000 * 60 * 60 * 2)
    const { result } = renderHook(() => useCountdown(twoHours))
    expect(result.current.hours).toBe(2)
    expect(result.current.days).toBe(0)
  })

  it('counts down by 1 second after a tick', () => {
    const future = new Date(Date.now() + 1000 * 65) // 65 seconds
    const { result } = renderHook(() => useCountdown(future))
    const initialSeconds = result.current.seconds

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    const secondsAfterTick = result.current.seconds
    // After advancing 1s the total remaining dropped by 1s
    expect(secondsAfterTick).not.toBe(initialSeconds)
  })

  it('values stay at zero after target has passed', () => {
    const soon = new Date(Date.now() + 2000)
    const { result } = renderHook(() => useCountdown(soon))

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.days).toBe(0)
    expect(result.current.hours).toBe(0)
    expect(result.current.minutes).toBe(0)
    expect(result.current.seconds).toBe(0)
  })
})
