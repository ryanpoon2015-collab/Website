import InfoIcon from "../svg/icon/InfoIcon";
import MyTooltip from "./MyTooltip";

interface GraphDataProps {
  title: string;
  children: React.ReactNode;
  tooltip: string;
}

const GraphData: React.FC<GraphDataProps> = ({ title, children, tooltip }) => {
  return (
    <div
      className="wf relative csc-4 py-4 px-6 border border-white border-opacity-40 rounded-2xl"
      style={{}}
    >
      <p className="t46c o-80">{title}</p>
      {children}
      <div className="absolute top-2 right-2">
        <MyTooltip tooltipId={title} tooltip={tooltip}>
          <InfoIcon size={20} />
        </MyTooltip>
      </div>
    </div>
  );
};

export default GraphData;
