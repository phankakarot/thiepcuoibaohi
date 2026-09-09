import { useEffect, useMemo, useState } from 'react'

const calculate = (target: number) => {
  const total = Math.max(0, target - Date.now())
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}

export function Countdown({ date }: { date: string }) {
  const target = useMemo(() => new Date(date).getTime(), [date])
  const [remaining, setRemaining] = useState(() => calculate(target))

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(calculate(target)), 1000)
    return () => window.clearInterval(timer)
  }, [target])

  return (
    <div className="countdown" aria-label="Đếm ngược đến ngày cưới">
      {[
        ['Ngày', remaining.days],
        ['Giờ', remaining.hours],
        ['Phút', remaining.minutes],
        ['Giây', remaining.seconds],
      ].map(([label, value]) => (
        <div className="countdown-item" key={label}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
