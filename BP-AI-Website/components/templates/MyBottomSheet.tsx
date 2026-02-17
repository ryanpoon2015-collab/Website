"use client";

import ModifiedBottomSheet from "../edited_libraries/reactDraggableBottomSheet";

interface MyBottomSheetProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const MyBottomSheet: React.FC<MyBottomSheetProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <ModifiedBottomSheet
      classNames={{
        draggable: "rounded-t-3xl",
        dragIndicator: {
          wrap: "rounded-t-3xl",
        },
      }}
      styles={{
        dragIndicator: {
          wrap: {
            backgroundColor: "#F6F6F6",
          },
        },
        window: {
          content: {
            backgroundColor: "#F6F6F6",
          },
        },
      }}
      isOpen={open}
      close={() => {
        if (onClose) {
          onClose();
        }
      }}
    >
      {children}
    </ModifiedBottomSheet>
  );
};

export default MyBottomSheet;
