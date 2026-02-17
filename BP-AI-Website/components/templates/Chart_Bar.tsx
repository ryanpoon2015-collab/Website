import useDeviceDimensions from "@/hooks/useDeviceDimensions";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { twMerge } from "tailwind-merge";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export interface Chart_BarProps {
  bars: {
    values: { x: string; y: number }[];
    label: string;
    color?: string;
    stackId?: string;
  }[];
}

const Chart_Bar: React.FC<Chart_BarProps> = ({ bars }) => {
  const { isMobile } = useDeviceDimensions();

  const labels = bars.map(({ label, color, stackId }) => ({
    name: label,
    color,
    stackId,
  }));
  const transformedData: Record<string, number | string>[] = [];

  for (const bar of bars) {
    for (const { x, y } of bar.values) {
      const existingData = transformedData.find((d) => d.name === x);
      if (existingData) {
        existingData[bar.label] = y;
      } else {
        transformedData.push({ name: x, [bar.label]: y });
      }
    }
  }

  return (
    <div>
      <div className={twMerge(isMobile ? "w-80 h-48" : "w-132 h-72")}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={transformedData} margin={{}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" className="t15" interval={0} />
            <YAxis className="t25" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A1D1E",
                borderRadius: "0.75rem",
              }}
              cursor={{
                fill: "rgba(50, 50, 50, 0.1)", // Change background behind bar on hover
              }}
            />
            <Legend />
            {labels.map(({ name, color, stackId }, index) => (
              <Bar
                key={name}
                type="monotone"
                dataKey={name}
                stackId={stackId}
                fill={color || "#82ca9d"}
                activeBar={
                  <Rectangle fill={lightenHexColor(color || "#82ca9d")} />
                }
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart_Bar;

function lightenHexColor(hex: string, amount: number = 30): string {
  // Remove the '#' if present
  hex = hex.replace("#", "");

  // Parse the r, g, b values from the hex string
  const num = parseInt(hex, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;

  // Ensure r, g, b values are within bounds
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  // Convert the new r, g, b values back to hex and pad with zeroes if needed
  const newHex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  return `#${newHex}`;
}
