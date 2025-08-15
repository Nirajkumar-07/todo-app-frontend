import { X } from "lucide-react";
import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";

const DialogContext = createContext();

export function Dialog({ children, open, onOpenChange }) {
  const [openState, setOpenState] = useState(open || false);
  const dialogRef = useRef();

  useEffect(() => {
    setOpenState(open);
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleMouseDown = (e) => {
      const active = document.activeElement;
      if (
        openState &&
        dialogRef.current &&
        !dialogRef.current.contains(e.target) &&
        !dialogRef.current.contains(active) &&
        !active?.closest('[role="dialog"], [data-dialog')
      ) {
        handleOpenChange(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [openState]);

  const handleOpenChange = useCallback((value) => {
    setOpenState(value);
    onOpenChange?.(value);
  }, []);

  return (
    <DialogContext.Provider value={{ openState, handleOpenChange, dialogRef }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children }) {
  const { handleOpenChange } = useContext(DialogContext);
  const trigger = cloneElement(children, {
    onClick: () => handleOpenChange(true),
  });
  return trigger;
}

export function DialogContent({ children, className }) {
  const { openState, dialogRef } = useContext(DialogContext);

  if (!openState) return <></>;

  return ReactDOM.createPortal(
    <>
      {/* overlay */}
      <div
        data-open={openState}
        className="fixed inset-0 z-50 bg-black/50 data-[open=true]:animate-fade-in data-[open=false]:animate-fade-out"
      />

      {/* Content */}
      <div
        data-open={openState}
        className={
          "fixed inset-0 z-50 items-center grid bg-white rounded-md max-h-[80%] h-fit max-w-[90%] md:max-w-[50%] w-full place-self-center p-6 data-[open=true]:animate-animate-in data-[open=false]:animate-animate-out" +
          (className ? " " + className : "")
        }
        ref={dialogRef}
      >
        {children}
      </div>
    </>,
    document.body
  );
}

export function DialogHeader({ children, className, isCloseVisible = true }) {
  return (
    <div
      className={"mb-4 w-full relative" + (className ? " " + className : "")}
    >
      <DialogClose>
        <i className="absolute top-[-8px] right-[-8px] cursor-pointer">
          <X size={16} />
        </i>
      </DialogClose>
      <div>{children}</div>
    </div>
  );
}

export function DialogTitle({ children, className }) {
  return (
    <h2
      className={
        "text-lg font-semibold leading-none tracking-tight" +
        (className ? " " + className : "")
      }
    >
      {children}
    </h2>
  );
}

export function DialogDescription({ children, className }) {
  return (
    <p
      className={
        "text-sm text-gray-500 mt-1" + (className ? " " + className : "")
      }
    >
      {children}
    </p>
  );
}

export function DialogFooter({ children, className }) {
  return (
    <div
      className={
        "mt-6 flex justify-end w-full gap-4 items-center" +
        (className ? " " + className : "")
      }
    >
      {children}
    </div>
  );
}

export function DialogClose({ children }) {
  const { handleOpenChange } = useContext(DialogContext);
  const close = cloneElement(children, {
    onClick: () => handleOpenChange(false),
  });
  return close;
}
