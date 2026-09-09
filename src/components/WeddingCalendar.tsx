const weeks = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

export function WeddingCalendar() {
  // Tháng 11/2026 bắt đầu vào Chủ nhật; lịch hiển thị tuần từ thứ Hai.
  const cells = [...Array.from({ length: 6 }, () => null), ...Array.from({ length: 30 }, (_, index) => index + 1)]
  return (
    <div className="calendar-card" aria-label="Lịch tháng 11 năm 2026">
      <p className="calendar-month">Tháng 11</p>
      <p className="calendar-year">2026</p>
      <div className="calendar-grid calendar-weekdays">
        {weeks.map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="calendar-grid calendar-days">
        {cells.map((day, index) => (
          <span className={day === 21 ? 'wedding-day' : ''} key={`${day}-${index}`}>
            {day}
            {day === 21 && <i aria-hidden="true">♥</i>}
          </span>
        ))}
      </div>
    </div>
  )
}
