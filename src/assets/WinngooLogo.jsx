import React from 'react';

const WinngooLogo = ({ size = 60, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C0C0C0" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
    </defs>
    
    {/* Hexagon Base */}
    <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="url(#hexGradient)" opacity="0.1" stroke="url(#hexGradient)" strokeWidth="2" />
    
    {/* Geometric W */}
    <path d="M25 35 L40 70 L50 50 L60 70 L75 35" stroke="url(#hexGradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default WinngooLogo;
