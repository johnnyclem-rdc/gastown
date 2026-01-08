import { useEffect, useState } from "react";

export default function SpriteAnimator({
  src,
  sheetCols = 3,
  sheetRows = 4,
  frameWidth = 32,
  frameHeight = 32,
  animate = true,
  row = 0,
  fps = 8,
  scale = 1
}) {
  const [currentFrame, setCurrentFrame] = useState(animate ? 0 : 1);

  useEffect(() => {
    if (!animate) {
      setCurrentFrame(1); // Static pose (middle column usually)
      return;
    }

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % sheetCols);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [animate, sheetCols, fps]);

  // Calculate shift
  const x = -(currentFrame * frameWidth);
  const y = -(row * frameHeight);

  return (
    <div
      style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        overflow: "hidden",
        position: "relative",
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
        imageRendering: "pixelated", // Critical for pixel art
        filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.3))" // Shadow for pop
      }}
    >
      <img
        src={src}
        alt="sprite"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          // We don't set width/height on the img, we let it be its natural size
          // but we transform it to show the window
          transform: `translate(${x}px, ${y}px)`,
          maxWidth: "none", // Prevent css constraints from shrinking the sheet
          maxHeight: "none"
        }}
      />
    </div>
  );
}
