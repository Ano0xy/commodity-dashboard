"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Unit = 1 | 10 | 100;

interface UnitContextType {
  unit: Unit;
  setUnit: (u: Unit) => void;
}

const UnitContext = createContext<UnitContextType>({ unit: 10, setUnit: () => {} });

export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<Unit>(10);
  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit() {
  return useContext(UnitContext);
}

export function UnitSelector() {
  const { unit, setUnit } = useUnit();
  const options: Unit[] = [1, 10, 100];

  return (
    <div className="inline-flex items-center gap-1 bg-bgSecondary border border-borderDark rounded-xl p-1">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setUnit(opt)}
          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200
            ${unit === opt
              ? "bg-gold text-black shadow-[0_0_10px_rgba(255,215,0,0.4)]"
              : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
        >
          {opt}g
        </button>
      ))}
    </div>
  );
}
