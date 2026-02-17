import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";

interface BarCodeScannerProps {
  onScan: (result: string) => void;
}

const BarcodeScanner: React.FC<BarCodeScannerProps> = ({ onScan }) => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  useEffect(() => {
    if (result) {
      onScan(result);
    }
  }, [result, onScan]);

  return (
    <div className="overflow-hidden">
      <video ref={ref} />
    </div>
  );
};

export default BarcodeScanner;
