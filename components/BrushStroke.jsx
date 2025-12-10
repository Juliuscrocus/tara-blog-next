const BrushStroke = ({ className = '' }) => {
  return (
    <svg
      className={className}
      width="180"
      height="20"
      viewBox="0 0 180 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10C30 6 50 14 90 10C130 6 150 14 175 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
    </svg>
  )
}

export default BrushStroke
