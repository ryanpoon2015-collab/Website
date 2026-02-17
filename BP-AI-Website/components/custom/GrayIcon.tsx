import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface GrayIconProps {
  text: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const GrayIcon: React.FC<GrayIconProps> = ({
  text,
  onClick,
  size = 300,
  nonBouncing = false,
}) => {
  return (
    <div className="relative">
      <MotionSvg
        onClick={onClick}
        className={twMerge("sn", !nonBouncing && onClick && "cp")}
        whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
        width={size}
        viewBox="0 0 232 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_2003_11530"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="-2"
          y="-2"
          width="236"
          height="143"
        >
          <path
            d="M233.389 -1.27577H-1.39304V140.38H233.389V-1.27577Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_2003_11530)">
          <mask
            id="mask1_2003_11530"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="-1"
            y="0"
            width="234"
            height="140"
          >
            <path d="M-0.542554 0H232V139.745H-0.542554V0Z" fill="white" />
          </mask>
          <g mask="url(#mask1_2003_11530)">
            <mask
              id="mask2_2003_11530"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="-1"
              y="0"
              width="234"
              height="140"
            >
              <path
                d="M208.396 139.745H23.4512C17.1903 139.745 11.1854 137.26 6.75869 132.833C2.33194 128.407 -0.15299 122.402 -0.15299 116.141V23.6094C-0.15299 17.3484 2.33194 11.3436 6.75869 6.9168C11.1854 2.49005 17.1903 0 23.4512 0H208.396C214.657 0 220.662 2.49005 225.089 6.9168C229.516 11.3436 232.001 17.3484 232.001 23.6094V116.141C232.001 122.402 229.516 128.407 225.089 132.833C220.662 137.26 214.657 139.745 208.396 139.745Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask2_2003_11530)">
              <mask
                id="mask3_2003_11530"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="-2"
                y="-2"
                width="235"
                height="143"
              >
                <path
                  d="M232.077 -1.27577H-1.39304V140.38H232.077V-1.27577Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask3_2003_11530)">
                <mask
                  id="mask4_2003_11530"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="-1"
                  y="0"
                  width="233"
                  height="140"
                >
                  <path
                    d="M-0.0816275 0H232V139.745H-0.0816275V0Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask4_2003_11530)">
                  <mask
                    id="mask5_2003_11530"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="-1"
                    y="0"
                    width="233"
                    height="140"
                  >
                    <path
                      d="M208.396 139.745H23.4508C17.1898 139.745 11.185 137.26 6.7582 132.833C2.33145 128.407 -0.153479 122.402 -0.153479 116.141V23.6094C-0.153479 17.3484 2.33145 11.3436 6.7582 6.9168C11.185 2.49005 17.1898 0 23.4508 0H208.396C214.657 0 220.662 2.49005 225.088 6.9168C229.515 11.3436 232 17.3484 232 23.6094V116.141C232 122.402 229.515 128.407 225.088 132.833C220.662 137.26 214.657 139.745 208.396 139.745Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask5_2003_11530)">
                    <path d="M232 139.745H0V0H232V139.745Z" fill="#526271" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </MotionSvg>
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 t86c o-75">
        {text}
      </p>
    </div>
  );
};

export default GrayIcon;
