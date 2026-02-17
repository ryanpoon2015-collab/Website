import useModal from "@/hooks/useModal";
import { useZxing } from "react-zxing";
import MyModal from "../templates/MyModal";
import { useEffect, useState } from "react";

interface QRScannerProps {
  children: React.ReactNode;
  onScan: (qr: string) => void;
  title?: string;
}

const QRScanner: React.FC<QRScannerProps> = ({
  children,
  onScan,
  title = "Scan QR",
}) => {
  const qrModal = useModal();

  return (
    <div>
      <div className="cp" onClick={qrModal.open}>
        {children}
      </div>
      <MyModal useModal={qrModal} title={title}>
        <QrScannerVideo
          onScan={(qr) => {
            onScan(qr);
            qrModal.close();
          }}
        />
      </MyModal>
    </div>
  );
};

export default QRScanner;

interface QrScannerVideoProps {
  onScan: (qr: string) => void;
}

const QrScannerVideo: React.FC<QrScannerVideoProps> = ({ onScan }) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      if (!result) return;
      onScan(result.getText());
    },
    //
    onError(error) {
      console.error("QR Scanner Error:", error);
    },
  });

  return (
    <div>
      <video ref={ref} />
    </div>
  );
};
