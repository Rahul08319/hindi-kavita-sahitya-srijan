import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export type ArtStyle = "parchment" | "moonlight" | "misty_ink" | "blossom" | "obsidian_glass";
export type AspectRatioType = "16:9" | "1:1" | "9:16";

export interface ArtStyleOption {
  id: ArtStyle;
  name: string;
  hindiName: string;
  description: string;
  previewGradient: string;
}

export const availableArtStyles: ArtStyleOption[] = [
  {
    id: "parchment",
    name: "Royal Parchment",
    hindiName: "शाही स्वर्ण पाण्डुलिपि",
    description: "पुरातन भोजपत्र, स्वर्णिम किनारी और शाही मुहर",
    previewGradient: "from-amber-200 via-amber-100 to-amber-300",
  },
  {
    id: "moonlight",
    name: "Moonlit Twilight",
    hindiName: "चांदनी रात्रि व नीरवता",
    description: "गहरा नील गगन, पूर्ण चंद्र और चांदी जैसी शीतल किरणें",
    previewGradient: "from-indigo-950 via-slate-900 to-blue-950",
  },
  {
    id: "misty_ink",
    name: "Misty Ink Mountains",
    hindiName: "कुहासा और पर्वतीय वन",
    description: "पारंपरिक स्याही-धुलाई पर्वत, बांस के कुंज और उड़ते विहग",
    previewGradient: "from-zinc-800 via-stone-700 to-zinc-900",
  },
  {
    id: "blossom",
    name: "Spring Blossoms",
    hindiName: "वसंत और पलाश पुष्प",
    description: "सुनहरी प्रभात, खिलते पलाश के फूल और बिखरती पंखुड़ियां",
    previewGradient: "from-rose-400 via-amber-300 to-orange-400",
  },
  {
    id: "obsidian_glass",
    name: "Apple Obsidian Glass",
    hindiName: "ओलेड मिनिमलिस्ट ग्लास",
    description: "गहरा कृष्ण वर्ण, फ्रॉस्टेड रिम और परिष्कृत देवनागरी",
    previewGradient: "from-black via-zinc-900 to-neutral-950",
  },
];

