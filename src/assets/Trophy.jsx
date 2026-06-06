import React from 'react';

const Trophy = ({ size = 80, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 80 80" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C0C0C0" />
        <stop offset="100%" stopColor="#808080" />
      </linearGradient>
      <linearGradient id="primaryGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#808080" />
        <stop offset="100%" stopColor="#696969" />
      </linearGradient>
    </defs>
    
    {/* Base */}
    <path d="M25 70 h30 v6 h-30 z" fill="url(#primaryGradientDark)" />
    <path d="M30 60 h20 v10 h-20 z" fill="url(#primaryGradient)" />
    
    {/* Stem */}
    <path d="M35 45 h10 v15 h-10 z" fill="url(#primaryGradient)" />
    
    {/* Cup Bowl */}
    <path d="M20 15 c0 15 10 30 20 30 c10 0 20 -15 20 -30 z" fill="url(#primaryGradient)" />
    <path d="M20 15 h40 v4 h-40 z" fill="url(#primaryGradientDark)" />
    
    {/* Inner Shadow / Detail lines */}
    <path d="M30 15 c0 10 5 20 10 20 c5 0 10 -10 10 -20" stroke="#696969" strokeWidth="1" fill="none" opacity="0.5" />
    
    {/* Handles */}
    <path d="M20 20 c-10 0 -15 10 -5 15" stroke="url(#primaryGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M60 20 c10 0 15 10 5 15" stroke="url(#primaryGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

export default Trophy;
