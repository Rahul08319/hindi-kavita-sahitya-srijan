import React, { useState } from "react";
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Feather, 
  BookOpen, 
  Compass, 
  PenTool, 
  Shuffle,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { GeneratedLiterature } from "@/hooks/useStoryGenerator";

interface StoryTabProps {
  generatedStory: string;
  literatureDetail: GeneratedLiterature | null;
  isGeneratingStory: boolean;
  isPlayingAudio: boolean;
  onGenerateStory: (
    prompt: string,
    options?: { category?: string; rasa?: string; muse?: string }
  ) => void;
  onToggleSpeech: () => void;
  onSendToArtStudio: (text: string, title: string) => void;
}

export const StoryTab: React.FC<StoryTabProps> = ({
  generatedStory,
  literatureDetail,
  isGeneratingStory,
  isPlayingAudio,
  onGenerateStory,
  onToggleSpeech,
  onSendToArtStudio,
}) => {
  const [prompt, setPrompt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("कविता");
  const [selectedRasa, setSelectedRasa] = useState("शांत रस");
  const [selectedMuse, setSelectedMuse] = useState("दिनकर व निराला शैली");
  const [copied, setCopied] = useState(false);

  const categories = ["कविता", "दोहा", "कहानी", "ग़ज़ल", "मुक्तक"];
  const rasas = ["शांत रस", "वीर रस", "शृंगार रस", "करुण रस", "अद्भुत रस", "हास्य रस"];
  const muses = [
    "दिनकर व निराला शैली",
    "कबीर व तुलसी शैली",
    "महादेवी वर्मा शैली",
    "हरिवंश राय बच्चन शैली",
    "ली बाई व चीनी क्लासिक्स",
    "सूफी रूमी शैली",
  ];

  const quickPrompts = [
    "चांद, रात्रि और एकांत चिंतन",
    "हिमालय, राष्ट्र चेतना और शौर्य",
    "वर्षा की पहली फुहार और सोंधी मिट्टी",
    "समय की गति और जीवन का रहस्य",
    "प्रेम, समर्पण और विरह की पीड़ा",
    "शहरी भागदौड़ में खोता हुआ सुकून",
  ];

  const handleGenerate = () => {
    onGenerateStory(prompt, {
      category: selectedCategory,
      rasa: selectedRasa,
      muse: selectedMuse,
    });
  };

  const handleCopy = () => {
    if (!generatedStory) return;
    navigator.clipboard.writeText(generatedStory);
    setCopied(true);
    toast({
      title: "रचना क्लिपबोर्ड पर कॉपी हुई!",
      description: "आप इसे कहीं भी साझा कर सकते हैं।",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Studio Input Card */}
      <div className="apple-card p-6 md:p-8 relative overflow-hidden">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white font-hindi-display">
              काव्य एवं साहित्य सृजन पीठ
            </h3>
            <p className="text-xs text-neutral-500">
              विधा, रस और शैली का चयन कर अपनी कल्पना को शब्द दें
            </p>
          </div>
        </div>

        {/* Options Row 1: Category */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2">
              १. साहित्य विधा (Literature Genre):
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm"
                      : "bg-black/[0.04] dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.07] dark:hover:bg-white/[0.1]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Options Row 2: Rasa */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2">
              २. काव्य रस एवं भाव (Emotion / Rasa):
            </label>
            <div className="flex flex-wrap gap-2">
              {rasas.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRasa(r)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedRasa === r
                      ? "bg-orange-600 text-white shadow-sm"
                      : "bg-black/[0.04] dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.07] dark:hover:bg-white/[0.1]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Options Row 3: Muse / Style */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2">
              ३. प्रेरणा शैली (Poetic Muse):
            </label>
            <div className="flex flex-wrap gap-2">
              {muses.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMuse(m)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedMuse === m
                      ? "bg-rose-600 text-white shadow-sm"
                      : "bg-black/[0.04] dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.07] dark:hover:bg-white/[0.1]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Textarea Input */}
        <div className="space-y-3 mb-6">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
            ४. रचना का विषय अथवा विचार (Topic / Thought):
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="उदाहरण: जब रात्रि में दीप बुझ जाए और केवल अंतरात्मा की आवाज शेष रहे... अथवा नीचे दिए गए सुझावों में से चुनें"
            className="min-h-[110px] bg-white/60 dark:bg-black/20 border-black/[0.08] dark:border-white/[0.08] rounded-xl text-sm leading-relaxed p-4"
          />

          {/* Quick Prompts Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-neutral-400 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              शीघ्र प्रेरणा:
            </span>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(qp)}
                className="text-[11px] px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-700 dark:text-orange-300 hover:bg-orange-500/20 transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGeneratingStory}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:opacity-95 text-white font-medium text-base shadow-md transition-all gap-2"
        >
          {isGeneratingStory ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>काव्य सृजन हो रहा है...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>रचना सृजित करें (Generate Literature)</span>
            </>
          )}
        </Button>
      </div>

      {/* Generated Literature Display Card */}
      {generatedStory && (
        <div className="apple-card p-6 md:p-8 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08] mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/30">
                  {literatureDetail?.category || selectedCategory}
                </Badge>
                <Badge variant="outline" className="text-xs bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30">
                  {literatureDetail?.rasa || selectedRasa}
                </Badge>
                <span className="text-xs text-neutral-400">• {literatureDetail?.muse || selectedMuse}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white font-hindi-display">
                {literatureDetail?.title || "सृजित रचना"}
              </h3>
            </div>

            {/* Audio & Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={isPlayingAudio ? "default" : "outline"}
                onClick={onToggleSpeech}
                className="rounded-full text-xs gap-1.5 h-9 px-4"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>विराम दें</span>
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
                onClick={handleCopy}
                className="rounded-full text-xs gap-1.5 h-9"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "कॉपी हुआ" : "कॉपी"}</span>
              </Button>

              <Button
                size="sm"
                onClick={() => onSendToArtStudio(literatureDetail?.content || generatedStory, literatureDetail?.title || "साहित्य रचना")}
                className="rounded-full text-xs gap-1.5 h-9 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>पोस्टर बनाएं</span>
              </Button>
            </div>
          </div>

          {/* Verses Container */}
          <div className="p-6 md:p-8 rounded-2xl bg-orange-50/50 dark:bg-white/[0.02] border border-orange-200/50 dark:border-white/[0.06] mb-6">
            <div className="font-hindi-serif text-lg md:text-xl text-neutral-800 dark:text-neutral-100 leading-relaxed whitespace-pre-wrap text-center max-w-2xl mx-auto">
              {literatureDetail?.content || generatedStory}
            </div>
          </div>

          {/* Meter Notes & Vocabulary Details */}
          {literatureDetail && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
              {/* Meter notes & summary */}
              <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  छंद व शिल्प विधान (Meter & Form):
                </span>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium mb-2">
                  {literatureDetail.meterNotes}
                </p>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  भावार्थ (Essence):
                </span>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 italic">
                  {literatureDetail.summary}
                </p>
              </div>

              {/* Vocabulary / Rhymes */}
              <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  कठिन शब्दार्थ (Word Meanings):
                </span>
                {literatureDetail.vocabulary && literatureDetail.vocabulary.length > 0 ? (
                  <div className="space-y-1.5">
                    {literatureDetail.vocabulary.map((vocab, vIdx) => (
                      <div key={vIdx} className="text-xs flex items-baseline gap-1.5">
                        <strong className="text-orange-600 dark:text-orange-400">{vocab.word}:</strong>
                        <span className="text-neutral-600 dark:text-neutral-300">{vocab.meaning}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500">सरल एवं सहज शब्दावली का प्रयोग</p>
                )}

                {literatureDetail.rhymes && literatureDetail.rhymes.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                      तुकबंदी युग्म (Rhyming Pairs):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {literatureDetail.rhymes.map((r, rIdx) => (
                        <span
                          key={rIdx}
                          className="text-[11px] px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-300"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};