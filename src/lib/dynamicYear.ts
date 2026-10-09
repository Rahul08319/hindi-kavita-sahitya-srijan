/**
 * Dynamic Calendar and Seasonal Automation Engine
 * Automatically computes Gregorian year, Vikram Samvat, Indian Ritu (Season),
 * and Day-of-Year hash to ensure perpetual auto-updates across 2026, 2027, and beyond!
 */

export interface RituInfo {
  name: string;
  hindiName: string;
  englishSeason: string;
  description: string;
  poeticTheme: string;
  flowerSymbol: string;
  colorGradient: string;
}

export const getDynamicYearData = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const vikramSamvat = currentYear + 57; // Vedic Vikram Samvat
  const month = now.getMonth(); // 0-indexed (0 = Jan, 11 = Dec)
  const date = now.getDate();

  // Day of the year calculation (1 - 366)
  const startOfYear = new Date(currentYear, 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Six Indian Ritus (Seasons) based on solar calendar months
  let ritu: RituInfo;
  if (month === 2 || month === 3) {
    // March - April
    ritu = {
      name: "Vasanta",
      hindiName: "वसंत ऋतु",
      englishSeason: "Spring",
      description: "प्रकृति का नवयौवन, पलाश और अमलतास के फूल, कोयल की कूक",
      poeticTheme: "शृंगार, प्रेम और नव-सृजन",
      flowerSymbol: "🌸 पलाश एवं महुवा",
      colorGradient: "from-amber-500 to-rose-500",
    };
  } else if (month === 4 || month === 5) {
    // May - June
    ritu = {
      name: "Grishma",
      hindiName: "ग्रीष्म ऋतु",
      englishSeason: "Summer",
      description: "तपती दोपहर, मरुस्थल की तपस्या और जल की तृष्णा",
      poeticTheme: "तप, संयम और वैराग्य",
      flowerSymbol: "☀️ गुलमोहर",
      colorGradient: "from-orange-600 to-amber-500",
    };
  } else if (month === 6 || month === 7) {
    // July - August
    ritu = {
      name: "Varsha",
      hindiName: "वर्षा ऋतु",
      englishSeason: "Monsoon",
      description: "घने श्याम मेघ, रिमझिम फुहारें, सोंधी मिट्टी की सुगंध",
      poeticTheme: "विरह, मिलन और प्रकृति-संगीत",
      flowerSymbol: "🌧️ कदम्ब एवं जूही",
      colorGradient: "from-cyan-600 to-blue-700",
    };
  } else if (month === 8 || month === 9) {
    // September - October
    ritu = {
      name: "Sharad",
      hindiName: "शरद ऋतु",
      englishSeason: "Autumn",
      description: "निर्मल आकाश, शीतल पूर्णिमा का चंद्रमा, बहती शांत नदियां",
      poeticTheme: "शांति, सौम्यता और आध्यात्मिक उजास",
      flowerSymbol: "🪷 श्वेत कमल एवं हरसिंगार",
      colorGradient: "from-blue-500 to-indigo-600",
    };
  } else if (month === 10 || month === 11) {
    // November - December
    ritu = {
      name: "Hemanta",
      hindiName: "हेमंत ऋतु",
      englishSeason: "Pre-Winter",
      description: "गुलाबी ठंड, ओस से भीगे तृण, पकी हुई सुनहरी फसलें",
      poeticTheme: "सद्भाव, गृह-सुख और चिंतन",
      flowerSymbol: "🌾 सुनहरी बालियां",
      colorGradient: "from-purple-600 to-pink-600",
    };
  } else {
    // January - February
    ritu = {
      name: "Shishira",
      hindiName: "शिशिर ऋतु",
      englishSeason: "Winter",
      description: "सर्द हवाएं, घने कोहरे की चादर और अलाव की गर्माहट",
      poeticTheme: "अंतर्मुखी ध्यान और आत्म-साक्षात्कार",
      flowerSymbol: "❄️ कुंद और सरसों",
      colorGradient: "from-slate-600 to-zinc-700",
    };
  }

  // Hindi Numerals converter
  const toDevanagariNumerals = (num: number): string => {
    const devanagariDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return num
      .toString()
      .split("")
      .map((d) => (d >= "0" && d <= "9" ? devanagariDigits[parseInt(d, 10)] : d))
      .join("");
  };

  const hindiMonths = [
    "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
    "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
  ];

  const hindiDayNames = [
    "रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"
  ];

  const formattedHindiDate = `${toDevanagariNumerals(date)} ${hindiMonths[month]} ${toDevanagariNumerals(currentYear)}`;
  const formattedDayName = hindiDayNames[now.getDay()];

  return {
    currentYear,
    vikramSamvat,
    currentYearDevanagari: toDevanagariNumerals(currentYear),
    vikramSamvatDevanagari: toDevanagariNumerals(vikramSamvat),
    dayOfYear,
    ritu,
    formattedHindiDate,
    formattedDayName,
    isoDate: now.toISOString().slice(0, 10),
  };
};
