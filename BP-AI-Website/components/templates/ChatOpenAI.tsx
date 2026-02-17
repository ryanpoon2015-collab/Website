import { useEffect } from "react";

import usePost from "@/hooks/usePost";

interface ChatOpenAIProps {
  prompt: string;
  onResponse: (response: string) => void;
}

const ChatOpenAI: React.FC<ChatOpenAIProps> = ({ prompt, onResponse }) => {
  const [response, fetchStatus] = usePost<string>("chatgpt", {
    prompt,
  });

  useEffect(() => {
    if (fetchStatus === "success" && response) {
      onResponse(response);
    }
  }, [response]);

  return <>{response ?? ""}</>;
};

export default ChatOpenAI;
