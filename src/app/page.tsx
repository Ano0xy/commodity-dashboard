import HeroCanvas from "@/components/HeroCanvas";
import LiveDashboard from "@/components/LiveDashboard";
import HistoricalChart from "@/components/HistoricalChart";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bgPrimary text-foreground selection:bg-gold/30 selection:text-white">
      <HeroCanvas />
      <LiveDashboard />
      <HistoricalChart />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
