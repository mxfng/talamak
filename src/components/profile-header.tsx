interface ProfileHeaderProps {
  avatar: string;
  name: string;
  bio: string;
  scrollPosition?: number;
}

export function ProfileHeader({
  avatar,
  name,
  bio,
  scrollPosition = 0,
}: ProfileHeaderProps) {
  // Calculate avatar size based on scroll position
  // Start at 96px (w-24/h-24) and reduce down to 50px
  const minSize = 50;
  const maxSize = 96;
  const calculatedSize = Math.max(minSize, maxSize - scrollPosition * 0.5);

  // Dynamic styling for the avatar
  const avatarStyle = {
    width: `${calculatedSize}px`,
    height: `${calculatedSize}px`,
    transition: "width 0.1s ease-out, height 0.1s ease-out",
  };

  return (
    <div className="w-full flex py-4">
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <div
          className="relative rounded-full overflow-hidden"
          style={avatarStyle}
        >
          <img
            src={avatar}
            className="w-full h-full object-cover object-center"
            alt={name}
          />
        </div>

        <div className="text-center">
          <h1 className="font-bold text-2xl">{name}</h1>
          <p className="text-muted-foreground">{bio}</p>
        </div>
      </div>
    </div>
  );
}
