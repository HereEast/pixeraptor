import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Button } from "./Button";

interface ModalPortalProps {
  children: ReactNode;
  title?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Modal Portal
export function Modal({
  children,
  title,
  isOpen,
  setIsOpen,
}: ModalPortalProps) {
  if (typeof window === "undefined") {
    return null;
  }

  const modalElement = document.getElementById("modal");

  if (!modalElement) {
    return null;
  }

  return createPortal(
    <ModalWrapper title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
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
}: ModalPortalProps) {
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
        console.log(e.target, e.currentTarget);
        console.log(e.target === e.currentTarget);
        if (e.target === e.currentTarget) {
          e.stopPropagation();
          setIsOpen(false);
        }
      }}
    >
      <div
        className="mx-auto w-fit bg-stone-50 p-5 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
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
        <div>{children}</div>
      </div>
    </dialog>
  );
}
