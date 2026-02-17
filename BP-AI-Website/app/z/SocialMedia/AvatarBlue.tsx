import Avatar from "@/components/templates/Avatar";

interface AvatarBlueProps {
  src?: string;
  size?: number;
}

const AvatarBlue: React.FC<AvatarBlueProps> = ({ src, size }) => {
  return (
    <div className="bg-blue rounded-full" style={{ padding: "0.13rem" }}>
      <div className="bg-gray rounded-full" style={{ padding: "0.15rem" }}>
        <Avatar src={src} size={size} />
      </div>
    </div>
  );
};

export default AvatarBlue;
