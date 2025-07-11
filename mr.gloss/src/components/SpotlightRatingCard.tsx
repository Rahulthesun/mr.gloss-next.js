import React, { useEffect, useRef, useCallback, useMemo, ReactNode } from "react";


interface SpotlightRatingCardProps {
  logo: ReactNode;
  rating: number;
  maxRating?: number;
  reviewCount: number;
  businessName?: string;
  reviewSource: string;
  className?: string;
  glowColor?: string;
  onViewReviews?: () => void;
}

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 800,
  INITIAL_DURATION: 1200,
  TILT_INTENSITY: 0.8,
} as const;

const clamp = (value: number, min = 0, max = 100): number => Math.min(Math.max(value, min), max);
const round = (value: number, precision = 2): number => parseFloat(value.toFixed(precision));
const adjust = (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number => 
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const SpotlightRatingCard: React.FC<SpotlightRatingCardProps> = ({
  logo,
  rating,
  maxRating = 5,
  reviewCount,
  businessName,
  reviewSource,
  className = "",
  glowColor = "#10b981",
  onViewReviews
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  const ratingPercentage = (rating / maxRating) * 100;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cardRef.current || !spotlightRef.current) return;

    const card = cardRef.current;
    const spotlight = spotlightRef.current;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10 * ANIMATION_CONFIG.TILT_INTENSITY;
    const rotateY = ((x - centerX) / centerX) * 10 * ANIMATION_CONFIG.TILT_INTENSITY;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
    const intensity = Math.max(0, 1 - (distance / maxDistance));
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    
    spotlight.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, ${glowColor}40 0%, transparent 60%)`;
    spotlight.style.opacity = `${intensity * 0.8}`;
    
    // Update CSS variables for other effects
    card.style.setProperty('--mouse-x', `${percentX}%`);
    card.style.setProperty('--mouse-y', `${percentY}%`);
    card.style.setProperty('--intensity', `${intensity}`);
  }, [glowColor]);

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
    if (cardRef.current) {
      cardRef.current.classList.add('spotlight-active');
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    if (!cardRef.current || !spotlightRef.current) return;

    const card = cardRef.current;
    const spotlight = spotlightRef.current;
    
    card.classList.remove('spotlight-active');
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    spotlight.style.opacity = '0';
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

//   const renderStars = useMemo(() => {
//     const stars = [];
//     for (let i = 0; i < maxRating; i++) {
//       if (i < filledStars) {
//         stars.push(
//           <div key={i} className="star-container">
//             <div className="star star-filled">★</div>
//           </div>
//         );
//       } else if (i === filledStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="star-container">
//             <div className="star star-half">
//               <span className="star-filled">★</span>
//               <span className="star-empty">★</span>
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(
//           <div key={i} className="star-container">
//             <div className="star star-empty">★</div>
//           </div>
//         );
//       }
//     }
//     return stars;
//   }, [rating, maxRating, filledStars, hasHalfStar]);



const renderStars = useMemo(() => {
    const stars = [];
    for (let i = 0; i < maxRating; i++) {
      if (i < filledStars) {
        stars.push(
          <div key={i}>
            <div className="text-4xl text-yellow-400 drop-shadow"><i className="fa-solid fa-star"></i></div>
          </div>
        );
      } else if (i === filledStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-[1.5em] h-[1.5em]">
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden text-4xl text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.7)]">
            <i className="fa-solid fa-star"></i>
            </div>
            <div className="text-4xl text-gray-700"><i className="fa-solid fa-star"></i></div>
          </div>
        );
      } else {
        stars.push(
          <div key={i}>
            <div className="text-4xl text-gray-700"><i className="fa-solid fa-star"></i></div>
          </div>
        );
      }
    }
    return stars;
  }, [maxRating, filledStars, hasHalfStar]);
  

  return (
    <>
      <div
        ref={cardRef}
        className={`spotlight-rating-card ${className}`}
        style={{
          '--glow-color': glowColor,
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--intensity': '0',
        } as React.CSSProperties}
      >
        {/* Spotlight Effect */}
        <div ref={spotlightRef} className="spotlight-overlay"></div>
        
        {/* Animated Border */}
        <div className="animated-border"></div>
        
        {/* Content */}
        <div className="card-content">
          {/* Logo Section */}
          <div className="logo-section">
            {logo}
          </div>

          {/* Rating Section */}
          <div className="rating-section">
            <div className="stars-container">
              {renderStars}
            </div>
            
            <div className="rating-score">
              {rating.toFixed(1)}
            </div>
            
            <div className="review-info">
              <span className="review-count">{reviewCount}</span>
              <span className="review-source">{reviewSource}</span>
            </div>
            
            {businessName && (
              <div className="business-name">
                {businessName}
              </div>
            )}
          </div>

          {/* Action Button */}
          <button 
            className="reviews-button"
            onClick={onViewReviews}
          >
            <span>{reviewSource}</span>
            <div className="button-glow"></div>
          </button>
        </div>

        {/* Floating Particles */}
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
        </div>
      </div>
    </>
  );
};

export { SpotlightRatingCard }