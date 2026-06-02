'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CosmicParallaxBgProps {
  head?: string;
  text?: string;
  loop?: boolean;
  showContent?: boolean;
  className?: string;
}

const generateStarBoxShadow = (count: number): string => {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    shadows.push(`${x}px ${y}px #FFF`);
  }
  return shadows.join(', ');
};

const CosmicParallaxBg: React.FC<CosmicParallaxBgProps> = ({
  head = '',
  text = '',
  loop = true,
  showContent = true,
  className = '',
}) => {
  const [smallStars,  setSmallStars]  = useState('');
  const [mediumStars, setMediumStars] = useState('');
  const [bigStars,    setBigStars]    = useState('');

  const textParts = text ? text.split(',').map(p => p.trim()) : [];

  useEffect(() => {
    setSmallStars(generateStarBoxShadow(700));
    setMediumStars(generateStarBoxShadow(200));
    setBigStars(generateStarBoxShadow(100));
    document.documentElement.style.setProperty(
      '--animation-iteration',
      loop ? 'infinite' : '1',
    );
  }, [loop]);

  return (
    <div className={cn('cosmic-parallax-container', className)}>
      <div className="cosmic-stars"        style={{ boxShadow: smallStars  }} />
      <div className="cosmic-stars-medium" style={{ boxShadow: mediumStars }} />
      <div className="cosmic-stars-large"  style={{ boxShadow: bigStars    }} />

      {showContent && (
        <>
          <div id="horizon"><div className="glow" /></div>
          <div id="earth" />

          {head && <div id="title">{head.toUpperCase()}</div>}

          {textParts.length > 0 && (
            <div id="subtitle">
              {textParts.map((part, i) => (
                <React.Fragment key={i}>
                  <span className={`subtitle-part-${i + 1}`}>{part.toUpperCase()}</span>
                  {i < textParts.length - 1 && ' '}
                </React.Fragment>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { CosmicParallaxBg };
