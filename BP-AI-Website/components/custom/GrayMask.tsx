import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface GrayMaskProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

// The issue is the VERY FIRST mask: it paints BLACK (luminance=0), so it hides EVERYTHING.
// Fix 1 (simplest): delete the outer <mask id="mask0_2010_290"> and its <g mask="..."> wrapper.
// Fix 2: or make that path WHITE (luminance=1) so content shows.

const GrayMask: React.FC<GrayMaskProps> = ({
  onClick,
  size = 275,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge(
        "absolute top-0 left-0 sn",
        !nonBouncing && onClick && "cp"
      )}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      opacity={0.75}
      viewBox="0 0 232 304"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ✅ FIX: make the first mask white, or remove it entirely */}
      <mask
        id="mask0_2010_290"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="232"
        height="304"
      >
        <path d="M232 0H0V304H232V0Z" fill="white" />
      </mask>

      <g mask="url(#mask0_2010_290)">
        {/* keep the rest unchanged */}
        <mask
          id="mask1_2010_290"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="-2"
          y="-1"
          width="236"
          height="306"
        >
          <path
            d="M233.361 -0.874207H-1.17773V304.419H233.361V-0.874207Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask1_2010_290)">
          <mask
            id="mask2_2010_290"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="-1"
            width="232"
            height="305"
          >
            <path
              d="M0.0605469 -0.0399323H231.974V303.442H0.0605469V-0.0399323Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask2_2010_290)">
            <mask
              id="mask3_2010_290"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="232"
              height="304"
            >
              <path
                d="M208.394 303.442H23.6403C17.3858 303.442 11.3872 300.954 6.96507 296.532C2.5429 292.11 0.0605469 286.116 0.0605469 279.862V23.9749C0.0605469 17.7204 2.5429 11.7218 6.96507 7.29965C11.3872 2.87748 17.3858 0.395126 23.6403 0.395126H208.394C214.648 0.395126 220.647 2.87748 225.069 7.29965C229.491 11.7218 231.974 17.7204 231.974 23.9749V279.862C231.974 286.116 229.491 292.11 225.069 296.532C220.647 300.954 214.648 303.442 208.394 303.442Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask3_2010_290)">
              <mask
                id="mask4_2010_290"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="-2"
                y="-1"
                width="235"
                height="306"
              >
                <path
                  d="M232.051 -0.874207H-1.17773V304.419H232.051V-0.874207Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask4_2010_290)">
                <mask
                  id="mask5_2010_290"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="232"
                  height="304"
                >
                  <path
                    d="M0.0605469 0.343948H231.974V303.442H0.0605469V0.343948Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask5_2010_290)">
                  <mask
                    id="mask6_2010_290"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="232"
                    height="304"
                  >
                    <path
                      d="M208.394 303.442H23.6403C17.3858 303.442 11.3872 300.954 6.96507 296.532C2.5429 292.11 0.0605469 286.116 0.0605469 279.862V23.9749C0.0605469 17.7204 2.5429 11.7218 6.96507 7.29965C11.3872 2.87748 17.3858 0.395126 23.6403 0.395126H208.394C214.648 0.395126 220.647 2.87748 225.069 7.29965C229.491 11.7218 231.974 17.7204 231.974 23.9749V279.862C231.974 286.116 229.491 292.11 225.069 296.532C220.647 300.954 214.648 303.442 208.394 303.442Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask6_2010_290)">
                    <path
                      d="M231.974 303.442H0.0605469V-0.0399323H231.974V303.442Z"
                      fill="#526271"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </MotionSvg>
  );
};

export default GrayMask;
