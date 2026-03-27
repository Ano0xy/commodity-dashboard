"use client";

import { useState } from "react";
import { commodities } from "@/lib/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function HistoricalChart() {
  const [selectedId, setSelectedId] = useState(commodities[0].id);
  const selectedCommodity = commodities.find(c => c.id === selectedId) || commodities[0];

  const chartData = selectedCommodity.history.map((val, i) => ({
    day: `Day ${i + 1}`,
    value: val
  }));

  const isUp = selectedCommodity.change > 0;
  const isDown = selectedCommodity.change < 0;
  const color = isUp ? "#00FF9C" : isDown ? "#FF4D4D" : "#C0C0C0";

  return (
    <section className="py-24 px-6 md:px-12 bg-bgSecondary border-y border-borderDark relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">8-Day Market Trends</h2>
          <p className="text-gray-400 mb-6">Analyze short-term price movements for informed tracking and better insights.</p>
          
          <div className="flex flex-col gap-2">
            {commodities.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`text-left px-6 py-4 rounded-xl transition-all duration-300 border ${
                  selectedId === item.id 
                    ? 'bg-bgPrimary border-borderDark shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                    : 'bg-transparent border-transparent hover:bg-bgPrimary/50 text-gray-400 font-medium'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={selectedId === item.id ? 'text-white font-bold' : ''}>{item.name}</span>
                  {selectedId === item.id && (
                    <span className="text-sm px-2 py-1 rounded bg-bgSecondary border border-borderDark text-gray-300">
                      {item.pricePerGram}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-2/3 h-[500px] bg-bgPrimary rounded-2xl border border-borderDark p-4 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-glass-gradient opacity-50 pointer-events-none"></div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A35" vertical={false} />
              <XAxis dataKey="day" stroke="#6b7280" tick={{ fill: '#6b7280' }} tickMargin={10} axisLine={false} tickLine={false} />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#6b7280" 
                tick={{ fill: '#6b7280' }} 
                tickMargin={10} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#12121A', borderColor: '#2A2A35', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: color, fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Price"
                stroke={color} 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#0B0B0F', stroke: color, strokeWidth: 2 }}
                activeDot={{ r: 6, fill: color, stroke: '#fff', strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
