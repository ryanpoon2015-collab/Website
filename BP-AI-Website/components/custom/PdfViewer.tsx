// PdfViewer.tsx — render in a PORTAL so no transformed/zoomed parent can skew hit-testing
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MyButton from "../templates/MyButton";

interface PdfViewerProps {
  src: string | null;
  setShowPdf: Dispatch<SetStateAction<boolean>>;
}

const BAR_H = 56;

const PdfViewer: React.FC<PdfViewerProps> = ({ src, setShowPdf }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !src) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/90"
      // kill any inherited transforms/zoom that cause iframe click offset in DevTools
      style={{ transform: "none", zoom: 1 }}
    >
      <div className="fixed top-0 left-0 right-0 z-[10002] h-14 flex items-center justify-end gap-2 px-3">
        <MyButton
          label="CLOSE (X)"
          type="button"
          className="bg-red"
          onClick={() => setShowPdf(false)}
        />
      </div>

      <div
        className="fixed left-0 right-0 bottom-0 z-[10000]"
        style={{ top: BAR_H }}
      >
        <iframe
          src={src}
          title="Results PDF Fullscreen"
          className="w-full h-full block"
          style={{ border: 0 }}
          allow="fullscreen"
        />
      </div>
    </div>,
    document.body
  );
};

export default PdfViewer;
