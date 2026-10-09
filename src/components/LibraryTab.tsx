import React, { useState } from "react";
import { classicPoems, PoemEntry } from "@/data/sahityaData";
import { 
  Search, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Feather, 
  BookMarked,
  Sparkles,
  Info
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface LibraryTabProps {
  onSelectPoemForArt: (text: string, title: string) => void;
}

export const LibraryTab: React.FC<LibraryTabProps> = ({ onSelectPoemForArt }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeAudioPoemId, setActiveAudioPoemId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "समस्त रचनाएं (All)" },
    { id: "वीर रस", label: "वीर व ओज रस" },
    { id: "शांत रस", label: "शांत व भक्ति" },
    { id: "करुण रस", label: "करुण व विरह" },
    { id: "चीनी काव्य", label: "चीनी क्लासिक्स" },
  ];

  const filteredPoems = classicPoems.filter((poem) => {
    const matchesSearch =
      poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poem.poet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poem.lines.some((l) => l.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === "all") return true;
    if (selectedCategory === "चीनी काव्य") {
      return poem.tags.includes("चीनी काव्य");
    }
    return poem.rasa.includes(selectedCategory);
  });

  const handleCopy = (poem: PoemEntry) => {
    const fullText = `${poem.title}\nरचयिता: ${poem.poet}\nकाल: ${poem.era}\n\n${poem.lines.join("\n")}\n\nभावार्थ:\n${poem.bhavaarth}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(poem.id);
    toast({
      title: "रचना क्लिपबोर्ड पर कॉपी हुई!",
      description: `"${poem.title}" सुरक्षित हो गई है।`,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleAudio = (poem: PoemEntry) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast({
        title: "ऑडियो उपलब्ध नहीं",
        description: "ब्राउज़र स्पीच का समर्थन नहीं करता।",
        variant: "destructive",
      });
      return;
    }

    if (activeAudioPoemId === poem.id) {
      window.speechSynthesis.cancel();
      setActiveAudioPoemId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanLines = poem.lines.filter((l) => !l.startsWith("(")).join("। ");
    const recitation = `${poem.title}। रचयिता: ${poem.poet}। ${cleanLines}`;
    const utterance = new SpeechSynthesisUtterance(recitation);
    utterance.lang = "hi-IN";
    utterance.rate = 0.88;

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang.startsWith("hi"));
    if (hindiVoice) utterance.voice = hindiVoice;

    utterance.onend = () => setActiveAudioPoemId(null);
    utterance.onerror = () => setActiveAudioPoemId(null);

    window.speechSynthesis.speak(utterance);
    setActiveAudioPoemId(poem.id);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="apple-card p-5 md:p-6 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <Input
              type="text"
              placeholder="शीर्षक, कवि का नाम या काव्य पंक्ति खोजें (जैसे: रश्मिरथी, कबीर, ली बाई...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 bg-white/50 dark:bg-black/20 border-black/[0.08] dark:border-white/[0.08] rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-orange-600 text-white shadow-sm"
                  : "bg-black/[0.03] dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.06] dark:hover:bg-white/[0.1]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Poems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPoems.map((poem) => (
          <div
            key={poem.id}
            className="apple-card p-6 md:p-7 flex flex-col justify-between group hover:border-orange-500/30 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="text-xs bg-orange-500/10 text-orange-700 dark:text-orange-300 border-none font-medium">
                  {poem.genre} • {poem.rasa}
                </Badge>
                <span className="text-[11px] text-neutral-500">{poem.era}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-1.5 font-hindi-display">
                {poem.title}
              </h3>
              <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-4">
                रचयिता: {poem.poet}
              </p>

              {/* Verses */}
              <div className="p-4 rounded-xl bg-orange-50/40 dark:bg-white/[0.02] border border-orange-200/40 dark:border-white/[0.04] space-y-1 mb-4 font-hindi-serif text-sm md:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed max-h-56 overflow-y-auto">
                {poem.lines.map((line, idx) => (
                  <p key={idx} className={line === "" ? "h-2" : ""}>
                    {line}
                  </p>
                ))}
              </div>

              {/* Bhavaarth */}
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                <strong className="text-neutral-800 dark:text-neutral-200">भावार्थ: </strong>
                {poem.bhavaarth}
              </p>

              {/* Vocabulary if present */}
              {poem.vocabulary && poem.vocabulary.length > 0 && (
                <div className="mb-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.04]">
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5">
                    कठिन शब्दार्थ (Word Meanings):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {poem.vocabulary.map((vocab, vIdx) => (
                      <span
                        key={vIdx}
                        className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-300 border border-black/[0.04] dark:border-white/[0.04]"
                      >
                        <strong className="text-orange-600 dark:text-orange-400 mr-1">{vocab.word}:</strong>
                        <span>{vocab.meaning}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] dark:border-white/[0.06] mt-2 gap-2">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleAudio(poem)}
                  className="h-8 rounded-full text-xs gap-1.5"
                >
                  {activeAudioPoemId === poem.id ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                      <span>विराम</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-orange-600" />
                      <span>पाठ सुनें</span>
                    </>
                  )}
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(poem)}
                  className="h-8 rounded-full text-xs gap-1 px-2.5"
                >
                  {copiedId === poem.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-neutral-500" />
                  )}
                  <span>{copiedId === poem.id ? "कॉपी हुआ" : "कॉपी"}</span>
                </Button>
              </div>

              <Button
                size="sm"
                onClick={() => onSelectPoemForArt(poem.lines.join("\n"), poem.title)}
                className="h-8 rounded-full text-xs gap-1.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>पोस्टर बनाएं</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredPoems.length === 0 && (
        <div className="text-center py-16 apple-card p-8">
          <BookMarked className="w-10 h-10 text-neutral-400 mx-auto mb-3 opacity-60" />
          <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
            कोई रचना नहीं मिली
          </h4>
          <p className="text-xs text-neutral-500 mt-1">
            कृपया अन्य शब्द या कवि का नाम खोजें
          </p>
        </div>
      )}
    </div>
  );
};
