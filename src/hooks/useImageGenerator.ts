import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export type ArtStyle = "parchment" | "moonlight" | "misty_ink" | "blossom" | "obsidian_glass";

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

  const generateImage = async (
    generatedStory: string,
    forcedStyle?: ArtStyle,
    customTitle?: string
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

    // Realistic synthesis delay
    await new Promise((resolve) => setTimeout(resolve, 1800));

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 800;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas context is not available");
      }

      // Extract title and lines from text
      const cleanText = generatedStory.trim();
      const allLines = cleanText.split("\n").filter((l) => l.trim().length > 0);
      const title = customTitle || allLines[0]?.replace(/[#*]/g, "").slice(0, 45) || "हिंदी साहित्य सृजन";

      // Select 4-6 most lyrical lines for the visual card
      const lyricalLines = allLines
        .slice(1)
        .filter((l) => !l.startsWith("विधा:") && !l.startsWith("भावार्थ:") && l.length > 3)
        .slice(0, 6);

      if (lyricalLines.length === 0) {
        lyricalLines.push(cleanText.slice(0, 160));
      }

      // ==========================================
      // 1. RENDER BACKGROUND BY ART STYLE
      // ==========================================
      if (styleToUse === "parchment") {
        // Royal Parchment / Bhojpatra texture
        const bgGrad = ctx.createRadialGradient(600, 400, 100, 600, 400, 700);
        bgGrad.addColorStop(0, "#fcf6e8");
        bgGrad.addColorStop(0.5, "#f5e8cf");
        bgGrad.addColorStop(0.85, "#ebd5b0");
        bgGrad.addColorStop(1, "#dfc294");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1200, 800);

        // Subtle parchment fiber specks
        for (let i = 0; i < 400; i++) {
          const x = Math.random() * 1200;
          const y = Math.random() * 800;
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
        ctx.strokeRect(36, 36, 1128, 728);

        ctx.strokeStyle = "rgba(195, 145, 75, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(48, 48, 1104, 704);

        // Corner Ornamental Brackets
        const corners = [
          [36, 36],
          [1164, 36],
          [36, 764],
          [1164, 764],
        ];
        corners.forEach(([cx, cy]) => {
          ctx.fillStyle = "#b4823c";
          ctx.beginPath();
          ctx.arc(cx, cy, 8, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (styleToUse === "moonlight") {
        // Deep Indigo Moonlit Twilight
        const bgGrad = ctx.createLinearGradient(0, 0, 0, 800);
        bgGrad.addColorStop(0, "#080c1a");
        bgGrad.addColorStop(0.5, "#0f172a");
        bgGrad.addColorStop(0.8, "#172554");
        bgGrad.addColorStop(1, "#030712");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1200, 800);

        // Distant Stars
        for (let i = 0; i < 90; i++) {
          const sx = Math.random() * 1200;
          const sy = Math.random() * 500;
          const radius = Math.random() * 1.5;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.7})`;
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Radiant Full Moon with Glow
        const moonX = 980;
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

        // Misty Mountains Silhouette
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.beginPath();
        ctx.moveTo(0, 680);
        ctx.lineTo(240, 560);
        ctx.lineTo(520, 620);
        ctx.lineTo(820, 520);
        ctx.lineTo(1200, 640);
        ctx.lineTo(1200, 800);
        ctx.lineTo(0, 800);
        ctx.closePath();
        ctx.fill();

        // Moonlit Water Reflection
        const waterGrad = ctx.createLinearGradient(0, 680, 0, 800);
        waterGrad.addColorStop(0, "rgba(30, 58, 138, 0.4)");
        waterGrad.addColorStop(1, "rgba(10, 15, 30, 0.9)");
        ctx.fillStyle = waterGrad;
        ctx.fillRect(0, 680, 1200, 120);

        // Apple Glass Silver Border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 40, 1120, 720);
      } else if (styleToUse === "misty_ink") {
        // Misty Ink Wash / Sumi-e Mountains
        const bgGrad = ctx.createLinearGradient(0, 0, 0, 800);
        bgGrad.addColorStop(0, "#ececec");
        bgGrad.addColorStop(0.4, "#dfdfdf");
        bgGrad.addColorStop(0.8, "#c8c8c8");
        bgGrad.addColorStop(1, "#b0b0b0");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1200, 800);

        // Distant soft ink mountains
        ctx.fillStyle = "rgba(80, 80, 80, 0.25)";
        ctx.beginPath();
        ctx.moveTo(0, 500);
        ctx.quadraticCurveTo(300, 320, 600, 480);
        ctx.quadraticCurveTo(900, 300, 1200, 460);
        ctx.lineTo(1200, 800);
        ctx.lineTo(0, 800);
        ctx.fill();

        // Fore mountain
        ctx.fillStyle = "rgba(40, 40, 40, 0.45)";
        ctx.beginPath();
        ctx.moveTo(0, 620);
        ctx.quadraticCurveTo(400, 460, 800, 600);
        ctx.lineTo(1200, 540);
        ctx.lineTo(1200, 800);
        ctx.lineTo(0, 800);
        ctx.fill();

        // Delicate bamboo stalks on right side
        for (let b = 0; b < 6; b++) {
          const bx = 1040 + b * 24;
          const bh = 420 + Math.random() * 80;
          ctx.fillStyle = "rgba(35, 35, 35, 0.75)";
          ctx.fillRect(bx, 800 - bh, 5, bh);

          // Bamboo leaf pairs
          for (let leaf = 0; leaf < 7; leaf++) {
            const ly = 800 - bh + leaf * 55;
            ctx.beginPath();
            ctx.ellipse(bx - 12, ly, 16, 4, -0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(bx + 16, ly + 8, 18, 4, 0.35, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.strokeStyle = "rgba(40, 40, 40, 0.5)";
        ctx.lineWidth = 3;
        ctx.strokeRect(36, 36, 1128, 728);
      } else if (styleToUse === "blossom") {
        // Spring Sunset & Blossom
        const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
        bgGrad.addColorStop(0, "#fff1f2");
        bgGrad.addColorStop(0.35, "#fed7aa");
        bgGrad.addColorStop(0.7, "#fbcfe8");
        bgGrad.addColorStop(1, "#f43f5e");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1200, 800);

        // Floating flower petals
        for (let p = 0; p < 35; p++) {
          const px = Math.random() * 1200;
          const py = Math.random() * 800;
          const rot = Math.random() * Math.PI;
          ctx.fillStyle = `rgba(244, 63, 94, ${0.25 + Math.random() * 0.45})`;
          ctx.beginPath();
          ctx.ellipse(px, py, 14, 7, rot, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.strokeStyle = "rgba(225, 29, 72, 0.4)";
        ctx.lineWidth = 3;
        ctx.strokeRect(40, 40, 1120, 720);
      } else {
        // Apple Obsidian Glass (Dark High-End Minimalist)
        const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
        bgGrad.addColorStop(0, "#000000");
        bgGrad.addColorStop(0.5, "#09090b");
        bgGrad.addColorStop(1, "#18181b");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1200, 800);

        // Center Frosted Plate
        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
        ctx.roundRect(80, 80, 1040, 640, 24);
        ctx.fill();

        // Apple Specular Rim Highlight
        ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.strokeStyle = "rgba(234, 88, 12, 0.5)";
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 40, 1120, 720);
      }

      // ==========================================
      // 2. CENTRAL TYPOGRAPHY & VERSES
      // ==========================================
      const isDarkTheme = styleToUse === "moonlight" || styleToUse === "obsidian_glass";
      const textColor = isDarkTheme ? "#f8fafc" : "#27272a";
      const accentColor = isDarkTheme ? "#fb923c" : "#c2410c";
      const secondaryTextColor = isDarkTheme ? "rgba(248, 250, 252, 0.75)" : "rgba(63, 63, 70, 0.85)";

      // Top Decorative Motif / Header
      ctx.textAlign = "center";
      ctx.fillStyle = accentColor;
      ctx.font = "bold 20px -apple-system, system-ui, sans-serif";
      ctx.fillText("✦  हिंदी कविता साहित्य सृजन पीठ  ✦", 600, 120);

      // Title
      ctx.fillStyle = textColor;
      ctx.font = "bold 42px 'Rozha One', 'Tiro Devanagari Hindi', serif";
      ctx.fillText(title, 600, 195);

      // Divider Line with diamond
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(420, 230);
      ctx.lineTo(580, 230);
      ctx.moveTo(620, 230);
      ctx.lineTo(780, 230);
      ctx.stroke();

      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(600, 230, 4, 0, Math.PI * 2);
      ctx.fill();

      // Poem Lines
      ctx.fillStyle = secondaryTextColor;
      ctx.font = "500 28px 'Tiro Devanagari Hindi', 'Noto Serif Devanagari', serif";

      const startY = 320;
      const lineHeight = 52;
      lyricalLines.forEach((line, idx) => {
        ctx.fillText(line, 600, startY + idx * lineHeight);
      });

      // ==========================================
      // 3. TRADITIONAL RED ROYAL SEAL STAMP (मुद्रा)
      // ==========================================
      const sealX = 1040;
      const sealY = 670;
      ctx.save();
      ctx.translate(sealX, sealY);
      ctx.rotate(-0.06); // organic angle

      ctx.strokeStyle = "#dc2626";
      ctx.lineWidth = 3;
      ctx.strokeRect(-40, -40, 80, 80);

      ctx.fillStyle = "rgba(220, 38, 38, 0.12)";
      ctx.fillRect(-38, -38, 76, 76);

      ctx.fillStyle = "#dc2626";
      ctx.font = "bold 15px 'Tiro Devanagari Hindi', serif";
      ctx.textAlign = "center";
      ctx.fillText("साहित्य", 0, -12);
      ctx.fillText("सृजन", 0, 10);
      ctx.fillText("मुद्रा", 0, 28);
      ctx.restore();

      // Footer branding
      ctx.textAlign = "center";
      ctx.fillStyle = isDarkTheme ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.45)";
      ctx.font = "14px -apple-system, system-ui, sans-serif";
      const year = new Date().getFullYear();
      ctx.fillText(`© ${year} Hindi Kavita Sahitya Srijan • Apple Design Collection`, 600, 735);

      const imageUrl = canvas.toDataURL("image/png", 1.0);
      setGeneratedImage(imageUrl);

      toast({
        title: "कलात्मक पोस्टर सृजित हुआ!",
        description: `शैली: ${availableArtStyles.find((s) => s.id === styleToUse)?.hindiName}`,
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
    setSelectedStyle,
    generateImage,
    downloadImage,
  };
};