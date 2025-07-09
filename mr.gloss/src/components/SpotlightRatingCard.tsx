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
            <div className="text-4xl text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.7)]">★</div>
          </div>
        );
      } else if (i === filledStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-[1.5em] h-[1.5em]">
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden text-4xl text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.7)]">
              ★
            </div>
            <div className="text-4xl text-gray-700">★</div>
          </div>
        );
      } else {
        stars.push(
          <div key={i}>
            <div className="text-4xl text-gray-700">★</div>
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

      <style jsx>{`
        .spotlight-rating-card {
          position: relative;
          width: 360px;
          height: 480px;
          background: linear-gradient(135deg, 
            rgba(16, 185, 129, 0.04) 0%, 
            rgba(6, 78, 59, 0.18) 50%, 
            rgba(4, 47, 46, 0.22) 100%
          );
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(16, 185, 129, 0.12);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        }

        .spotlight-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1;
        }

        .animated-border {
          display: none;
        }

        .spotlight-rating-card.spotlight-active {
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.6),
            0 0 60px rgba(16, 185, 129, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset;
        }

        .spotlight-rating-card.spotlight-active .animated-border {
          opacity: 0.8;
        }

        .card-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px;
          text-align: center;
        }

        .logo-section {
          margin-bottom: 24px;
        }

        .rating-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
        }

        .stars-container {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-bottom: 8px;
        }

        .star-container {
          position: relative;
        }

        .star {
          font-size: 56px;
          line-height: 1;
          display: block;
          transition: all 0.3s ease;
          filter: drop-shadow(0 0 12px #fbbf24cc) drop-shadow(0 0 32px #fbbf24aa);
        }

        .star-filled {
          color: #ffd700;
          text-shadow: 0 0 24px #ffd700cc, 0 0 48px #ffd70088;
          animation: starGlow 1.8s ease-in-out infinite alternate;
        }

        .star-half {
          position: relative;
          overflow: visible;
        }

        .star-half .star-filled {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          overflow: hidden;
          color: #ffd700;
          text-shadow: 0 0 24px #ffd700cc, 0 0 48px #ffd70088;
        }

        .star-half .star-empty {
          color: #fff3;
        }

        .star-empty {
          color: #fff3;
        }

        .rating-score {
          font-size: 48px;
          font-weight: 900;
          color: #fbbf24;
          text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
          margin: 8px 0;
          animation: scoreGlow 2s ease-in-out infinite alternate;
        }

        .review-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 16px;
        }

        .review-count {
          font-weight: 600;
          color: var(--glow-color);
        }

        .review-source {
          font-weight: 500;
        }

        .business-name {
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
          font-weight: 500;
          margin-top: 8px;
        }

        .reviews-button {
          position: relative;
          background: linear-gradient(45deg, var(--glow-color), rgba(16, 185, 129, 0.8));
          border: none;
          border-radius: 16px;
          padding: 16px 32px;
          color: white;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
        }

        .reviews-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(16, 185, 129, 0.5);
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s;
        }

        .reviews-button:hover .button-glow {
          left: 100%;
        }

        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--glow-color);
          border-radius: 50%;
          opacity: 0.6;
          animation: float 6s ease-in-out infinite;
        }

        .particle-1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .particle-2 {
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .particle-3 {
          bottom: 30%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes borderShine {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes starGlow {
          0% { text-shadow: 0 0 24px #ffd700cc, 0 0 48px #ffd70088; }
          100% { text-shadow: 0 0 40px #ffd700ee, 0 0 80px #ffd70055; }
        }

        @keyframes scoreGlow {
          0% { text-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
          100% { text-shadow: 0 0 30px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.3); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }

        .spotlight-rating-card.spotlight-active .star-filled {
          animation: starGlow 1s ease-in-out infinite alternate;
        }

        .spotlight-rating-card.spotlight-active .rating-score {
          animation: scoreGlow 1s ease-in-out infinite alternate;
        }
      `}</style>
    </>
  );
};

export { SpotlightRatingCard }