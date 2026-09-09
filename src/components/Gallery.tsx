import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = useState<number | null>(null)
  const columns = images.reduce<number[][]>((result, _image, index) => {
    result[index % 2].push(index)
    return result
  }, [[], []])

  useEffect(() => {
    if (active === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowRight') setActive((value) => value === null ? 0 : (value + 1) % images.length)
      if (event.key === 'ArrowLeft') setActive((value) => value === null ? 0 : (value - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, images.length])

  return (
    <>
      <div className="gallery-grid">
        {columns.map((column, columnIndex) => (
          <div className="gallery-column" key={`column-${columnIndex}`}>
            {column.map((index) => (
              <button type="button" className="gallery-image" onClick={() => setActive(index)} key={images[index]}>
                <img src={images[index]} alt={`Ảnh cưới ${index + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        ))}
      </div>
      {active !== null && createPortal(
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Album ảnh cưới" onMouseDown={() => setActive(null)}>
          <button type="button" className="lightbox-close" onClick={() => setActive(null)} aria-label="Đóng">×</button>
          <button type="button" className="lightbox-nav prev" onClick={(event) => { event.stopPropagation(); setActive((active - 1 + images.length) % images.length) }} aria-label="Ảnh trước">‹</button>
          <img src={images[active]} alt={`Ảnh cưới ${active + 1}`} onMouseDown={(event) => event.stopPropagation()} />
          <button type="button" className="lightbox-nav next" onClick={(event) => { event.stopPropagation(); setActive((active + 1) % images.length) }} aria-label="Ảnh sau">›</button>
        </div>,
        document.body,
      )}
    </>
  )
}
