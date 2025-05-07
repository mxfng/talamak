import { useScrollStore } from "@/hooks/useScrollStore";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  avatar?: string;
  name: string;
  bio?: string;
  animated?: boolean;
  className?: string;
  compact?: boolean;
}

// 🎛️ Constants for easy tuning
const SCROLL_RANGE = 80;
const COMPACT_THRESHOLD = 0.8;

const AVATAR_MAX = 120;
const AVATAR_MIN = 64;

const FONT_MAX = 28;
const FONT_MIN = 28;

const PADDING_MAX = 18;
const PADDING_MIN = 0;

export function ProfileHeader({
  avatar,
  name,
  bio,
  animated = true,
  className,
  compact = false,
}: ProfileHeaderProps) {
  const scrollY = useScrollStore((state) => state.scrollPosition);

  const clamped = animated ? Math.min(Math.max(scrollY, 0), SCROLL_RANGE) : 0;
  const factor = animated ? clamped / SCROLL_RANGE : 0;
  const isCompact = compact || (animated && factor >= COMPACT_THRESHOLD);

  const avatarSize = isCompact
    ? 40
    : animated
      ? AVATAR_MAX - (AVATAR_MAX - AVATAR_MIN) * factor
      : AVATAR_MAX;
  const fontSize = isCompact
    ? 18
    : animated
      ? FONT_MAX - (FONT_MAX - FONT_MIN) * factor
      : FONT_MAX;
  const paddingY = isCompact
    ? 0
    : animated
      ? PADDING_MAX - (PADDING_MAX - PADDING_MIN) * factor
      : PADDING_MAX;

  return (
    <div
      className={cn(
        "w-full transition-all duration-75 ease-out",
        isCompact &&
          "bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
      style={{
        paddingBottom: `${paddingY}px`,
      }}
    >
      <div className="flex items-center justify-between transition-all duration-75 ease-out">
        {avatar && (
          <div
            className={cn(
              "overflow-hidden transition-all duration-75 ease-out",
              isCompact ? "rounded-full" : "rounded-4xl",
            )}
            style={{ width: avatarSize, height: avatarSize }}
          >
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        <div className="ml-4 flex-1">
          <h1
            className={cn(
              "font-bold transition-all duration-75 ease-out",
              isCompact && "tracking-tight",
            )}
            style={{ fontSize: `${fontSize}px` }}
          >
            {name}
          </h1>

          {!isCompact && (animated ? factor < 0.6 : true) && bio && (
            <p className="text-muted-foreground text-sm leading-tight max-w-xs mt-1 transition-opacity duration-200">
              {bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
