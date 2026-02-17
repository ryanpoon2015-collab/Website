import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface NextButtonProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({
  onClick,
  size = 175,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 129 163"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2003_35470"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="-1"
        width="130"
        height="165"
      >
        <path d="M0 -0.436303H129.297V163.503H0V-0.436303Z" fill="white" />
      </mask>
      <g mask="url(#mask0_2003_35470)">
        <mask
          id="mask1_2003_35470"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="-1"
          width="129"
          height="164"
        >
          <path
            d="M105.142 163H23.6472C17.3748 163 11.3591 160.511 6.92427 156.076C2.48945 151.641 0 145.625 0 139.353V23.483C0 17.2106 2.48945 11.1948 6.92427 6.76001C11.3591 2.32519 17.3748 -0.164256 23.6472 -0.164256H105.142C111.414 -0.164256 117.43 2.32519 121.865 6.76001C126.3 11.1948 128.794 17.2106 128.794 23.483V139.353C128.794 145.625 126.3 151.641 121.865 156.076C117.43 160.511 111.414 163 105.142 163Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask1_2003_35470)">
          <mask
            id="mask2_2003_35470"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="-1"
            y="-1"
            width="132"
            height="165"
          >
            <path
              d="M130.011 -0.436303H-0.077369V163.816H130.011V-0.436303Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask2_2003_35470)">
            <mask
              id="mask3_2003_35470"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="129"
              height="163"
            >
              <path d="M0 0H128.794V163H0V0Z" fill="white" />
            </mask>
            <g mask="url(#mask3_2003_35470)">
              <mask
                id="mask4_2003_35470"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="-1"
                width="129"
                height="164"
              >
                <path
                  d="M105.142 163H23.6472C17.3748 163 11.3591 160.511 6.92427 156.076C2.48945 151.641 0 145.625 0 139.353V23.483C0 17.2106 2.48945 11.1948 6.92427 6.76001C11.3591 2.32519 17.3748 -0.164256 23.6472 -0.164256H105.142C111.414 -0.164256 117.43 2.32519 121.865 6.76001C126.3 11.1948 128.794 17.2106 128.794 23.483V139.353C128.794 145.625 126.3 151.641 121.865 156.076C117.43 160.511 111.414 163 105.142 163Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask4_2003_35470)">
                <path
                  d="M128.794 163V0H0V163H128.794Z"
                  fill="url(#paint0_radial_2003_35470)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
      <path
        d="M27.5434 82.9123V61.1694H33.8466L41.5048 76.7323H41.5664V61.1694H46.4324V82.9123H40.1703L32.471 67.3699H32.4094V82.9123H27.5434Z"
        fill="white"
      />
      <path
        d="M49.476 82.9123V61.1694H63.2322V65.3167H54.5268V69.9363H62.0003V73.5909H54.5268V78.7238H63.5402V82.9123H49.476Z"
        fill="white"
      />
      <path
        d="M64.3505 82.9123L71.1054 71.4762L64.5353 61.1694H70.5099L74.5957 68.2117L78.7431 61.1694H84.8204L78.045 71.4762L84.9847 82.9123H78.9074L74.5957 75.254L70.3457 82.9123H64.3505Z"
        fill="white"
      />
      <path
        d="M91.3308 82.9123V65.6247H85.5819V61.1694H102.295V65.6247H96.5663V82.9123H91.3308Z"
        fill="white"
      />
      <path
        d="M36.2587 95.364L81.7053 95.364"
        stroke="white"
        strokeWidth="3.93013"
      />
      <path
        d="M82.6909 89.4509L90.575 95.364L82.6909 101.277L82.6909 89.4509Z"
        fill="white"
        stroke="white"
        strokeWidth="3.93013"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <radialGradient
          id="paint0_radial_2003_35470"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(128.792 163.004) rotate(180) scale(207.872 207.872)"
        >
          <stop stopColor="#5E8B96" />
          <stop offset="0.0078125" stopColor="#5D8A96" />
          <stop offset="0.0195312" stopColor="#5C8A95" />
          <stop offset="0.03125" stopColor="#5B8995" />
          <stop offset="0.0429688" stopColor="#5B8894" />
          <stop offset="0.0546875" stopColor="#5A8894" />
          <stop offset="0.0664062" stopColor="#598794" />
          <stop offset="0.078125" stopColor="#588693" />
          <stop offset="0.0898438" stopColor="#578693" />
          <stop offset="0.101562" stopColor="#578592" />
          <stop offset="0.113281" stopColor="#568492" />
          <stop offset="0.125" stopColor="#558492" />
          <stop offset="0.136719" stopColor="#548391" />
          <stop offset="0.148438" stopColor="#548291" />
          <stop offset="0.160156" stopColor="#538291" />
          <stop offset="0.171875" stopColor="#528190" />
          <stop offset="0.183594" stopColor="#518090" />
          <stop offset="0.195312" stopColor="#50808F" />
          <stop offset="0.207031" stopColor="#507F8F" />
          <stop offset="0.21875" stopColor="#4F7E8F" />
          <stop offset="0.230469" stopColor="#4E7E8E" />
          <stop offset="0.242188" stopColor="#4D7D8E" />
          <stop offset="0.253906" stopColor="#4C7C8D" />
          <stop offset="0.261719" stopColor="#4C7C8D" />
          <stop offset="0.269531" stopColor="#4B7B8D" />
          <stop offset="0.277344" stopColor="#4B7B8D" />
          <stop offset="0.285156" stopColor="#4A7B8C" />
          <stop offset="0.292969" stopColor="#4A7A8C" />
          <stop offset="0.300781" stopColor="#497A8C" />
          <stop offset="0.308594" stopColor="#49798C" />
          <stop offset="0.316406" stopColor="#48798B" />
          <stop offset="0.324219" stopColor="#48788B" />
          <stop offset="0.332031" stopColor="#47788B" />
          <stop offset="0.339844" stopColor="#47778B" />
          <stop offset="0.347656" stopColor="#46778A" />
          <stop offset="0.355469" stopColor="#46778A" />
          <stop offset="0.363281" stopColor="#45768A" />
          <stop offset="0.371094" stopColor="#44768A" />
          <stop offset="0.378906" stopColor="#447589" />
          <stop offset="0.386719" stopColor="#437589" />
          <stop offset="0.394531" stopColor="#437489" />
          <stop offset="0.402344" stopColor="#427489" />
          <stop offset="0.410156" stopColor="#427388" />
          <stop offset="0.417969" stopColor="#417388" />
          <stop offset="0.425781" stopColor="#417388" />
          <stop offset="0.433594" stopColor="#407288" />
          <stop offset="0.441406" stopColor="#407287" />
          <stop offset="0.449219" stopColor="#3F7187" />
          <stop offset="0.457031" stopColor="#3F7187" />
          <stop offset="0.464844" stopColor="#3E7087" />
          <stop offset="0.472656" stopColor="#3E7086" />
          <stop offset="0.480469" stopColor="#3D6F86" />
          <stop offset="0.488281" stopColor="#3D6F86" />
          <stop offset="0.496094" stopColor="#3C6F85" />
          <stop offset="0.503906" stopColor="#3B6E85" />
          <stop offset="0.515625" stopColor="#3B6D85" />
          <stop offset="0.527344" stopColor="#3A6D84" />
          <stop offset="0.539062" stopColor="#396C84" />
          <stop offset="0.550781" stopColor="#386B84" />
          <stop offset="0.5625" stopColor="#376B83" />
          <stop offset="0.574219" stopColor="#376A83" />
          <stop offset="0.585938" stopColor="#366982" />
          <stop offset="0.597656" stopColor="#356982" />
          <stop offset="0.609375" stopColor="#346882" />
          <stop offset="0.621094" stopColor="#336781" />
          <stop offset="0.632812" stopColor="#336781" />
          <stop offset="0.640625" stopColor="#326681" />
          <stop offset="0.648438" stopColor="#326680" />
          <stop offset="0.65625" stopColor="#316580" />
          <stop offset="0.664062" stopColor="#316580" />
          <stop offset="0.671875" stopColor="#306480" />
          <stop offset="0.679688" stopColor="#30647F" />
          <stop offset="0.6875" stopColor="#2F647F" />
          <stop offset="0.695312" stopColor="#2E637F" />
          <stop offset="0.703125" stopColor="#2E637F" />
          <stop offset="0.710938" stopColor="#2D627E" />
          <stop offset="0.71875" stopColor="#2D627E" />
          <stop offset="0.726562" stopColor="#2C617E" />
          <stop offset="0.734375" stopColor="#2C617E" />
          <stop offset="0.742188" stopColor="#2B607D" />
          <stop offset="0.75" stopColor="#2B607D" />
          <stop offset="0.757812" stopColor="#2A5F7D" />
          <stop offset="0.769531" stopColor="#295F7C" />
          <stop offset="0.78125" stopColor="#285E7C" />
          <stop offset="0.792969" stopColor="#285D7C" />
          <stop offset="0.804688" stopColor="#275D7B" />
          <stop offset="0.816406" stopColor="#265C7B" />
          <stop offset="0.824219" stopColor="#265C7B" />
          <stop offset="0.832031" stopColor="#255B7A" />
          <stop offset="0.839844" stopColor="#255B7A" />
          <stop offset="0.847656" stopColor="#245A7A" />
          <stop offset="0.855469" stopColor="#245A7A" />
          <stop offset="0.863281" stopColor="#235A79" />
          <stop offset="0.871094" stopColor="#235979" />
          <stop offset="0.878906" stopColor="#225979" />
          <stop offset="0.890625" stopColor="#215878" />
          <stop offset="0.902344" stopColor="#205778" />
          <stop offset="0.914062" stopColor="#205778" />
          <stop offset="0.921875" stopColor="#1F5677" />
          <stop offset="0.929688" stopColor="#1F5677" />
          <stop offset="0.9375" stopColor="#1E5577" />
          <stop offset="0.945312" stopColor="#1D5577" />
          <stop offset="0.957031" stopColor="#1D5476" />
          <stop offset="0.964844" stopColor="#1C5476" />
          <stop offset="0.972656" stopColor="#1B5376" />
          <stop offset="0.984375" stopColor="#1B5375" />
          <stop offset="0.992188" stopColor="#1A5275" />
          <stop offset="1" stopColor="#1A5275" />
        </radialGradient>
      </defs>
    </MotionSvg>
  );
};

export default NextButton;
