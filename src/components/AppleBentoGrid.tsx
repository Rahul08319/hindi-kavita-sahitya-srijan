import React, { useState } from "react";
import { getDynamicYearData, RituInfo } from "@/lib/dynamicYear";
import { getPoemOfTheDay, PoemEntry, poeticRasas, poeticMeters } from "@/data/sahityaData";
import { 
  Sparkles, 
  Calendar, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Compass, 
  Feather, 
  Layers, 
  ExternalLink,
  Flame,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface AppleBentoGridProps {
  onSelectPoemForArt: (text: string, title: string) => void;
  onNavigateToTab: (tab: string) => void;
}

export const AppleBentoGrid: React.FC<AppleBentoGridProps> = ({
  onSelectPoemForArt,
  onNavigateToTab,
}) => {
  const dynamicData = getDynamicYearData();
  const todayPoem: PoemEntry = getPoemOfTheDay(dynamicData.dayOfYear, dynamicData.currentYear);

  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopyPoem = () => {
    const textToCopy = `${todayPoem.title}\nरचयिता: ${todayPoem.poet} (${todayPoem.era})\n\n${todayPoem.lines.join("\n")}\n\nभावार्थ: ${todayPoem.bhavaarth}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast({
      title: "दैनिक काव्य रचना कॉपी हुई!",
      description: `"${todayPoem.title}" क्लिपबोर्ड में सुरक्षित है।`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePoemAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast({
        title: "ऑडियो अनुपलब्ध",
        description: "ब्राउज़र स्पीच सिंथेसिस का समर्थन नहीं करता।",
        variant: "destructive",
      });
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const recitationText = `${todayPoem.title}। रचयिता, ${todayPoem.poet}। ${todayPoem.lines.join("। ")}`;
    const utterance = new SpeechSynthesisUtterance(recitationText);
    utterance.lang = "hi-IN";
    utterance.rate = 0.88;

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang.startsWith("hi"));
    if (hindiVoice) utterance.voice = hindiVoice;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 px-1 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span>दैनिक साहित्य पंचांग • Apple Bento Grid</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white font-hindi-display">
            आज की अमर रचना एवं साहित्य संगम
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            प्रतिदिन सौर चक्र व तिथि के अनुसार स्वतः नवीनीकृत (Auto-Updated Every Day)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-300 bg-black/[0.03] dark:bg-white/[0.05] px-3.5 py-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-md">
          <Calendar className="w-3.5 h-3.5 text-orange-500" />
          <span>{dynamicData.formattedDayName}, {dynamicData.formattedHindiDate}</span>
          <span className="opacity-40">•</span>
          <span>वि.सं. {dynamicData.vikramSamvatDevanagari}</span>
        </div>
      </div>

      {/* Bento Grid 3-column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Bento Card 1: Today's Poem (Spans 7 cols on desktop) */}
        <div className="md:col-span-7 apple-card p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-orange-400/15 via-rose-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/30 font-medium">
                ✦ आज की अमर रचना (Poem of the Day)
              </Badge>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-neutral-600 dark:text-neutral-300">
                {todayPoem.era}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2 font-hindi-display">
              {todayPoem.title}
            </h3>
            <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-6 flex items-center gap-2">
              <span>रचयिता: {todayPoem.poet}</span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-500 dark:text-neutral-400 text-xs font-normal">विधा: {todayPoem.genre}</span>
            </p>

            {/* Verses Preview Box */}
            <div className="relative p-5 rounded-xl bg-orange-50/60 dark:bg-white/[0.03] border border-orange-200/50 dark:border-white/[0.06] mb-6">
              <div className="space-y-1.5 font-hindi-serif text-neutral-800 dark:text-neutral-200 text-base md:text-lg leading-relaxed">
                {todayPoem.lines.slice(0, 4).map((line, idx) => (
                  <p key={idx} className={line === "" ? "h-2" : ""}>
                    {line}
                  </p>
                ))}
              </div>
              {todayPoem.lines.length > 4 && (
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 font-medium">
                  ... (सम्पूर्ण रचना पुस्तकालय में उपलब्ध)
                </p>
              )}
            </div>

            {/* Meaning & Rasa */}
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 italic mb-6 leading-relaxed">
              <strong className="text-neutral-800 dark:text-neutral-100 not-italic">भावार्थ: </strong>
              {todayPoem.bhavaarth}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
            <Button
              size="sm"
              onClick={togglePoemAudio}
              variant={isPlayingAudio ? "default" : "outline"}
              className="gap-2 rounded-full text-xs font-medium"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white" />
                  <span>ऑडियो रोकें</span>
                  <span className="flex items-end gap-0.5 h-3 ml-1">
                    <span className="w-1 bg-white animate-wave-1 rounded-full" />
                    <span className="w-1 bg-white animate-wave-2 rounded-full" />
                    <span className="w-1 bg-white animate-wave-3 rounded-full" />
                  </span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-orange-600" />
                  <span>सस्वर पाठ सुनें</span>
                </>
              )}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyPoem}
              className="gap-1.5 rounded-full text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "कॉपी हो गया" : "काव्य कॉपी करें"}</span>
            </Button>

            <Button
              size="sm"
              onClick={() => onSelectPoemForArt(todayPoem.lines.join("\n"), todayPoem.title)}
              className="gap-1.5 rounded-full text-xs bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white ml-auto"
            >
              <Feather className="w-3.5 h-3.5" />
              <span>चित्रशाला में बनाएं</span>
            </Button>
          </div>
        </div>

        {/* Bento Column 2 (Spans 5 cols on desktop) */}
        <div className="md:col-span-5 grid grid-cols-1 gap-4">
          
          {/* Sub-Card A: Current Indian Season (ऋतु चक्र) */}
          <div className="apple-card p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-orange-500" />
                वर्तमान ऋतु चक्र (Seasonal Mood)
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
                {dynamicData.ritu.flowerSymbol}
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <h4 className="text-2xl font-bold text-neutral-900 dark:text-white font-hindi-display">
                  {dynamicData.ritu.hindiName}
                </h4>
                <span className="text-xs text-neutral-500 font-classic-latin">
                  ({dynamicData.ritu.englishSeason})
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                {dynamicData.ritu.description}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-xs flex items-center justify-between">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-semibold">काव्य रस व प्रेरणा</span>
                <span className="font-semibold text-orange-600 dark:text-orange-400 font-hindi-serif">
                  {dynamicData.ritu.poeticTheme}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigateToTab("generate")}
                className="h-8 text-xs text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30 gap-1 px-2.5"
              >
                <span>रचना रचें</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Sub-Card B: Quick Metrics & Meter Explorer */}
          <div className="apple-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-rose-500" />
                साहित्यिक रस व छंद दर्पण
              </span>
              <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                नवरस विधान
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              {poeticRasas.slice(0, 3).map((rasa, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] text-center"
                >
                  <span className="block text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    {rasa.name}
                  </span>
                  <span className="block text-[10px] text-neutral-500 mt-0.5 truncate">
                    {rasa.bhava}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-black/[0.05] dark:border-white/[0.06] text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>अमृत छंद: दोहा, चौपाई, रोला, सवैया</span>
              </span>
              <button
                onClick={() => onNavigateToTab("library")}
                className="text-orange-600 dark:text-orange-400 font-medium hover:underline flex items-center gap-1"
              >
                <span>लाइब्रेरी देखें</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
