interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 240 }) => {
  return (
    <img
      src="/images/icons/icon.png"
      alt="logo"
      className="m-auto"
      style={{ width: size, margin: "0 auto" }}
    />
  );
};

export default Logo;
