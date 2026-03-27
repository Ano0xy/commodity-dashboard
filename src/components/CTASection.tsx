"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-32 px-6 md:px-12 bg-bgSecondary border-t border-borderDark relative z-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-bgPrimary to-bgSecondary/20 z-0"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-bgPrimary rounded-3xl p-12 md:p-16 border border-borderDark shadow-[0_0_50px_rgba(255,215,0,0.03)]"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Tracking Live Prices Now
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Stay ahead with real-time commodity insights. Your definitive source for precious metals and fuel data.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' })}
            className="px-10 py-5 bg-gradient-to-r from-accent to-[#2E8B79] text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(79,156,143,0.3)] hover:shadow-[0_0_30px_rgba(79,156,143,0.6)]"
          >
            View Live Dashboard
          </button>
        </motion.div>
      </div>
    </section>
  );
}
