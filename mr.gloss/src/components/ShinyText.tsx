

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    backgroundGraphic?: boolean;
    color?: string;
    gradient?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
    text, 
    disabled = false, 
    speed = 5, 
    className = '',
    gradient,
    color
}) => {
    const animationDuration = `${speed}s`;

    // If gradient is provided, create a combined effect
    if (gradient) {
        const shineGradient = `linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 70%)`;
        const combinedGradient = `${shineGradient}, ${gradient}`;
        
        return (
            <div
                className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
                style={{
                    animationDuration,
                    background: combinedGradient,
                    backgroundSize: '200% 100%, 100% 100%',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    animation: disabled ? 'none' : 'shine 3s linear infinite'
                }}
            >
                {text}
            </div>
        );
    }

    const style: React.CSSProperties = {
        animationDuration,
        ...(color && { color })
    };

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