import React from 'react';

const HeaderTrophy = ({ size = 32, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 36 36" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Trophy"
  >
    <defs>
      <linearGradient id="headerGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4DC" />
        <stop offset="25%" stopColor="#E8C582" />
        <stop offset="65%" stopColor="#C5A059" />
        <stop offset="100%" stopColor="#8C6826" />
      </linearGradient>
      <linearGradient id="headerGoldStem" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C5A059" />
        <stop offset="50%" stopColor="#FFF2D4" />
        <stop offset="100%" stopColor="#8C6826" />
      </linearGradient>
    </defs>
    
    {/* Left Handle */}
    <path 
      d="M11 9 C6 9 4 12 4 16 C4 20 7 22 11 22 L11 19.5 C8.5 19.5 6.5 18 6.5 16 C6.5 14 8 11.5 11 11.5 Z" 
      fill="url(#headerGoldGrad)" 
    />
    
    {/* Right Handle */}
    <path 
      d="M25 9 C30 9 32 12 32 16 C32 20 29 22 25 22 L25 19.5 C27.5 19.5 29.5 18 29.5 16 C29.5 14 28 11.5 25 11.5 Z" 
      fill="url(#headerGoldGrad)" 
    />
    
    {/* Cup Body */}
    <path 
      d="M10 7 L26 7 L26 15 C26 20.5 22.5 24 18 24 C13.5 24 10 20.5 10 15 Z" 
      fill="url(#headerGoldGrad)" 
    />
    
    {/* Cup Rim highlight */}
    <ellipse cx="18" cy="7" rx="8" ry="1.8" fill="#FFF6E0" opacity="0.75" />
    
    {/* Star on Cup */}
    <polygon 
      points="18,10.5 19.3,13.8 22.8,14.1 20.2,16.4 20.9,19.8 18,18 15.1,19.8 15.8,16.4 13.2,14.1 16.7,13.8" 
      fill="#FFFBF0" 
      opacity="0.95" 
    />
    
    {/* Stem */}
    <path d="M16 24 L20 24 L19 28 L17 28 Z" fill="url(#headerGoldStem)" />
    
    {/* Upper Pedestal */}
    <rect x="13" y="28" width="10" height="2.5" rx="0.8" fill="url(#headerGoldGrad)" />
    
    {/* Lower Base */}
    <rect x="10" y="30.5" width="16" height="3.5" rx="1" fill="url(#headerGoldStem)" />
  </svg>
);

export default HeaderTrophy;
