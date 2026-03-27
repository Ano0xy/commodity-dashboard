import { commodities } from "@/lib/data";
import DashboardCard from "./DashboardCard";
import { getGoldSilverPrices } from "@/lib/api";
import { UnitProvider, UnitSelector } from "./UnitSelector";

export default async function LiveDashboard() {
  let livePrices = null;
  try {
    livePrices = await getGoldSilverPrices();
  } catch (e) {
    console.error("Failed to fetch live prices", e);
  }

  // Merge live API prices (per gram / per kg) into commodity list
  const displayData = commodities.map(item => {
    if (!livePrices) return item;

    switch (item.id) {
      case 'gold-24k':
        return { ...item, pricePerGram: Number(livePrices.gold24k) || item.pricePerGram, change: livePrices.goldChange ?? item.change, trend: (livePrices.goldChange ?? 0) >= 0 ? 'up' : 'down' as 'up' | 'down' };
      case 'gold-24k-tax':
        // Gold 24K + 3% GST + 8% making = 111% of 22k price
        return { ...item, pricePerGram: Number(livePrices.gold22k) * 1.11 || item.pricePerGram, change: livePrices.goldChange ?? item.change, trend: (livePrices.goldChange ?? 0) >= 0 ? 'up' : 'down' as 'up' | 'down' };
      case 'gold-22k':
        return { ...item, pricePerGram: Number(livePrices.gold22k) || item.pricePerGram, change: livePrices.goldChange ?? item.change, trend: (livePrices.goldChange ?? 0) >= 0 ? 'up' : 'down' as 'up' | 'down' };
      case 'gold-18k':
        return { ...item, pricePerGram: Number(livePrices.gold18k) || item.pricePerGram, change: livePrices.goldChange ?? item.change, trend: (livePrices.goldChange ?? 0) >= 0 ? 'up' : 'down' as 'up' | 'down' };
      case 'silver-999':
        return { ...item, pricePerGram: Number(livePrices.silverPerKg) || item.pricePerGram, change: livePrices.silverChange ?? item.change, trend: (livePrices.silverChange ?? 0) >= 0 ? 'up' : 'down' as 'up' | 'down' };
      case 'silver-925':
        return { ...item, pricePerGram: Number(livePrices.silver925PerKg) || item.pricePerGram, change: livePrices.silverChange ?? item.change, trend: (livePrices.silverChange ?? 0) >= 0 ? 'up' : 'down' as 'up' | 'down' };
      case 'platinum':
        return { ...item, pricePerGram: Number(livePrices.platinumWithGST) || item.pricePerGram, change: livePrices.platinumChange ?? item.change, trend: (livePrices.platinumChange ?? 0) >= 0 ? 'up' : 'down' as 'up' | 'down' };
      case 'palladium':
        return { ...item, pricePerGram: Number(livePrices.palladiumWithGST) || item.pricePerGram, change: livePrices.palladiumChange ?? item.change, trend: (livePrices.palladiumChange ?? 0) >= 0 ? 'up' : 'down' as 'up' | 'down' };
      default:
        return item;
    }
  });

  return (
    <UnitProvider>
      <section className="py-24 px-6 md:px-12 starry-sky relative z-20 shadow-[0_-20px_50px_rgba(11,11,15,1)]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Live Market Dashboard</h2>
              <p className="text-gray-400 text-lg">Real-time pricing for precious metals and fuels across India.</p>
            </div>
            {/* Unit selector — only shown for gold cards (applies globally) */}
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Gold price per</span>
              <UnitSelector />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayData.map((item) => (
              <DashboardCard key={item.id} commodity={item} />
            ))}
          </div>
        </div>
      </section>
    </UnitProvider>
  );
}
