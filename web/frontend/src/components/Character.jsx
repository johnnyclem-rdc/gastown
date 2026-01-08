import SpriteAnimator from "./SpriteAnimator.jsx";

export default function Character({ name, role, status, sprite, cols, rows, title, position, zIndex }) {
  const isWorking = status === "WORKING" || status === "MERGING";
  
  // Logic: 
  // Working -> Row 2 (Right/Side view usually action)
  // Idle/Default -> Row 0 (Down/Front view)
  const animationRow = isWorking ? 2 : 0;

  return (
    <div
      className="character"
      style={{ ...position, zIndex }}
      title={title}
    >
      <div 
        className="character-sprite-container"
        style={{ width: '48px', height: '48px' }}
      >
        {sprite ? (
          <SpriteAnimator 
            src={sprite}
            sheetCols={cols}
            sheetRows={rows}
            animate={true}
            row={animationRow}
            fps={8}
          />
        ) : (
          <div className="character-avatar">{name?.charAt(0) ?? "?"}</div>
        )}
      </div>
    </div>
  );
}
