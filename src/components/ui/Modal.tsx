import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Button } from "./Button";
import { cn } from "~/utils";

interface ModalProps {
  children: ReactNode;
  title?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
}

// Modal Portal
export function Modal({
  children,
  title,
  isOpen,
  setIsOpen,
  className = "",
}: ModalProps) {
  if (typeof window === "undefined") {
    return null;
  }

  const modalElement = document.getElementById("modal");

  if (!modalElement) {
    return null;
  }

  return createPortal(
    <ModalWrapper
      title={title}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className={className}
    >
      {children}
    </ModalWrapper>,
    modalElement,
  );
}

// Modal
export function ModalWrapper({
  children,
  title = "",
  isOpen,
  setIsOpen,
  className = "",
}: ModalProps) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!isOpen && dialog.open) {
      dialog.close();
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-20 m-auto max-h-screen max-w-screen bg-transparent p-0"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
          setIsOpen(false);
        }
      }}
    >
      <div
        className={cn("mx-auto w-fit bg-stone-50 p-5 md:p-10", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          {title && (
            <h2 className="text-sm font-semibold uppercase">{title}</h2>
          )}
          <Button
            size="small"
            className="ml-auto"
            onClick={() => setIsOpen(false)}
          >
            x
          </Button>
        </div>

        {/* Content */}
        {children}
      </div>
    </dialog>
  );
}
