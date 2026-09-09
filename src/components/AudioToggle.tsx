import { useEffect, useRef, useState } from 'react'

export function AudioToggle({ musicUrl }: { musicUrl: string }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const contextRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => () => {
    audioRef.current?.pause()
    if (timerRef.current) window.clearInterval(timerRef.current)
    void contextRef.current?.close()
  }, [])

  const playSynthNote = (context: AudioContext, frequency: number) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    gain.gain.setValueAtTime(0, context.currentTime)
    gain.gain.linearRampToValueAtTime(0.035, context.currentTime + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.9)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 2)
  }

  const toggle = async () => {
    if (playing) {
      audioRef.current?.pause()
      if (timerRef.current) window.clearInterval(timerRef.current)
      timerRef.current = null
      await contextRef.current?.suspend()
      setPlaying(false)
      return
    }

    if (musicUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(musicUrl)
        audioRef.current.loop = true
        audioRef.current.volume = 0.45
      }
      await audioRef.current.play()
    } else {
      const context = contextRef.current ?? new AudioContext()
      contextRef.current = context
      await context.resume()
      const notes = [261.63, 329.63, 392, 523.25]
      let index = 0
      playSynthNote(context, notes[index])
      timerRef.current = window.setInterval(() => {
        index = (index + 1) % notes.length
        playSynthNote(context, notes[index])
      }, 1100)
    }
    setPlaying(true)
  }

  return (
    <button type="button" className={`music-toggle ${playing ? 'is-playing' : ''}`} onClick={() => void toggle()} aria-label={playing ? 'Tắt nhạc' : 'Bật nhạc'}>
      <span className="music-disc" aria-hidden="true">♪</span>
      <span>{playing ? 'Đang phát' : 'Bật nhạc'}</span>
    </button>
  )
}
