interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    extraBold?: boolean;
    backgroundGraphic?: boolean;
    color?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
    text, 
    disabled = false, 
    speed = 5, 
    className = '', 
    extraBold = false,
    backgroundGraphic = false,
    color
}) => {
    const animationDuration = `${speed}s`;
    let style: React.CSSProperties = { animationDuration };
    
    if (color) {
        style.color = color;
    }
    
    if (extraBold) {
        style = {
            ...style,
            fontWeight: 1000,
            textShadow: '0 2px 20px rgba(0,0,0,0.7), 0 4px 40px rgba(0,0,0,0.5), 0 0 2px #fff',
        };
    }
    if (backgroundGraphic) {
        style = {
            ...style,
            fontWeight: 1000,
            opacity: 0.07,
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            textAlign: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
            letterSpacing: '0.08em',
            textShadow: '0 0 60px rgba(255,255,255,0.1)',
            color: color || '#e0e0e0', // Default to light gray for background graphics
        };
    }

    return (
        <div
            className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
            style={style}
        >
            {text}
        </div>
    );
};

export default ShinyText;