export async function getGoldSilverPrices() {
  const goldApiKey = process.env.NEXT_PUBLIC_GOLD_API_KEY;
  const TROY_OZ_TO_GRAM = 31.1035;
  const GST_RATE = 1.18;

  try {
    if (goldApiKey) {
      // GoldAPI path (requires NEXT_PUBLIC_GOLD_API_KEY)
      const headers = { "x-access-token": goldApiKey };
      const [goldRes, silverRes, platinumRes, palladiumRes] = await Promise.all([
        fetch("https://api.goldapi.io/api/XAU/INR", { headers, next: { revalidate: 300 } }),
        fetch("https://api.goldapi.io/api/XAG/INR", { headers, next: { revalidate: 300 } }),
        fetch("https://api.goldapi.io/api/XPT/INR", { headers, next: { revalidate: 300 } }),
        fetch("https://api.goldapi.io/api/XPD/INR", { headers, next: { revalidate: 300 } }),
      ]);

      if (!goldRes.ok || !silverRes.ok || !platinumRes.ok || !palladiumRes.ok) {
        throw new Error("GoldAPI request failed");
      }

      const [goldData, silverData, platinumData, palladiumData] = await Promise.all([
        goldRes.json(),
        silverRes.json(),
        platinumRes.json(),
        palladiumRes.json(),
      ]);

      const gold24k = goldData.price_gram_24k;
      const gold22k = goldData.price_gram_22k;
      const gold18k = goldData.price_gram_18k;

      const silverPerGramINR = silverData.price / TROY_OZ_TO_GRAM;
      const silverPerKg = silverPerGramINR * 1000;
      const silver925PerKg = silverPerKg * 0.925;

      const platinumPerGramINR = platinumData.price / TROY_OZ_TO_GRAM;
      const palladiumPerGramINR = palladiumData.price / TROY_OZ_TO_GRAM;

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
        goldChange: goldData.chp ?? 0,
        silverChange: silverData.chp ?? 0,
        platinumChange: platinumData.chp ?? 0,
        palladiumChange: palladiumData.chp ?? 0,
      };
    }

    // Fallback path: free metals.live + exchange rate conversion
    const metalsRes = await fetch("https://api.metals.live/v1/spot/metals?metals=gold,silver,platinum,palladium", {
      next: { revalidate: 300 },
    });
    const exchangeRes = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });

    if (!metalsRes.ok || !exchangeRes.ok) {
      throw new Error("API request failed");
    }

    const metalsData = await metalsRes.json();
    const exchangeData = await exchangeRes.json();
    const usdToInr = exchangeData.rates.INR;

    const goldPricePerTroyOzUSD = metalsData.metals.gold.current;
    const goldPricePerTroyOzINR = goldPricePerTroyOzUSD * usdToInr;
    const goldPerGramINR = goldPricePerTroyOzINR / TROY_OZ_TO_GRAM;

    const gold24k = goldPerGramINR;
    const gold22k = goldPerGramINR * 0.9167;
    const gold18k = goldPerGramINR * 0.75;

    const silverPricePerTroyOzUSD = metalsData.metals.silver.current;
    const silverPricePerTroyOzINR = silverPricePerTroyOzUSD * usdToInr;
    const silverPerGramINR = silverPricePerTroyOzINR / TROY_OZ_TO_GRAM;
    const silverPerKg = silverPerGramINR * 1000;
    const silver925PerKg = silverPerKg * 0.925;

    const platinumPricePerTroyOzUSD = metalsData.metals.platinum.current;
    const platinumPricePerTroyOzINR = platinumPricePerTroyOzUSD * usdToInr;
    const platinumPerGramINR = platinumPricePerTroyOzINR / TROY_OZ_TO_GRAM;

    const palladiumPricePerTroyOzUSD = metalsData.metals.palladium.current;
    const palladiumPricePerTroyOzINR = palladiumPricePerTroyOzUSD * usdToInr;
    const palladiumPerGramINR = palladiumPricePerTroyOzINR / TROY_OZ_TO_GRAM;

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
      goldChange: 0,
      silverChange: 0,
      platinumChange: 0,
      palladiumChange: 0,
    };
  } catch (error) {
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
      platinumPerGram: "3500.00",
      platinumWithGST: "4130.00",
      palladiumPerGram: "2800.00",
      palladiumWithGST: "3304.00",
      goldChange: 0.15,
      silverChange: 0.0,
      platinumChange: 0.0,
      palladiumChange: 0.0,
    };
  }
}