export const useImageGenerator = () => {
  const [generatedImage, setGeneratedImage] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>("parchment");
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>("16:9");
  const [sealText, setSealText] = useState("साहित्य सृजन");

  const generateImage = async (
    generatedStory: string,
    forcedStyle?: ArtStyle,
    customTitle?: string,
    ratio?: AspectRatioType,
    customSeal?: string
  ) => {
    if (!generatedStory) {
      toast({
        title: "पहले कविता या कहानी चुनें",
        description: "कलात्मक पोस्टर बनाने के लिए पाठ आवश्यक है।",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingImage(true);
    const styleToUse = forcedStyle || selectedStyle;
    const ratioToUse = ratio || aspectRatio;
    const stampWord = customSeal || sealText || "साहित्य सृजन";

    // Realistic synthesis delay
    await new Promise((resolve) => setTimeout(resolve, 1400));

    try {
      const canvas = document.createElement("canvas");
      let width = 1200;
      let height = 800;

      if (ratioToUse === "1:1") {
        width = 1000;
        height = 1000;
      } else if (ratioToUse === "9:16") {
        width = 800;
        height = 1422;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas context is not available");
      }

      // Extract title and lines from text
      const cleanText = generatedStory.trim();
      const allLines = cleanText.split("\n").filter((l) => l.trim().length > 0);
      const title = customTitle || allLines[0]?.replace(/[#*]/g, "").slice(0, 45) || "हिंदी साहित्य सृजन";

      // Select lyrical lines
      const maxLines = ratioToUse === "9:16" ? 9 : 6;
      const lyricalLines = allLines
        .slice(1)
        .filter((l) => !l.startsWith("विधा:") && !l.startsWith("भावार्थ:") && l.length > 3)
        .slice(0, maxLines);

      if (lyricalLines.length === 0) {
        lyricalLines.push(cleanText.slice(0, 160));
      }

      // ==========================================
      // 1. RENDER BACKGROUND BY ART STYLE
      // ==========================================
      if (styleToUse === "parchment") {
        // Royal Parchment / Bhojpatra texture
        const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, Math.max(width, height) / 1.5);
        bgGrad.addColorStop(0, "#fcf6e8");
        bgGrad.addColorStop(0.5, "#f5e8cf");
        bgGrad.addColorStop(0.85, "#ebd5b0");
        bgGrad.addColorStop(1, "#dfc294");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Subtle parchment fiber specks
        for (let i = 0; i < 450; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const length = 2 + Math.random() * 5;
          ctx.strokeStyle = `rgba(180, 140, 90, ${0.05 + Math.random() * 0.08})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + length, y + (Math.random() - 0.5) * 3);
          ctx.stroke();
        }

        // Gold Filigree Ornate Outer & Inner Borders
        ctx.strokeStyle = "rgba(180, 130, 60, 0.75)";
        ctx.lineWidth = 6;
        ctx.strokeRect(36, 36, width - 72, height - 72);

        ctx.strokeStyle = "rgba(195, 145, 75, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(48, 48, width - 96, height - 96);
      } else if (styleToUse === "moonlight") {
        // Deep Indigo Moonlit Twilight
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, "#080c1a");
        bgGrad.addColorStop(0.5, "#0f172a");
        bgGrad.addColorStop(0.8, "#172554");
        bgGrad.addColorStop(1, "#030712");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Stars
        for (let i = 0; i < 110; i++) {
          const sx = Math.random() * width;
          const sy = Math.random() * (height * 0.6);
          const radius = Math.random() * 1.5;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.7})`;
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Moon
        const moonX = width - 180;
        const moonY = 160;
        const moonGlow = ctx.createRadialGradient(moonX, moonY, 10, moonX, moonY, 140);
        moonGlow.addColorStop(0, "rgba(254, 240, 138, 0.4)");
        moonGlow.addColorStop(0.4, "rgba(254, 240, 138, 0.15)");
        moonGlow.addColorStop(1, "rgba(254, 240, 138, 0)");
        ctx.fillStyle = moonGlow;
        ctx.beginPath();
        ctx.arc(moonX, moonY, 140, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#fef9c3";
        ctx.beginPath();
        ctx.arc(moonX, moonY, 52, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 2;
        ctx.strokeRect(36, 36, width - 72, height - 72);
      } else if (styleToUse === "misty_ink") {
        // Misty Ink Mountains
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, "#ececec");
        bgGrad.addColorStop(0.4, "#dfdfdf");
        bgGrad.addColorStop(0.8, "#c8c8c8");
        bgGrad.addColorStop(1, "#b0b0b0");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Mountain silhouettes
        ctx.fillStyle = "rgba(80, 80, 80, 0.25)";
        ctx.beginPath();
        ctx.moveTo(0, height * 0.65);
        ctx.quadraticCurveTo(width * 0.25, height * 0.45, width * 0.5, height * 0.6);
        ctx.quadraticCurveTo(width * 0.75, height * 0.4, width, height * 0.58);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fill();

        ctx.strokeStyle = "rgba(40, 40, 40, 0.5)";
        ctx.lineWidth = 3;
        ctx.strokeRect(36, 36, width - 72, height - 72);
      } else if (styleToUse === "blossom") {
        // Spring Sunset & Blossom
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, "#fff1f2");
        bgGrad.addColorStop(0.35, "#fed7aa");
        bgGrad.addColorStop(0.7, "#fbcfe8");
        bgGrad.addColorStop(1, "#f43f5e");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        for (let p = 0; p < 40; p++) {
          const px = Math.random() * width;
          const py = Math.random() * height;
          const rot = Math.random() * Math.PI;
          ctx.fillStyle = `rgba(244, 63, 94, ${0.25 + Math.random() * 0.45})`;
          ctx.beginPath();
          ctx.ellipse(px, py, 14, 7, rot, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.strokeStyle = "rgba(225, 29, 72, 0.4)";
        ctx.lineWidth = 3;
        ctx.strokeRect(36, 36, width - 72, height - 72);
      } else {
        // Apple Obsidian Glass
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, "#000000");
        bgGrad.addColorStop(0.5, "#09090b");
        bgGrad.addColorStop(1, "#18181b");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
        ctx.roundRect(70, 70, width - 140, height - 140, 24);
        ctx.fill();

        ctx.strokeStyle = "rgba(234, 88, 12, 0.5)";
        ctx.lineWidth = 2;
        ctx.strokeRect(36, 36, width - 72, height - 72);
      }

      // ==========================================
      // 2. CENTRAL TYPOGRAPHY & VERSES
      // ==========================================
      const isDarkTheme = styleToUse === "moonlight" || styleToUse === "obsidian_glass";
      const textColor = isDarkTheme ? "#f8fafc" : "#27272a";
      const accentColor = isDarkTheme ? "#fb923c" : "#c2410c";
      const secondaryTextColor = isDarkTheme ? "rgba(248, 250, 252, 0.75)" : "rgba(63, 63, 70, 0.85)";

      // Top Motif
      ctx.textAlign = "center";
      ctx.fillStyle = accentColor;
      ctx.font = "bold 18px -apple-system, system-ui, sans-serif";
      ctx.fillText("✦  हिंदी कविता साहित्य सृजन पीठ  ✦", width / 2, 110);

      // Title
      ctx.fillStyle = textColor;
      ctx.font = "bold 40px 'Rozha One', 'Tiro Devanagari Hindi', serif";
      ctx.fillText(title, width / 2, 185);

      // Divider
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 160, 220);
      ctx.lineTo(width / 2 - 20, 220);
      ctx.moveTo(width / 2 + 20, 220);
      ctx.lineTo(width / 2 + 160, 220);
      ctx.stroke();

      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(width / 2, 220, 4, 0, Math.PI * 2);
      ctx.fill();

      // Verses
      ctx.fillStyle = secondaryTextColor;
      ctx.font = "500 28px 'Tiro Devanagari Hindi', 'Noto Serif Devanagari', serif";
      const startY = ratioToUse === "9:16" ? 360 : 310;
      const lineHeight = ratioToUse === "9:16" ? 64 : 52;

      lyricalLines.forEach((line, idx) => {
        ctx.fillText(line, width / 2, startY + idx * lineHeight);
      });

      // ==========================================
      // 3. ROYAL SEAL STAMP (मुद्रा)
      // ==========================================
      const sealX = width - 130;
      const sealY = height - 120;
      ctx.save();
      ctx.translate(sealX, sealY);
      ctx.rotate(-0.06);

      ctx.strokeStyle = "#dc2626";
      ctx.lineWidth = 3;
      ctx.strokeRect(-38, -38, 76, 76);

      ctx.fillStyle = "rgba(220, 38, 38, 0.12)";
      ctx.fillRect(-36, -36, 72, 72);

      ctx.fillStyle = "#dc2626";
      ctx.font = "bold 14px 'Tiro Devanagari Hindi', serif";
      ctx.textAlign = "center";
      const stampWords = stampWord.split(" ");
      if (stampWords.length >= 2) {
        ctx.fillText(stampWords[0], 0, -8);
        ctx.fillText(stampWords.slice(1).join(" "), 0, 14);
      } else {
        ctx.fillText(stampWord, 0, 0);
        ctx.fillText("मुद्रा", 0, 18);
      }
      ctx.restore();

      // Footer
      ctx.textAlign = "center";
      ctx.fillStyle = isDarkTheme ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.45)";
      ctx.font = "14px -apple-system, system-ui, sans-serif";
      const year = new Date().getFullYear();
      ctx.fillText(`© ${year} Hindi Kavita Sahitya Srijan • Apple Collection`, width / 2, height - 55);

      const imageUrl = canvas.toDataURL("image/png", 1.0);
      setGeneratedImage(imageUrl);

      toast({
        title: "कलात्मक पोस्टर सृजित हुआ!",
        description: `शैली: ${availableArtStyles.find((s) => s.id === styleToUse)?.hindiName} • अनुपात: ${ratioToUse}`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "चित्र सृजन में त्रुटि",
        description: "कृपया पुनः प्रयास करें।",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const a = document.createElement("a");
    a.href = generatedImage;
    a.download = `hindi-kavita-sahitya-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
      title: "पोस्टर डाउनलोड संपन्न!",
      description: "उच्च-रिज़ॉल्यूशन PNG चित्र आपकी गैलरी में सुरक्षित हुआ।",
    });
  };

  return {
    generatedImage,
    isGeneratingImage,
    selectedStyle,
    aspectRatio,
    sealText,
    setSealText,
    setAspectRatio,
    setSelectedStyle,
    generateImage,
    downloadImage,
  };
};