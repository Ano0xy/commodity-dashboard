export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 bg-bgPrimary border-t border-borderDark relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2">CommodityTracker</h3>
          <p className="text-gray-500 text-sm">Premium Real-Time Commodity Tracking Platform</p>
        </div>

        <ul className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
          <li><a href="#" className="hover:text-gold transition-colors">Markets</a></li>
          <li><a href="#" className="hover:text-gold transition-colors">API</a></li>
          <li><a href="#" className="hover:text-gold transition-colors">Pricing</a></li>
          <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
        </ul>

      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-borderDark text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} CommodityTracker India. All rights reserved.</p>
        <p className="max-w-xl text-center md:text-right leading-relaxed">
          Disclaimer: Data displayed on this platform is for informational purposes only. While we strive for accuracy, real-time market data may be slightly delayed or differ from physical retail pricing.
        </p>
      </div>
    </footer>
  );
}
