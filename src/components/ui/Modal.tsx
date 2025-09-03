import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import { Button } from "./Button";

interface ModalPortalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Modal Portal
export function Modal({ children, isOpen, setIsOpen }: ModalPortalProps) {
  const modalElement = document.getElementById("modal");

  if (!modalElement) {
    return null;
  }

  return createPortal(
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      {children}
    </ModalWrapper>,
    modalElement,
  );
}

// Modal
export function ModalWrapper({
  children,
  isOpen,
  setIsOpen,
}: ModalPortalProps) {
  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-stone-900/75 p-10"
      onClick={() => setIsOpen(false)}
    >
      <dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-[400px] overflow-auto bg-stone-50 p-10"
      >
        <div className="flex justify-between">
          <h2 className="text-sm font-semibold uppercase">Saved Canvas</h2>
          <Button size="small" onClick={() => setIsOpen(false)}>
            x
          </Button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </dialog>
    </div>
  );
}
