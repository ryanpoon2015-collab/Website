import { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return { isOpen, open, close };
}

export default useModal;
