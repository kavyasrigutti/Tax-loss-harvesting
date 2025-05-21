import React from 'react';

interface CryptoIconProps {
  logo: string;
  size?: number;
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ logo, size = 24 }) => {
  return (
    <img 
      src={logo} 
      alt="Crypto Logo" 
      className="rounded-full"
      width={size} 
      height={size}
    />
  );
};

export default CryptoIcon;