const InventoryLogo = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-blue-600"
    >
      {/* Sample SVG Paths */}
      <rect x="8" y="8" width="48" height="48" rx="8" fill="red" />
      <path d="M20 32H44" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 20V44" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

export default InventoryLogo;
