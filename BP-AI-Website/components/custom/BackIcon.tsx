import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface BackIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
  color?: string;
}

const BackIcon: React.FC<BackIconProps> = ({
  onClick,
  size = 58,
  nonBouncing = false,
  color = "#21718F",
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 46 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2003_34464"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="-1"
        y="0"
        width="47"
        height="45"
      >
        <path
          d="M45.8816 45L-0.17425 45L-0.174246 3.61355e-06L45.8816 7.63988e-06L45.8816 45Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_2003_34464)">
        <mask
          id="mask1_2003_34464"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="-1"
          y="0"
          width="47"
          height="45"
        >
          <path
            d="M22.91 45C35.5951 45 45.8816 34.9288 45.8816 22.5C45.8816 10.0712 35.5951 6.74061e-06 22.91 5.63164e-06C10.225 4.52268e-06 -0.056364 10.0712 -0.056365 22.5C-0.0563661 34.9288 10.225 45 22.91 45Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask1_2003_34464)">
          <mask
            id="mask2_2003_34464"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="-1"
            y="-1"
            width="48"
            height="48"
          >
            <path
              d="M-0.394718 46.3069L46.8399 46.3069L46.8399 -0.927676L-0.394714 -0.92768L-0.394718 46.3069Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask2_2003_34464)">
            <mask
              id="mask3_2003_34464"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="-1"
              y="0"
              width="47"
              height="45"
            >
              <path
                d="M45.8816 45L-0.107623 45L-0.107619 3.61937e-06L45.8816 7.63988e-06L45.8816 45Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask3_2003_34464)">
              <mask
                id="mask4_2003_34464"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="-1"
                y="0"
                width="47"
                height="45"
              >
                <path
                  d="M22.91 45C35.5951 45 45.8816 34.9288 45.8816 22.5C45.8816 10.0712 35.5951 6.74061e-06 22.91 5.63164e-06C10.225 4.52268e-06 -0.056364 10.0712 -0.056365 22.5C-0.0563661 34.9288 10.225 45 22.91 45Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask4_2003_34464)">
                <path
                  d="M45.8816 45L7.63988e-06 45L1.15739e-05 3.62878e-06L45.8816 7.63988e-06L45.8816 45Z"
                  fill={color}
                />
              </g>
            </g>
          </g>
        </g>
      </g>
      <path
        d="M38.8651 23.484L17.7848 23.484"
        stroke="white"
        strokeWidth="3.93013"
      />
      <path
        d="M16.8006 29.3884L8.9282 23.484L16.8006 17.5797L16.8006 29.3884Z"
        fill="white"
        stroke="white"
        strokeWidth="3.93013"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionSvg>
  );
};

export default BackIcon;
