import { Tooltip as ReactTooltip } from "react-tooltip";

interface MyTooltipProps {
  tooltipId: string;
  children: React.ReactNode;
  tooltip: string;
}

const MyTooltip: React.FC<MyTooltipProps> = ({
  tooltipId,
  children,
  tooltip,
}) => {
  return (
    <div>
      <div data-tooltip-id={`tooltip-${tooltipId}`}>{children}</div>
      <ReactTooltip
        id={`tooltip-${tooltipId}`}
        style={{
          backgroundColor: "#2B2F31",
          color: "#fff",
          maxWidth: "300px",
        }}
        place="bottom-end"
        offset={10}
        content={tooltip}
      />
    </div>
  );
};

export default MyTooltip;
