import React from "react";

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  link?: string;
  customClass?: string;
  image?: string;
  description?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const gradientMapping: Record<string, string> = {
  blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
  purple: "linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",
  red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
  indigo: "linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))",
  orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
  green: "linear-gradient(hsl(142, 76%, 36%), hsl(158, 64%, 52%))",
};

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  return (
    <div className={`icon-btns ${className || ""}`}>
      {items.map((item, index) => {
        const content = (
          <>
            {item.image && (
              <img src={item.image} alt={item.label} className="w-16 h-16 object-cover rounded-xl mb-2 mx-auto" />
            )}
            <span className="icon-btn__back" style={getBackgroundStyle(item.color)}></span>
            <span className="icon-btn__front">
              <span className="icon-btn__icon" aria-hidden="true">
                {item.icon}
              </span>
            </span>
            <span className="icon-btn__label">{item.label}</span>
            {item.description && (
              <span className="block text-xs text-gray-500 mt-1 text-center px-2">{item.description}</span>
            )}
          </>
        );
        return item.link ? (
          <a href={item.link} key={index} style={{ textDecoration: 'none' }}>
            <button
              type="button"
              className={`icon-btn ${item.customClass || ""}`}
              aria-label={item.label}
            >
              {content}
            </button>
          </a>
        ) : (
          <button
            key={index}
            type="button"
            className={`icon-btn ${item.customClass || ""}`}
            aria-label={item.label}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default GlassIcons;
