import { X } from "lucide-react";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";

const SheetContext = createContext();

export function Sheet({ children, open, onOpenChange }) {
  const [openState, setOpenState] = useState(open || false);
  const dialogRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenState(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (
        openState &&
        dialogRef.current &&
        !dialogRef.current.contains(e.target)
      ) {
        setOpenState(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [openState]);

  useEffect(() => {
    if (onOpenChange) {
      onOpenChange?.(openState);
    }
  }, [onOpenChange]);

  return (
    <SheetContext.Provider value={{ openState, setOpenState, dialogRef }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children }) {
  const { setOpenState } = useContext(SheetContext);
  const trigger = cloneElement(children, {
    onClick: () => setOpenState(true),
    style: { cursor: "pointer" },
  });
  return trigger;
}

export function SheetContent({ children, className, dir = "left" }) {
  const { openState, dialogRef } = useContext(SheetContext);

  if (!openState) return <></>;

  return ReactDOM.createPortal(
    <>
      {/* overlay */}
      <div
        data-open={openState}
        className="fixed inset-0 z-50 bg-black/50 data-[open=true]:animate-fade-in data-[open=false]:animate-fade-out content-start"
      />

      {/* Content */}
      <div
        data-open={openState}
        className={
          "fixed inset-0 z-50 items-center grid bg-white rounded-md p-3 lg:p-6" +
          (className ? " " + className : "") +
          (dir == "left" || dir == "right"
            ? " h-screen max-md:max-w-[85%] md:max-w-[40%] lg:!max-w-[30%]"
            : " w-screen max-md:max-h-[85%] md:max-h-[40%] lg:!max-h-[30%]") +
          ` ${dir}-0` +
          ` data-[open=true]:animate-slide-in-${dir}`
        }
        ref={dialogRef}
      >
        {children}
      </div>
    </>,
    document.body
  );
}

export function SheetHeader({ children, className, isCloseVisible = true }) {
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

export function SheetTitle({ children, className }) {
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

export function SheetDescription({ children, className }) {
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

export function SheetFooter({ children, className }) {
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

export function SheetClose({ children }) {
  const { setOpenState } = useContext(SheetContext);
  const close = cloneElement(children, {
    onClick: () => setOpenState(false),
  });
  return close;
}
