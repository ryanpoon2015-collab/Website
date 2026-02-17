import { Constants } from "@/classes/Constants";

interface CopyrightProps {}

const Copyright: React.FC<CopyrightProps> = ({}) => {
  return (
    <div className="fixed bottom-0 left-0 py-2 rsc wf tc">
      <p className="m-auto o-75 t3">© {Constants.ProjTitle}</p>
    </div>
  );
};

export default Copyright;
