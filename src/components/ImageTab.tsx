import React, { useState } from "react";
import { 
  Palette, 
  Sparkles, 
  Download, 
  Check, 
  RefreshCw,
  Stamp,
  Crop
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArtStyle, AspectRatioType, availableArtStyles } from "@/hooks/useImageGenerator";
import { toast } from "@/hooks/use-toast";

interface ImageTabProps {
  generatedImage: string;
  isGeneratingImage: boolean;
  generatedStory: string;
  selectedStyle: ArtStyle;
  aspectRatio: AspectRatioType;
  sealText: string;
  onStyleChange: (style: ArtStyle) => void;
  onAspectRatioChange: (ratio: AspectRatioType) => void;
  onSealTextChange: (text: string) => void;
  onGenerateImage: (text: string, style?: ArtStyle, title?: string, ratio?: AspectRatioType, seal?: string) => void;
  onDownloadImage: () => void;
}

export const ImageTab: React.FC<ImageTabProps> = ({
  generatedImage,
  isGeneratingImage,
  generatedStory,
  selectedStyle,
  aspectRatio,
  sealText,
  onStyleChange,
  onAspectRatioChange,
  onSealTextChange,
  onGenerateImage,
  onDownloadImage,
}) => {
  const [customTitle, setCustomTitle] = useState("");
  const [customText, setCustomText] = useState(generatedStory || "");

  React.useEffect(() => {
    if (generatedStory && !customText) {
      setCustomText(generatedStory);
    }
  }, [generatedStory, customText]);

  const handleGenerate = () => {
    const textToUse = customText || generatedStory;
    if (!textToUse.trim()) {
      toast({
        title: "पाठ आवश्यक है",
        description: "पोस्टर तैयार करने के लिए कृपया कविता या पंक्तियाँ लिखें।",
        variant: "destructive",
      });
      return;
    }
    onGenerateImage(textToUse, selectedStyle, customTitle, aspectRatio, sealText);
  };

  const aspectRatios: { id: AspectRatioType; label: string; desc: string }[] = [
    { id: "16:9", label: "१६:९ लैंडस्केप", desc: "कम्प्यूटर / वॉलपेपर" },
    { id: "1:1", label: "१:१ चौकोर", desc: "Instagram Post / DP" },
    { id: "9:16", label: "९:१६ वर्टिकल", desc: "Reels / WhatsApp Story" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Configuration Card */}
      <div className="apple-card p-6 md:p-8 relative overflow-hidden">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white font-hindi-display">
              यथार्थवादी कलात्मक चित्रशाला (Aesthetic Art Studio)
            </h3>
            <p className="text-xs text-neutral-500">
              Apple HIG प्रेरित सौंदर्य, पारंपरिक पाण्डुलिपि, और वास्तविक सुलेखन पोस्टर
            </p>
          </div>
        </div>

        {/* 1. Select Art Theme (5 Visual Cards) */}
        <div className="mb-6">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
            १. कलात्मक दृश्य शैली चुनें (Choose Visual Art Theme):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {availableArtStyles.map((style) => (
              <div
                key={style.id}
                onClick={() => onStyleChange(style.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-all text-left flex flex-col justify-between ${
                  selectedStyle === style.id
                    ? "border-orange-600 ring-2 ring-orange-500/20 bg-orange-50/30 dark:bg-orange-950/20 shadow-sm"
                    : "border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] hover:border-black/[0.15] dark:hover:border-white/[0.15]"
                }`}
              >
                <div>
                  <div className={`h-12 w-full rounded-lg bg-gradient-to-br ${style.previewGradient} mb-3 shadow-inner flex items-center justify-center`}>
                    {selectedStyle === style.id && (
                      <span className="w-6 h-6 rounded-full bg-white/90 text-orange-600 flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs text-neutral-900 dark:text-white font-hindi-display">
                    {style.hindiName}
                  </h4>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {style.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Aspect Ratio & Seal Settings Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2 flex items-center gap-1.5">
              <Crop className="w-3.5 h-3.5 text-orange-500" />
              २. पोस्टर आकार एवं अनुपात (Aspect Ratio):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {aspectRatios.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onAspectRatioChange(r.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    aspectRatio === r.id
                      ? "border-orange-600 bg-orange-500/10 text-orange-700 dark:text-orange-300 font-bold"
                      : "border-black/[0.06] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.03]"
                  }`}
                >
                  <span className="text-xs block">{r.label}</span>
                  <span className="text-[10px] text-neutral-400 block">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2 flex items-center gap-1.5">
              <Stamp className="w-3.5 h-3.5 text-rose-500" />
              ३. शाही लाल मुहर का नाम (Poet Seal / Takhallus):
            </label>
            <Input
              type="text"
              placeholder="उदा: साहित्य सृजन अथवा आपका उपनाम"
              value={sealText}
              onChange={(e) => onSealTextChange(e.target.value)}
              className="bg-white/60 dark:bg-black/20 border-black/[0.08] dark:border-white/[0.08] rounded-xl text-xs h-11"
            />
            <p className="text-[11px] text-neutral-400 mt-1">
              पोस्टर के निचले कोने में पारंपरिक लाल सिंदूरी मुहर पर अंकित होगा
            </p>
          </div>
        </div>

        {/* 3. Text Input & Title */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-1 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
              ४. पोस्टर शीर्षक (Optional Title):
            </label>
            <Input
              type="text"
              placeholder="जैसे: चांदनी रात की सोच"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="bg-white/60 dark:bg-black/20 border-black/[0.08] dark:border-white/[0.08] rounded-xl text-sm h-11"
            />
            <p className="text-[11px] text-neutral-400">
              रिक्त छोड़ने पर रचना से स्वतः शीर्षक चुना जाएगा
            </p>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
              ५. पोस्टर में प्रदर्शित होने वाली काव्य पंक्तियाँ:
            </label>
            <Textarea
              placeholder="काव्य पंक्तियाँ यहाँ डालें..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="min-h-[100px] bg-white/60 dark:bg-black/20 border-black/[0.08] dark:border-white/[0.08] rounded-xl text-sm leading-relaxed p-3"
            />
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGeneratingImage}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 hover:opacity-95 text-white font-medium text-base shadow-md transition-all gap-2"
        >
          {isGeneratingImage ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>कैनवास पोस्टर तैयार किया जा रहा है...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>यथार्थवादी पोस्टर जनरेट करें (Generate Aesthetic Artwork)</span>
            </>
          )}
        </Button>
      </div>

      {/* Generated Canvas Poster Showcase */}
      {generatedImage && (
        <div className="apple-card p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
                  ✦ Retina 2x रिज़ॉल्यूशन ({aspectRatio})
                </Badge>
                <span className="text-xs text-neutral-400">
                  शैली: {availableArtStyles.find((s) => s.id === selectedStyle)?.hindiName}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white font-hindi-display">
                कलात्मक सुलेखन पोस्टर
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={onDownloadImage}
                className="rounded-full text-xs gap-1.5 h-10 px-5 bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>डाउनलोड करें (PNG)</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleGenerate}
                disabled={isGeneratingImage}
                className="rounded-full text-xs gap-1.5 h-10"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>पुनः बनाएं</span>
              </Button>
            </div>
          </div>

          {/* High-res Image Preview */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-black/5 flex items-center justify-center p-2">
            <img
              src={generatedImage}
              alt="Generated Hindi Kavita Aesthetic Canvas Poster"
              className="w-full max-w-4xl h-auto rounded-xl shadow-lg object-contain mx-auto"
            />
          </div>

          <p className="text-center text-xs text-neutral-400 mt-4">
            ✦ यह पोस्टर Instagram Stories, WhatsApp Status और डिजिटल वॉलपेपर के लिए अनुकूलित है।
          </p>
        </div>
      )}
    </div>
  );
};