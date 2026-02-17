import { use } from "react";

import { Constants } from "@/classes/Constants";

interface WebsiteVersionProps {}

const WebsiteVersion: React.FC<WebsiteVersionProps> = ({}) => {
  use;
  return (
    <div className="absolute bottom-0 left-0 py-2 rsc wf tc">
      <p className="m-auto tracking-widest o-50 t2 t-gray">
        v {Constants.WebsiteVersion}
      </p>
    </div>
  );
};

export default WebsiteVersion;
