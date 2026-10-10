import React, { useState, useEffect } from "react";
import { 
  Volume2, 
  VolumeX, 
  CloudRain, 
  Radio, 
  Moon, 
  Bell, 
  Sparkles,
  Sliders
} from "lucide-react";
import { ambientSoundEngine, SoundscapeType } from "@/lib/ambientSoundscapes";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";

export const AmbientSoundBar: React.FC = () => {
  const [activeSound, setActiveSound] = useState<SoundscapeType>("off");
  const [volume, setVolume] = useState([45]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    return () => {
      ambientSoundEngine.stop();
    };
  }, []);

  const handleToggleSound = (type: SoundscapeType) => {
    if (activeSound === type) {
      ambientSoundEngine.stop();
      setActiveSound("off");
      toast({
        title: "ध्वनि शांत",
        description: "प्राकृतिक वातावरण शांत कर दिया गया है।",
      });
    } else {
      ambientSoundEngine.play(type);
      setActiveSound(type);
      const names: Record<SoundscapeType, string> = {
        off: "शांत",
        rain: "रिमझिम वर्षा",
        tanpura: "तानपुरा व ओंकार ध्वनि",
        night: "शांत रात्रि व बयार",
        bell: "मंदिर की घंटी व नाद",
      };
      toast({
        title: `${names[type]} सक्रिय`,
        description: "एकाग्रता और काव्य सृजन हेतु पृष्ठभूमि संगीत प्रारंभ।",
      });
    }
  };

  const handleVolumeChange = (newVal: number[]) => {
    setVolume(newVal);
    ambientSoundEngine.setVolume(newVal[0] / 100);
  };

  const soundOptions = [
    { type: "rain" as SoundscapeType, label: "वर्षा", icon: CloudRain, title: "रिमझिम वर्षा" },
    { type: "tanpura" as SoundscapeType, label: "तानपुरा", icon: Radio, title: "तानपुरा नाद" },
    { type: "night" as SoundscapeType, label: "रात्रि", icon: Moon, title: "रात्रि बयार" },
    { type: "bell" as SoundscapeType, label: "घंटी", icon: Bell, title: "मंदिर घंटी" },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 animate-in fade-in duration-300">
      <div className="apple-glass rounded-2xl shadow-xl p-2.5 flex items-center gap-2 border border-black/[0.08] dark:border-white/[0.12] transition-all">
        
        {/* Main Pill Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeSound !== "off"
              ? "bg-orange-500 text-white shadow-sm"
              : "hover:bg-black/[0.05] dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-200"
          }`}
          title="काव्य वातावरण ध्वनि (Ambient Soundscapes)"
        >
          {activeSound !== "off" ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">वातावरण ध्वनि</span>
              <span className="flex items-end gap-0.5 h-3 ml-0.5">
                <span className="w-1 bg-white animate-wave-1 rounded-full" />
                <span className="w-1 bg-white animate-wave-2 rounded-full" />
                <span className="w-1 bg-white animate-wave-3 rounded-full" />
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline text-neutral-600 dark:text-neutral-300">वातावरण संगीत</span>
            </>
          )}
        </button>

        {/* Expanded Sound Options */}
        {isExpanded && (
          <div className="flex items-center gap-1.5 pl-1 border-l border-black/[0.08] dark:border-white/[0.1] animate-in fade-in slide-in-from-right-2 duration-200">
            {soundOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = activeSound === opt.type;
              return (
                <button
                  key={opt.type}
                  onClick={() => handleToggleSound(opt.type)}
                  className={`p-2 rounded-xl text-xs flex items-center gap-1 transition-all ${
                    isActive
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm"
                      : "text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
                  }`}
                  title={opt.title}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[11px] font-medium">{opt.label}</span>
                </button>
              );
            })}

            {/* Volume Slider */}
            {activeSound !== "off" && (
              <div className="flex items-center gap-2 pl-2 w-24">
                <Sliders className="w-3 h-3 text-neutral-400 shrink-0" />
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={5}
                  className="w-16"
                />
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
