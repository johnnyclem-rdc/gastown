import SpriteAnimator from "./SpriteAnimator.jsx";

const SPRITE_CONFIG = {
  frameWidth: 32,
  frameHeight: 32,
  frameCount: 4, // Assuming 4 frames per row
  fps: 8,
  scale: 2 // Scale up the small pixel art
};

export default function Character({ name, role, status, sprite, title, position, zIndex }) {
  const isIdle = status === "IDLE";
  const isWorking = status === "WORKING" || status === "MERGING";
  
  // Row 0: Idle/Walking Down? 
  // Row 1: Working?
  // We will assume a standard layout: Row 0 = Idle/Walk, Row 1 = Action/Work
  // If no sprite sheet exists (fallback), Row 0 is safe.
  const row = isWorking ? 1 : 0;

  return (
    <div
      className={`character ${isIdle ? "character-idle" : ""}`}
      style={{ ...position, zIndex }}
      title={title}
    >
      <div className="character-sprite-container">
        {sprite ? (
          <SpriteAnimator 
            src={sprite}
            frameWidth={SPRITE_CONFIG.frameWidth}
            frameHeight={SPRITE_CONFIG.frameHeight}
            frameCount={SPRITE_CONFIG.frameCount}
            row={row}
            fps={SPRITE_CONFIG.fps}
            scale={SPRITE_CONFIG.scale}
          />
        ) : (
          <div className="character-avatar">{name?.charAt(0) ?? "?"}</div>
        )}
      </div>
      {isWorking && <div className="status-indicator">🔨</div>}
      {isIdle && <div className="status-indicator">💤</div>}
    </div>
  );
}