type ToolbarProps = {
  onGift: () => void
}

const icons = {
  gift: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Zm0 0h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z" /></svg>,
}

export function BottomToolbar({ onGift }: ToolbarProps) {
  return (
    <nav className="bottom-toolbar" aria-label="Công cụ thiệp cưới">
      <button type="button" onClick={onGift}>{icons.gift}<span>Quà mừng</span></button>
    </nav>
  )
}
