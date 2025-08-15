import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";

const DropdownContext = createContext();

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen, menuRef }}>
      <div
        className="relative inline-block text-left w-fit"
        id="container-portal"
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ children }) {
  const { setOpen } = useContext(DropdownContext);
  const trigger = cloneElement(children, {
    onClick: () => setOpen((prev) => !prev),
  });
  return trigger;
}

export function DropdownMenuContent({ children }) {
  const { open, menuRef } = useContext(DropdownContext);
  if (!open) return <></>;

  return ReactDOM.createPortal(
    <>
      {/* overlay */}
      <div
        data-open={open}
        className="fixed inset-0 z-50 bg-black/10 data-[open=true]:animate-fade-in data-[open=false]:animate-fade-out"
      />

      {/* Content */}
      <div
        data-open={open}
        className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 data-[open=true]:animate-animate-in data-[open=false]:animate-animate-out"
        ref={menuRef}
      >
        <div className="py-1">{children}</div>
      </div>
    </>,
    document.getElementById("container-portal")
  );
}

export function DropdownMenuItem({ children, onSelect, className }) {
  const { setOpen } = useContext(DropdownContext);

  return (
    <button
      type="button"
      className={
        "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" +
        " " +
        className
      }
      onClick={() => {
        onSelect?.();
        setOpen(false);
      }}
    >
      {children}
    </button>
  );
}
