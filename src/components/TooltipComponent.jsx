import { useState } from "react";

const TooltipComponent = ({ content, position, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div
          className={`absolute bg-gray-800 text-white p-2 rounded-md shadow-md ${
            position === "Top" ? "bottom-full" : "top-full"
          }`}
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default TooltipComponent;