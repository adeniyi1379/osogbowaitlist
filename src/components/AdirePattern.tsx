export default function AdirePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07]"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="adire" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* Diamond grid — adire oniko motif */}
          <path d="M40 0 L80 40 L40 80 L0 40Z" fill="none" stroke="#F5A623" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="6" fill="none" stroke="#F5A623" strokeWidth="1" />
          <circle cx="40" cy="40" r="2" fill="#F5A623" />
          {/* Corner dots */}
          <circle cx="0" cy="0" r="2" fill="#F5A623" />
          <circle cx="80" cy="0" r="2" fill="#F5A623" />
          <circle cx="0" cy="80" r="2" fill="#F5A623" />
          <circle cx="80" cy="80" r="2" fill="#F5A623" />
        </pattern>
        <pattern id="adire-secondary" x="40" y="40" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M20 0 L40 20 L20 40 L0 20Z" fill="none" stroke="#FF3366" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#adire)" />
      <rect width="100%" height="100%" fill="url(#adire-secondary)" opacity="0.5" />
    </svg>
  )
}
