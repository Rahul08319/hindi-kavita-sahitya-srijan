import React, { useState } from "react";
import { 
  Compass, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  BookOpen, 
  Check, 
  RotateCcw,
  Zap
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { analyzeHindiMatras, LineMatraResult } from "@/lib/matraCounter";

export const ChhandLabTab: React.FC = () => {
  const sampleVerses = [
    {
      title: "संत कबीर का दोहा (१३-११ मात्राएं)",
      lines: "बड़ा हुआ तो क्या हुआ, जैसे पेड़ खजूर।\nपंथी को छाया नहीं, फल लागे अति दूर॥",
    },
    {
      title: "तुलसीदास जी की चौपाई (१६ मात्राएं)",
      lines: "मंगल भवन अमंगल हारी।\nद्रवहु सुदसरथ अजिर बिहारी॥",
    },
    {
      title: "वीर रस कविता चरण (२४ मात्राएं)",
      lines: "वर्षों तक वन में घूम घूम, बाधा विघ्नों को चूम चूम।\nसह धूप घाम पानी पत्थर, पांडव आये कुछ और निखर॥",
    },
  ];

  const [inputText, setInputText] = useState(sampleVerses[0].lines);
  const [results, setResults] = useState<LineMatraResult[]>(analyzeHindiMatras(sampleVerses[0].lines));

  const handleTextChange = (text: string) => {
    setInputText(text);
    setResults(analyzeHindiMatras(text));
  };

  const handleSelectSample = (sample: { title: string; lines: string }) => {
    setInputText(sample.lines);
    setResults(analyzeHindiMatras(sample.lines));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header & Input Box */}
      <div className="apple-card p-6 md:p-8 relative overflow-hidden">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white font-hindi-display">
              छंद एवं मात्रा गणना प्रयोगशाला (Prosody & Meter Lab)
            </h3>
            <p className="text-xs text-neutral-500">
              पिंगल छंद शास्त्र के अनुसार वास्तविक समय में लघु (।) एवं गुरु (ऽ) मात्राओं की वैज्ञानिक गणना
            </p>
          </div>
        </div>

        {/* Preset Sample Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" />
            उदाहरण छंद:
          </span>
          {sampleVerses.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(sample)}
              className="text-xs px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 text-neutral-600 dark:text-neutral-300 border border-black/[0.06] dark:border-white/[0.08] transition-all"
            >
              {sample.title}
            </button>
          ))}
        </div>

        {/* Text Area Input */}
        <div className="space-y-2 mb-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
            अपनी काव्य पंक्तियाँ यहाँ लिखें या पेस्ट करें:
          </label>
          <Textarea
            value={inputText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="काव्य पंक्तियाँ यहाँ लिखें (उदा. बड़ा हुआ तो क्या हुआ, जैसे पेड़ खजूर...)"
            className="min-h-[110px] bg-white/60 dark:bg-black/20 border-black/[0.08] dark:border-white/[0.08] rounded-xl text-base p-4 leading-relaxed font-hindi-serif"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>{results.length} पंक्तियाँ विश्लेषित</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleTextChange("")}
            className="h-7 text-xs text-neutral-500 hover:text-rose-500 gap-1 px-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>साफ़ करें</span>
          </Button>
        </div>
      </div>

      {/* 2. Visual Metric Breakdown Card */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-1">
          पंक्तिवार मात्रा एवं छंद विश्लेषण (Line-by-Line Breakdown)
        </h4>

        {results.map((lineResult, idx) => (
          <div
            key={idx}
            className="apple-card p-5 md:p-6 space-y-4 hover:border-orange-500/30 transition-all"
          >
            {/* Line Title & Meter Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-hindi-serif text-base md:text-lg font-bold text-neutral-900 dark:text-white">
                  {lineResult.text}
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                {lineResult.detectedMeter && (
                  <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
                    {lineResult.detectedMeter}
                  </Badge>
                )}
                <Badge className="bg-orange-600 text-white text-xs font-bold px-2.5">
                  कुल: {lineResult.totalMatras} मात्राएं
                </Badge>
              </div>
            </div>

            {/* Character Breakdown Visualizer */}
            <div>
              <span className="text-[11px] text-neutral-400 block mb-2 font-medium">
                अक्षरवार मात्रा सूचकांक (। = लघु १ | ऽ = गुरु २):
              </span>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                {lineResult.breakdown.map((item, cIdx) => (
                  <div
                    key={cIdx}
                    className={`flex flex-col items-center justify-center min-w-[32px] px-2 py-1 rounded-lg border text-center transition-all ${
                      item.weight === 2
                        ? "bg-orange-500/10 border-orange-500/30 text-orange-700 dark:text-orange-300"
                        : "bg-black/[0.03] dark:bg-white/[0.04] border-black/[0.06] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-200"
                    }`}
                  >
                    <span className="text-xs font-hindi-serif font-semibold">
                      {item.char}
                    </span>
                    <span className="text-[10px] font-mono font-bold mt-0.5">
                      {item.symbol} ({item.weight})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {results.length === 0 && (
          <div className="apple-card p-12 text-center text-neutral-400">
            <Compass className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">मात्रा गणना के लिए ऊपर पंक्तियाँ लिखें।</p>
          </div>
        )}
      </div>

      {/* 3. Chhand Shastra Rules Guide Card */}
      <div className="apple-card p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-4 h-4 text-orange-500" />
          <h4 className="font-bold text-sm md:text-base text-neutral-900 dark:text-white font-hindi-display">
            पिंगल छंद शास्त्र: मात्रा निर्धारण के शास्त्रीय नियम
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-600 dark:text-neutral-300">
          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] space-y-2">
            <h5 className="font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
              <span>१. लघु वर्ण (चिह्न: । • मान: १ मात्रा)</span>
            </h5>
            <ul className="list-disc list-inside space-y-1 text-neutral-500 dark:text-neutral-400 ml-1">
              <li>ह्रस्व स्वर: <strong>अ, इ, उ, ऋ</strong></li>
              <li>स्वर-रहित व्यंजन अथवा केवल ह्रस्व मात्रा युक्त (जैसे: <strong>क, कि, कु, कृ</strong>)</li>
              <li>चन्द्रबिन्दु (ँ) वाले अक्षर भी लघु ही रहते हैं (उदा. <strong>हँस, आँख</strong> का आ गुरु है पर ँ लघु)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] space-y-2">
            <h5 className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <span>२. गुरु वर्ण (चिह्न: ऽ • मान: २ मात्रा)</span>
            </h5>
            <ul className="list-disc list-inside space-y-1 text-neutral-500 dark:text-neutral-400 ml-1">
              <li>दीर्घ स्वर: <strong>आ, ई, ऊ, ए, ऐ, ओ, औ</strong></li>
              <li>दीर्घ मात्रा युक्त अक्षर (जैसे: <strong>का, की, कू, के, कै, को, कौ</strong>)</li>
              <li>अनुस्वार (ं) युक्त वर्ण (उदा. <strong>अंग, कंस</strong>)</li>
              <li>विसर्ग (ः) युक्त वर्ण (उदा. <strong>दुःख, अतः</strong>)</li>
              <li>संयुक्त वर्ण से पूर्व का लघु वर्ण गुरु हो जाता है (उदा. <strong>सत्य</strong> में 'स' गुरु है)</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
