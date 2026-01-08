import SpriteAnimator from "./SpriteAnimator.jsx";

const SPRITE_CONFIG = {
  frameWidth: 32,
  frameHeight: 48, // Updated height
  totalFrames: 4,
  fps: 8,
  scale: 2
};

export default function Character({ name, role, status, sprite, title, position, zIndex }) {
  const isIdle = status === "IDLE";
  const isWorking = status === "WORKING" || status === "MERGING";
  
  // Logic: 
  // Working -> Row 1 (Action)
  // Idle -> Row 0, but pause animation (fps=0)
  // Default -> Row 0, animated (Walking)
  
  let animationRow = 0;
  let fps = SPRITE_CONFIG.fps;

  if (isWorking) {
    animationRow = 1;
  } else if (isIdle) {
    animationRow = 0;
    fps = 0; // Pause
  }

  return (
    <div
      className="character"
      style={{ ...position, zIndex }}
      title={title}
    >
      <div 
        className="character-sprite-container"
        style={{ filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.3))" }}
      >
        {sprite ? (
          <SpriteAnimator 
            src={sprite}
            frameWidth={SPRITE_CONFIG.frameWidth}
            frameHeight={SPRITE_CONFIG.frameHeight}
            totalFrames={SPRITE_CONFIG.totalFrames}
            animationRow={animationRow}
            fps={fps}
            scale={SPRITE_CONFIG.scale}
          />
        ) : (
          <div className="character-avatar">{name?.charAt(0) ?? "?"}</div>
        )}
      </div>
    </div>
  );
}