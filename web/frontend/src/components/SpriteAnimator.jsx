import { useEffect, useState } from "react";

export default function SpriteAnimator({
  src,
  sheetCols = 3,
  sheetRows = 1,
  row = 0,
  animate = false,
  fps = 8
}) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!animate) {
      setCurrentFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % sheetCols);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [animate, sheetCols, fps]);

  // CSS Math
  const bgSizeX = sheetCols * 100;
  const bgSizeY = sheetRows * 100;

  // Avoid division by zero if sheet has 1 col/row
  const bgPosX = sheetCols > 1 ? (currentFrame / (sheetCols - 1)) * 100 : 0;
  const bgPosY = sheetRows > 1 ? (row / (sheetRows - 1)) * 100 : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${bgSizeX}% ${bgSizeY}%`,
          backgroundPosition: `${bgPosX}% ${bgPosY}%`,
          mixBlendMode: "multiply", // Hides the white background
          filter: "contrast(1.1)" // Pop the colors slightly
        }}
      />
    </div>
  );
}