import React from 'react';
import wLogoImg from './winngoo-w-logo.png';

const WinngooLogo = ({ size = 68, className = "" }) => (
  <div 
    className={className}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${Math.round(size * 1.54)}px`,
      height: `${size}px`,
      userSelect: 'none'
    }}
  >
    <img 
      src={wLogoImg} 
      alt="Winngoo Monogram Logo" 
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
        filter: 'drop-shadow(0 4px 14px rgba(197, 160, 89, 0.45))'
      }} 
    />
  </div>
);

export default WinngooLogo;
