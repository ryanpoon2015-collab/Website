interface FlipInterface {
  type?: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Flip: React.FC<FlipInterface> = ({ type = "horizontal", children }) => {
  return (
    <div className={type === "horizontal" ? "-scale-x-100" : "-scale-y-100"}>
      {children}
    </div>
  );
};

export default Flip;
