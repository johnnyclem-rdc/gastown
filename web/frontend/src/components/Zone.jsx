import { useState } from "react";
import SpriteAnimator from "./SpriteAnimator.jsx";

export default function Zone({ label, position, zIndex, sprite, fallbackEmoji }) {
  const [imgError, setImgError] = useState(false);

  // Default config for buildings (Sprite Sheets 3x3)
  const SPRITE_CONFIG = {
    sheetCols: 3,
    sheetRows: 3,
    frameWidth: 96,
    frameHeight: 96, 
    animate: false,
    row: 0,
    fps: 0, 
    scale: 1.5
  };

  return (
    <div className="zone" style={{ ...position, zIndex }}>
      <div className="zone-sprite">
        {sprite && !imgError ? (
          <SpriteAnimator 
            src={sprite} 
            sheetCols={SPRITE_CONFIG.sheetCols}
            sheetRows={SPRITE_CONFIG.sheetRows}
            frameWidth={SPRITE_CONFIG.frameWidth}
            frameHeight={SPRITE_CONFIG.frameHeight}
            animate={SPRITE_CONFIG.animate}
            row={SPRITE_CONFIG.row}
            fps={SPRITE_CONFIG.fps}
            scale={SPRITE_CONFIG.scale}
          />
        ) : (
          <div className="zone-fallback" aria-label={label}>
            <span>{fallbackEmoji}</span>
          </div>
        )}
      </div>
      <span className="zone-label">{label}</span>
    </div>
  );
}
