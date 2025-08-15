import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  className,
  children,
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeValue = value !== undefined ? value : internalValue;

  const setValue = (val) => {
    if (onValueChange) onValueChange(val);
    if (value === undefined) setInternalValue(val);
  };

  return (
    <TabsContext.Provider value={{ activeValue, setValue }}>
      <div className={`w-full ${className || ""}`}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  return (
    <div
      role="tablist"
      className={`inline-flex items-center gap-2 border-b border-gray-200 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className }) {
  const { activeValue, setValue } = useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setValue(value)}
      className={`px-4 py-2 text-sm font-medium rounded-t-md border-b-2 ${
        isActive
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700"
      } focus:outline-none ${className || ""}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }) {
  const { activeValue } = useContext(TabsContext);
  if (activeValue !== value) return <></>;

  return (
    <div role="tabpanel" className={`mt-2 ${className || ""}`}>
      {children}
    </div>
  );
}
