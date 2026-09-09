export type BankAccount = {
  bank: string
  holder: string
  number: string
  note: string
  qrImage: string
}

export const wedding = {
  bride: {
    name: 'Kim Phụng',
    fullName: 'Võ Thị Kim Phụng',
    role: 'Út nữ',
    parents: ['Ông Võ Văn Thanh', 'Bà Hồ Thị Huyền Nga'],
    hometown: 'Xã Hồng Thái - Tỉnh Lâm Đồng',
    image: '/images/bride.webp',
  },
  groom: {
    name: 'Đình Chiến',
    fullName: 'Phan Đình Chiến',
    role: 'Út nam',
    parents: ['Ông Phan Đình Thắng', 'Bà Lê Thị Tâm'],
    hometown: "Phường B'lao - Tỉnh Lâm Đồng",
    image: '/images/groom.webp',
  },
  date: '2026-11-21T11:00:00+07:00',
  displayDate: '21.11.2026',
  lunarDate: 'Tức ngày 13 tháng 10 năm Bính Ngọ',
  venue: {
    name: 'Nhà hàng tiệc cưới ngoài trời Đồng Xanh',
    address: '1320 Đ. Lê Đức Thọ, An Hội Đông, Hồ Chí Minh, Việt Nam',
    mapUrl: 'https://maps.app.goo.gl/CUSWZe3eUVoMC33W9',
  },
  schedule: [
    { time: '18:00', label: 'Đón khách' },
    { time: '18:30', label: 'Khai tiệc' },
  ],
  quote:
    '“Chúng ta đã cùng nhau đi qua nhiều thăng trầm để nhận ra rằng được ở bên nhau là điều quý giá nhất.”',
  bankAccounts: [
    { bank: 'TP Bank', holder: 'PHAN DINH CHIEN', number: '89507111999', note: 'Mừng cưới Đình Chiến & Kim Phụng', qrImage: '/images/groom-qr.png' },
    { bank: 'Vietcombank', holder: 'VO THI KIM PHUNG', number: '0881000466805', note: 'Mừng cưới Đình Chiến & Kim Phụng', qrImage: '/images/bride-qr.png' },
  ] satisfies BankAccount[],
  musicUrl: '/audio/wedding-song.mp3',
  images: {
    hero: '/images/hero.webp',
    introduction: '/images/introduction.webp',
    invitation: '/images/invitation.webp',
    closing: '/images/closing.webp',
    album: Array.from({ length: 10 }, (_, index) => `/images/album-${String(index + 1).padStart(2, '0')}.webp`),
  },
}
