import { useEffect, useState } from "react";

export default function SpriteAnimator({
  src,
  frameWidth = 32,
  frameHeight = 32,
  totalFrames = 4,
  animationRow = 0,
  fps = 8,
  scale = 1
}) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (fps === 0) return; // Pause animation

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [totalFrames, fps]);

  // Calculate background position
  const bgX = -(currentFrame * frameWidth);
  const bgY = -(animationRow * frameHeight);

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
        transformOrigin: "bottom center",
      }}
    />
  );
}