export async function getGoldSilverPrices() {
  try {
    // Fetch metals prices from Metals API (free, no auth required)
    const metalsRes = await fetch("https://api.metals.live/v1/spot/metals?metals=gold,silver,platinum,palladium", {
      next: { revalidate: 300 }
    });

    // Fetch USD to INR exchange rate
    const exchangeRes = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 } // Exchange rates change less frequently
    });

    if (!metalsRes.ok || !exchangeRes.ok) {
      throw new Error("API request failed");
    }

    const metalsData = await metalsRes.json();
    const exchangeData = await exchangeRes.json();

    const usdToInr = exchangeData.rates.INR;

    // Gold: price is per troy oz in USD. Convert to INR then to per gram.
    const goldPricePerTroyOzUSD = metalsData.metals.gold.current;
    const goldPricePerTroyOzINR = goldPricePerTroyOzUSD * usdToInr;
    const TROY_OZ_TO_GRAM = 31.1035;
    const goldPerGramINR = goldPricePerTroyOzINR / TROY_OZ_TO_GRAM;

    // Gold karats: 24k = 100%, 22k = 91.67%, 18k = 75%
    const gold24k = goldPerGramINR;
    const gold22k = goldPerGramINR * 0.9167;
    const gold18k = goldPerGramINR * 0.75;

    // Silver: price is per troy oz in USD. Convert to INR then to per kg.
    const silverPricePerTroyOzUSD = metalsData.metals.silver.current;
    const silverPricePerTroyOzINR = silverPricePerTroyOzUSD * usdToInr;
    const silverPerGramINR = silverPricePerTroyOzINR / TROY_OZ_TO_GRAM;
    const silverPerKg = silverPerGramINR * 1000;         // 999 pure silver per kg
    const silver925PerKg = silverPerKg * 0.925;          // 925 sterling silver per kg

    // Platinum: price is per troy oz in USD. Convert to INR then to per gram.
    const platinumPricePerTroyOzUSD = metalsData.metals.platinum.current;
    const platinumPricePerTroyOzINR = platinumPricePerTroyOzUSD * usdToInr;
    const platinumPerGramINR = platinumPricePerTroyOzINR / TROY_OZ_TO_GRAM;

    // Palladium: price is per troy oz in USD. Convert to INR then to per gram.
    const palladiumPricePerTroyOzUSD = metalsData.metals.palladium.current;
    const palladiumPricePerTroyOzINR = palladiumPricePerTroyOzUSD * usdToInr;
    const palladiumPerGramINR = palladiumPricePerTroyOzINR / TROY_OZ_TO_GRAM;

    // Calculate with 18% GST
    const GST_RATE = 1.18;
    const gold24kWithGST = gold24k * GST_RATE;
    const silverPerKgWithGST = silverPerKg * GST_RATE;
    const silver925PerKgWithGST = silver925PerKg * GST_RATE;
    const platinumWithGST = platinumPerGramINR * GST_RATE;
    const palladiumWithGST = palladiumPerGramINR * GST_RATE;

    return {
      gold24k: gold24k?.toFixed(2),
      gold22k: gold22k?.toFixed(2),
      gold18k: gold18k?.toFixed(2),
      gold24kWithGST: gold24kWithGST?.toFixed(2),
      silverPerKg: silverPerKg?.toFixed(2),
      silver925PerKg: silver925PerKg?.toFixed(2),
      silverPerKgWithGST: silverPerKgWithGST?.toFixed(2),
      silver925PerKgWithGST: silver925PerKgWithGST?.toFixed(2),
      platinumPerGram: platinumPerGramINR?.toFixed(2),
      platinumWithGST: platinumWithGST?.toFixed(2),
      palladiumPerGram: palladiumPerGramINR?.toFixed(2),
      palladiumWithGST: palladiumWithGST?.toFixed(2),
      goldChange: 0, // Metals API doesn't provide change, so default to 0
      silverChange: 0,
      platinumChange: 0,
      palladiumChange: 0,
    };
  } catch (error) {
    // Fallback to Rajkot GoodReturns rates (March 26, 2026)
    console.warn("Failed to fetch live prices, using Rajkot fallback rates:", error);
    return {
      gold24k: "14694.00",
      gold22k: "13471.00",
      gold18k: "11021.00",
      gold24kWithGST: "17339.00",
      silverPerKg: "250000.00",
      silver925PerKg: "231250.00",
      silverPerKgWithGST: "295000.00",
      silver925PerKgWithGST: "272575.00",
      platinumPerGram: "3500.00",  // Approximate fallback
      platinumWithGST: "4130.00",
      palladiumPerGram: "2800.00",  // Approximate fallback
      palladiumWithGST: "3304.00",
      goldChange: 0.15,
      silverChange: 0.0,
      platinumChange: 0.0,
      palladiumChange: 0.0,
    };
  }
}
