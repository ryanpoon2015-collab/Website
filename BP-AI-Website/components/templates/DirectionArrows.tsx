import { twMerge } from "tailwind-merge";

interface DirectionArrowsProps {
  icon: React.ReactNode;
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  onTouchEnd?: () => void;
  gap?: number;
}

const DirectionArrows: React.FC<DirectionArrowsProps> = ({
  icon,
  onUp,
  onDown,
  onLeft,
  onRight,
  onTouchEnd,
  gap = 1,
}) => {
  return (
    <div
      className={twMerge("csc")}
      style={{
        gap: `${gap}rem`,
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="" onTouchStart={onUp} onTouchEnd={onTouchEnd}>
        {icon}
      </div>
      <div
        className="rcs wf"
        style={{
          gap: `${gap}rem`,
        }}
      >
        <div
          className="-rotate-90"
          onTouchStart={onLeft}
          onTouchEnd={onTouchEnd}
        >
          {icon}
        </div>
        <div className="select-none o-0">{icon}</div>
        <div
          className="rotate-90"
          onTouchStart={onRight}
          onTouchEnd={onTouchEnd}
        >
          {icon}
        </div>
      </div>
      <div className="rotate-180" onTouchStart={onDown} onTouchEnd={onTouchEnd}>
        {icon}
      </div>
    </div>
  );
};

export default DirectionArrows;
