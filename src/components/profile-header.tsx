interface ProfileHeaderProps {
  avatar: string;
  name: string;
  bio: string;
  scrollPosition?: number;
}

export function ProfileHeader({ avatar, name, bio }: ProfileHeaderProps) {
  return (
    <div className="w-full flex py-4">
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <div className="rounded-4xl overflow-hidden w-24 h-24">
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
