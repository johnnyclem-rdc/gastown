import { useEffect, useState } from "react";

export default function SpriteAnimator({
  src,
  frameWidth = 32,
  frameHeight = 32,
  frameCount = 4,
  row = 0,
  fps = 8,
  scale = 1
}) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frameCount);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [frameCount, fps]);

  // Calculate background position
  // x: negative offset based on current frame
  // y: negative offset based on current row
  const bgX = -(currentFrame * frameWidth);
  const bgY = -(row * frameHeight);

  return (
    <div
      style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        backgroundImage: `url(${src})`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        transform: `scale(${scale})`,
        transformOrigin: "bottom center", // Anchor at feet
        filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.3))", // Shadow for pop
      }}
    />
  );
}
