import { useMemo, useState } from 'react'
import { AudioToggle } from './components/AudioToggle'
import { BottomToolbar } from './components/BottomToolbar'
import { Countdown } from './components/Countdown'
import { Gallery } from './components/Gallery'
import { Modal } from './components/Modal'
import { WeddingCalendar } from './components/WeddingCalendar'
import { wedding } from './data/wedding'

type ModalName = 'gift' | null

function Divider({ dark = false }: { dark?: boolean }) {
  return <div className={`ornament ${dark ? 'ornament-dark' : ''}`} aria-hidden="true"><span>❦</span></div>
}

function Toast({ message }: { message: string }) {
  return message ? <div className="toast" role="status">{message}</div> : null
}

export default function App() {
  const [modal, setModal] = useState<ModalName>(null)
  const [toast, setToast] = useState('')
  const guest = useMemo(() => {
    const value = new URLSearchParams(window.location.search).get('guest')
    return value?.trim() || 'Quý khách'
  }, [])

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  const copyAccount = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number)
    } catch {
      const helper = document.createElement('textarea')
      helper.value = number
      helper.style.position = 'fixed'
      helper.style.opacity = '0'
      document.body.appendChild(helper)
      helper.select()
      document.execCommand('copy')
      helper.remove()
    }
    notify('Đã sao chép số tài khoản.')
  }

  return (
    <div className="page-shell">
      <main className="invitation-frame">
        <section className="hero section-reveal" aria-label={`Thiệp cưới ${wedding.groom.name} và ${wedding.bride.name}`}>
          <img src={wedding.images.hero} alt={`${wedding.groom.name} và ${wedding.bride.name}`} />
          <div className="hero-overlay" />
          <div className="hero-topline"><span>Save</span><i>the</i><span>Date</span></div>
          <div className="hero-content">
            <p className="eyebrow">WEDDING INVITATION</p>
            <h1><span>{wedding.groom.name}</span><b>&</b><span>{wedding.bride.name}</span></h1>
            <p className="hero-date">{wedding.displayDate}</p>
            <p className="guest-line">Thân mời <strong>{guest}</strong></p>
          </div>
          <div className="scroll-cue"><span>Cuộn để xem thiệp</span><i /></div>
        </section>

        <section className="quote-section paper-section section-reveal">
          <p className="date-script">{wedding.displayDate}</p>
          <Divider />
          <blockquote>{wedding.quote}</blockquote>
        </section>

        <section className="couple-section paper-section section-reveal">
          <p className="section-kicker">THE BEGINNING OF FOREVER</p>
          <h2 className="script-title">Our love story</h2>
          <div className="introduction-photo">
            <img src={wedding.images.introduction} alt="Cặp đôi trong bộ ảnh cưới" loading="lazy" />
          </div>
          <p className="intro-copy">Một hành trình mới của chúng mình bắt đầu từ hôm nay</p>
          <div className="couple-cards">
            <article className="person-card bride-card">
              <div className="person-photo"><img src={wedding.bride.image} alt={wedding.bride.fullName} loading="lazy" /></div>
              <p>Nhà Gái</p><h3>{wedding.bride.fullName}</h3>
              <span>{wedding.bride.parents[0]}<br />{wedding.bride.parents[1]}</span>
              <small>{wedding.bride.hometown}</small>
            </article>
            <article className="person-card groom-card">
              <div className="person-photo"><img src={wedding.groom.image} alt={wedding.groom.fullName} loading="lazy" /></div>
              <p>Nhà Trai</p><h3>{wedding.groom.fullName}</h3>
              <span>{wedding.groom.parents[0]}<br />{wedding.groom.parents[1]}</span>
              <small>{wedding.groom.hometown}</small>
            </article>
          </div>
        </section>

        <section className="invitation-section section-reveal">
          <img className="invitation-bg" src={wedding.images.invitation} alt={`${wedding.groom.name} và ${wedding.bride.name} trong trang phục cưới`} loading="lazy" />
          <div className="invitation-shade" />
          <div className="invitation-title-card">
            <p>Trân trọng kính mời</p>
            <h2>{guest}</h2>
            <span>Đến dự bữa tiệc thân mật cùng gia đình chúng tôi</span>
          </div>
          <div className="invitation-names"><span>{wedding.groom.name}</span><b>&</b><span>{wedding.bride.name}</span></div>
        </section>

        <section className="event-section paper-section section-reveal">
          <p className="section-kicker">SAVE OUR DATE</p>
          <h2 className="editorial-title">Thiệp Mời</h2>
          <p className="event-subtitle">Tham dự lễ báo hỷ {wedding.groom.name} & {wedding.bride.name}</p>
          <Divider />
          <div className="event-date-layout">
            <div><span>18h00</span><small>Thứ Bảy</small></div>
            <strong>21</strong>
            <div><span>11.2026</span><small>{wedding.lunarDate}</small></div>
          </div>
          <div className="schedule">
            {wedding.schedule.map((item, index) => (
              <div key={item.label}><i>{index === 0 ? '◇' : '♧'}</i><strong>{item.time}</strong><span>{item.label}</span></div>
            ))}
          </div>
          <div className="venue-card">
            <p>Địa chỉ dự tiệc</p>
            <h3>{wedding.venue.name}</h3>
            <span>{wedding.venue.address}</span>
            <a href={wedding.venue.mapUrl} target="_blank" rel="noreferrer">Chỉ đường <b>↗</b></a>
          </div>
        </section>

        <section className="calendar-section section-reveal">
          <div className="calendar-photo"><img src={wedding.images.introduction} alt="Ảnh cưới với khoảng trống nghệ thuật" loading="lazy" /></div>
          <div className="calendar-shade" />
          <div className="calendar-content">
            <WeddingCalendar />
            <p className="countdown-label">Chỉ còn...</p>
            <Countdown date={wedding.date} />
          </div>
        </section>

        <section className="album-section paper-section section-reveal">
          <p className="section-kicker">OUR MEMORIES</p>
          <h2 className="editorial-title">Album Ảnh Cưới</h2>
          <Gallery images={wedding.images.album} />
        </section>

        <section className="closing-section section-reveal">
          <img src={wedding.images.closing} alt="Khoảnh khắc tình cảm của cô dâu chú rể" loading="lazy" />
          <div className="closing-overlay" />
          <div className="closing-content">
            <p>Trân trọng</p><span>&</span><p>Biết ơn!</p>
            <small>Hẹn gặp bạn trong ngày vui của chúng mình</small>
          </div>
        </section>

        <div className="content-safe-space" aria-hidden="true" />
      </main>

      <AudioToggle musicUrl={wedding.musicUrl} />
      <BottomToolbar onGift={() => setModal('gift')} />

      <Modal open={modal === 'gift'} title="Hộp quà yêu thương" onClose={() => setModal(null)}>
        <p className="gift-note">Cảm ơn bạn đã gửi lời chúc phúc đến Đình Chiến & Kim Phụng.</p>
        <div className="bank-list">
          {wedding.bankAccounts.map((account) => (
            <article className="bank-card" key={account.number}>
              <img className="bank-qr" src={account.qrImage} alt={`Mã QR ngân hàng của ${account.holder}`} />
              <span>{account.bank}</span><strong>{account.holder}</strong><code>{account.number}</code>
              <button type="button" onClick={() => void copyAccount(account.number)}>Sao chép số tài khoản</button>
              <small>Nội dung: {account.note}</small>
            </article>
          ))}
        </div>
      </Modal>
      <Toast message={toast} />
    </div>
  )
}
