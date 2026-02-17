import { useEffect, useState } from "react";

import usePost from "@/hooks/usePost";

interface TTSOpenAIProps {
  text: string;
}

const TTSOpenAI: React.FC<TTSOpenAIProps> = ({ text }) => {
  const [audioKey, setAudioKey] = useState<number>(0);

  const [isMounted, setIsMounted] = useState(true);

  const [audioData, fetchStatus] = usePost<ArrayBuffer>(
    "tts_openai",
    { text },
    "audio/mpeg"
  );

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    console.log(audioData);
    setAudioKey((prev) => prev + 1);
  }, [audioData]);

  return (
    <div>
      {audioData && (
        <audio autoPlay key={audioKey}>
          <source
            src={URL.createObjectURL(new Blob([audioData]))}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default TTSOpenAI;
