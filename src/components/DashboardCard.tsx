"use client";

import { Commodity } from "@/lib/data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { useUnit } from "./UnitSelector";

export default function DashboardCard({ commodity }: { commodity: Commodity }) {
  const { unit } = useUnit();
  const isUp = commodity.change > 0;
  const isDown = commodity.change < 0;
  const color = isUp ? "#00FF9C" : isDown ? "#FF4D4D" : "#C0C0C0";

  const chartData = commodity.history.map((val, i) => ({ day: i, value: val }));

  // Compute display price based on selected unit
  // Fuel/CNG: no multiplier (fixed per liter/kg unit)
  // Silver: stored per kg — show per kg regardless of unit selector
  // Gold: stored per gram — multiply by selected unit
  const isFuel = ['petrol', 'diesel', 'cng'].includes(commodity.id);
  const isPerKg = commodity.isPerKg;

  let displayPrice: string;
  let displayUnit: string;

  if (isFuel) {
    displayPrice = `₹${commodity.pricePerGram.toFixed(2)}`;
    displayUnit = commodity.unit;
  } else if (isPerKg) {
    // Silver — always show per kg, no multiplier
    displayPrice = `₹${commodity.pricePerGram.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    displayUnit = "/kg";
  } else {
    // Gold — multiply by selected unit (1g, 10g, 100g)
    const multiplied = commodity.pricePerGram * unit;
    displayPrice = `₹${multiplied.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    displayUnit = `/${unit}g`;
  }

  return (
    <div className="relative group rounded-2xl overflow-hidden bg-bgSecondary border border-borderDark p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.05)] hover:-translate-y-1">
      <div className="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{commodity.name}</h3>
          <div className={`flex items-center gap-1 font-semibold ${isUp ? 'text-priceUp' : isDown ? 'text-priceDown' : 'text-gray-400'}`}>
            {isUp ? <TrendingUp size={16} /> : isDown ? <TrendingDown size={16} /> : <Minus size={16} />}
            <span>{Math.abs(commodity.change)}%</span>
          </div>
        </div>

        <div className="mb-6">
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {displayPrice}
          </span>
          <span className="text-sm text-gray-500 ml-1">{displayUnit}</span>
        </div>

        <div className="h-16 w-full mt-auto opacity-80 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <YAxis domain={['dataMin', 'dataMax']} hide />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
