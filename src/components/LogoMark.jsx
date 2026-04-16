import mImg from '../assets/m.jpg'

export default function LogoMark({ size = 32 }) {
  return (
    <img
      src={mImg}
      alt="logo"
      width={size}
      height={size}
      style={{
        borderRadius: '8px',
        objectFit: 'cover',
        display: 'block',
        flexShrink: 0,
      }}
    />
  )
}
