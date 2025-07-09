import React from "react";

interface BackgroundTextProps {
  text: string;
}

const BackgroundText: React.FC<BackgroundTextProps> = ({ text }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none">
      <h1 className="text-[20vw] font-extrabold text-transparent outline-blur-text">
        {text}
      </h1>
    </div>
  );
};

export default BackgroundText;
