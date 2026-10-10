/**
 * Devanagari Hindi Matra (मात्रा) & Chhand (छंद) Analyzer Engine
 * Accurate prosody evaluation based on Pingala Chhandas Shastra rules:
 * - Laghu (लघु) = 1 Matra (symbol: ।)
 * - Guru (गुरु) = 2 Matras (symbol: ऽ)
 */

export interface MatraCharacter {
  char: string;
  weight: 1 | 2 | 0; // 0 for halant / spaces / punctuations
  symbol: "।" | "ऽ" | "";
}

export interface LineMatraResult {
  text: string;
  totalMatras: number;
  breakdown: MatraCharacter[];
  detectedMeter?: string;
}

export const analyzeHindiMatras = (text: string): LineMatraResult[] => {
  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  return lines.map((line) => {
    const chars = Array.from(line);
    const breakdown: MatraCharacter[] = [];
    let total = 0;

    for (let i = 0; i < chars.length; i++) {
      const c = chars[i];
      const nextC = i + 1 < chars.length ? chars[i + 1] : "";
      const prevC = i - 1 >= 0 ? chars[i - 1] : "";

      // Space or punctuation
      if (/[\s,।॥!?-]/.test(c)) {
        continue;
      }

      // Halant (virama ्)
      if (c === "्") {
        // Halant itself doesn't have a matra, but it makes the previous consonant Guru (2) if it was Laghu
        if (breakdown.length > 0) {
          const prev = breakdown[breakdown.length - 1];
          if (prev.weight === 1) {
            total += 1;
            prev.weight = 2;
            prev.symbol = "ऽ";
          }
        }
        continue;
      }

      // Vowels & Matra symbols
      // Long vowels & symbols = Guru (2)
      if (/[आईऊएऐओऔाीूेैोौ]/.test(c)) {
        // If it's a matra sign attached to a previous consonant
        if (/[ाीूेैोौ]/.test(c) && breakdown.length > 0) {
          const prev = breakdown[breakdown.length - 1];
          if (prev.weight === 1) {
            prev.weight = 2;
            prev.symbol = "ऽ";
            total += 1; // was 1, now 2
          }
        } else {
          breakdown.push({ char: c, weight: 2, symbol: "ऽ" });
          total += 2;
        }
        continue;
      }

      // Anusvara (ं) or Visarga (ः) makes syllable Guru (2)
      if (/[ंः]/.test(c)) {
        if (breakdown.length > 0) {
          const prev = breakdown[breakdown.length - 1];
          if (prev.weight === 1) {
            prev.weight = 2;
            prev.symbol = "ऽ";
            total += 1;
          }
        }
        continue;
      }

      // Chandrabindu (ँ) does not increase weight
      if (c === "ँ") {
        continue;
      }

      // Short vowels = Laghu (1)
      if (/[अइउऋिुृ]/.test(c)) {
        if (/[िुृ]/.test(c) && breakdown.length > 0) {
          // already 1, nothing to add
        } else {
          breakdown.push({ char: c, weight: 1, symbol: "।" });
          total += 1;
        }
        continue;
      }

      // Normal consonant without matra = Laghu (1)
      if (/[\u0915-\u0939]/.test(c)) {
        // Check if next character is a halant
        if (nextC === "्") {
          // will be handled by halant or conjunct
          breakdown.push({ char: c, weight: 1, symbol: "।" });
          total += 1;
        } else {
          breakdown.push({ char: c, weight: 1, symbol: "।" });
          total += 1;
        }
        continue;
      }
    }

    // Meter identification
    let detectedMeter: string | undefined;
    if (total === 13) {
      detectedMeter = "दोहा / सोरठा प्रथम चरण (१३ मात्राएं)";
    } else if (total === 11) {
      detectedMeter = "दोहा / सोरठा द्वितीय चरण (११ मात्राएं)";
    } else if (total === 16) {
      detectedMeter = "चौपाई चरण (१६ मात्राएं)";
    } else if (total === 24) {
      detectedMeter = "रोला / दोहा अर्धाली (२४ मात्राएं = १३ + ११)";
    } else if (total >= 22 && total <= 26) {
      detectedMeter = "सवैया / कवित्त गति छंद";
    }

    return {
      text: line,
      totalMatras: total,
      breakdown,
      detectedMeter,
    };
  });
};
