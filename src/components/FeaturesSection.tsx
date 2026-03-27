"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: 'Real-Time Data Accuracy',
    description: 'Live updates powered by market data APIs with minimal latency ensuring you never miss a tick.',
    position: 'left',
    icon: '⚡'
  },
  {
    title: 'City-Based Pricing',
    description: 'Track fuel prices across major Indian cities instantly. Localized data for localized decisions.',
    position: 'right',
    icon: '📍'
  },
  {
    title: '8-Day Historical Trends',
    description: 'Analyze short-term market movement with interactive financial charts and deep historical insight.',
    position: 'left',
    icon: '📊'
  },
  {
    title: 'Multi-Commodity Tracking',
    description: 'Monitor gold, silver, petrol, diesel, and gas in one unified, high-performance dashboard.',
    position: 'right',
    icon: '🌐'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-32 px-6 md:px-12 bg-bgPrimary relative z-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Engineered for Precision</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Premium tools built for tracking the markets that matter most.</p>
        </div>

        <div className="flex flex-col gap-24">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-center gap-12 ${feature.position === 'right' ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2">
                <div className="aspect-video bg-bgSecondary rounded-2xl border border-borderDark flex items-center justify-center p-8 relative overflow-hidden group shadow-2xl">
                  <div className="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <span className="text-8xl filter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transform group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </span>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-left">
                <h3 className="text-3xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-xl text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
