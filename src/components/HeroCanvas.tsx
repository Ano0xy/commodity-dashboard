"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FRAME_COUNT = 40;

const currentFrame = (index: number) =>
  `/frames/ezgif-frame-${index.toString().padStart(3, "0")}.webp`;

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Update canvas on scroll
  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    let targetFrame = 0;
    let currentFrame = 0;
    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Set initial size

    const render = () => {
      // Lerp transition for smooth frame progression
      currentFrame += (targetFrame - currentFrame) * 0.1;
      
      const frameIndex = Math.round(currentFrame);
      const img = images[Math.min(FRAME_COUNT - 1, Math.max(0, frameIndex))];
      
      // ensure image is loaded before drawing
      if (img && img.complete) {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;  
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    // Subscribe to scroll updates
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      targetFrame = Math.min(
        FRAME_COUNT - 1,
        Math.floor(latest * FRAME_COUNT)
      );
    });

    // Start continuous render loop
    render();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [images, scrollYProgress]);

  // Opacity transforms for each text section
  const section1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const section2Opacity = useTransform(scrollYProgress, [0.2, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const section3Opacity = useTransform(scrollYProgress, [0.5, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
  const section4Opacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[calc(100vh+500px)] bg-bgPrimary">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Adds a dark gradient overlay on the canvas for better reading */}
        <div className="absolute inset-0 bg-gradient-to-b from-bgPrimary/40 via-transparent to-bgPrimary/80 z-0"></div>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover -z-10 opacity-70" />
        
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <motion.div style={{ opacity: section1Opacity }} className="absolute text-center max-w-3xl px-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-white mb-6">
              Live Commodity Intelligence
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Track gold, silver, and fuel prices in real-time with precision and clarity.
            </p>
          </motion.div>

          <motion.div style={{ opacity: section2Opacity }} className="absolute text-center px-6">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Track Gold & Silver Prices
            </h2>
            <p className="text-xl text-gold">Premium market analytics at your fingertips</p>
          </motion.div>

          <motion.div style={{ opacity: section3Opacity }} className="absolute text-center px-6">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Fuel Price Insights Across India
            </h2>
            <p className="text-xl text-priceUp">Stay ahead of the daily trends</p>
          </motion.div>

          <motion.div style={{ opacity: section4Opacity }} className="absolute text-center px-6 pointer-events-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Start Tracking Prices
            </h2>
            <button className="px-8 py-4 bg-gradient-to-r from-accent to-[#2E8B79] text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(79,156,143,0.3)] hover:shadow-[0_0_30px_rgba(79,156,143,0.6)]" onClick={() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
              })
            }}>
              View Live Dashboard
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
