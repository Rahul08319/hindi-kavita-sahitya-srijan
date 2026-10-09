import React, { useState } from "react";
import { 
  Share2, 
  Send, 
  Copy, 
  Check, 
  Globe, 
  MessageCircle, 
  Twitter, 
  Facebook, 
  Key, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface SocialTabProps {
  generatedStory: string;
  generatedImage: string;
  isPosting: boolean;
  facebookToken: string;
  pageId?: string;
  onFacebookTokenChange: (token: string) => void;
  onPageIdChange?: (pageId: string) => void;
  onPostToFacebook: () => void;
  onShareWeb?: (title: string, text: string) => void;
  onShareWhatsApp?: (text: string) => void;
  onShareTwitter?: (text: string) => void;
  onShareTelegram?: (text: string) => void;
  onCopyText?: (text: string) => void;
}

export const SocialTab: React.FC<SocialTabProps> = ({
  generatedStory,
  generatedImage,
  isPosting,
  facebookToken,
  pageId = "",
  onFacebookTokenChange,
  onPageIdChange,
  onPostToFacebook,
  onShareWeb,
  onShareWhatsApp,
  onShareTwitter,
  onShareTelegram,
  onCopyText,
}) => {
  const [customShareText, setCustomShareText] = useState(generatedStory || "");
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (generatedStory && !customShareText) {
      setCustomShareText(generatedStory);
    }
  }, [generatedStory, customShareText]);

  const handleCopy = () => {
    const textToCopy = customShareText || generatedStory;
    if (!textToCopy) {
      toast({
        title: "कॉपी करने के लिए पाठ उपलब्ध नहीं",
        description: "पहले कोई कविता या रचना तैयार करें।",
        variant: "destructive",
      });
      return;
    }
    if (onCopyText) {
      onCopyText(textToCopy);
    } else {
      navigator.clipboard.writeText(textToCopy);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = customShareText || generatedStory;
    if (onShareWhatsApp) {
      onShareWhatsApp(text);
    } else {
      const encoded = encodeURIComponent(`${text}\n\n— हिंदी कविता साहित्य सृजन`);
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
    }
  };

  const handleTwitter = () => {
    const text = customShareText || generatedStory;
    if (onShareTwitter) {
      onShareTwitter(text);
    } else {
      const preview = text.length > 220 ? `${text.slice(0, 215)}...` : text;
      const encoded = encodeURIComponent(`${preview}\n\n#HindiPoetry #हिंदीसाहित्य`);
      window.open(`https://twitter.com/intent/tweet?text=${encoded}`, "_blank");
    }
  };

  const handleTelegram = () => {
    const text = customShareText || generatedStory;
    if (onShareTelegram) {
      onShareTelegram(text);
    } else {
      const encodedText = encodeURIComponent(text);
      window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodedText}`, "_blank");
    }
  };

  const handleNativeShare = () => {
    const text = customShareText || generatedStory;
    if (onShareWeb) {
      onShareWeb("हिंदी कविता साहित्य सृजन", text);
    } else if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: "हिंदी कविता साहित्य सृजन",
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Instant Social Sharing Hub (Apple Share Sheet Style) */}
      <div className="apple-card p-6 md:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white font-hindi-display">
              त्वरित सोशल मीडिया साझाकरण (Instant Social Share)
            </h3>
            <p className="text-xs text-neutral-500">
              अपनी काव्य रचना को एक क्लिक में WhatsApp, X (Twitter), Telegram या क्लिपबोर्ड पर भेजें
            </p>
          </div>
        </div>

        {/* Text Area for Sharing */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              साझा करने हेतु पाठ (Share Content):
            </label>
            <span className="text-[11px] text-neutral-400">
              {customShareText.length} वर्ण (Characters)
            </span>
          </div>
          <Textarea
            value={customShareText}
            onChange={(e) => setCustomShareText(e.target.value)}
            placeholder="यहाँ रचना दिखाई देगी..."
            className="min-h-[110px] bg-white/60 dark:bg-black/20 border-black/[0.08] dark:border-white/[0.08] rounded-xl text-sm p-3.5 leading-relaxed"
          />
        </div>

        {/* 1-Click Share Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <Button
            onClick={handleWhatsApp}
            disabled={!customShareText}
            className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-medium text-xs shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp पर भेजें</span>
          </Button>

          <Button
            onClick={handleTwitter}
            disabled={!customShareText}
            className="h-11 rounded-xl bg-sky-500 hover:bg-sky-600 text-white gap-2 font-medium text-xs shadow-sm"
          >
            <Twitter className="w-4 h-4" />
            <span>X (Twitter) पर पोस्ट</span>
          </Button>

          <Button
            onClick={handleTelegram}
            disabled={!customShareText}
            className="h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white gap-2 font-medium text-xs shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Telegram चैनल</span>
          </Button>

          <Button
            onClick={handleCopy}
            variant="outline"
            className="h-11 rounded-xl gap-2 font-medium text-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "कॉपी हो गया!" : "क्लिपबोर्ड पर कॉपी"}</span>
          </Button>
        </div>

        {/* Native Web Share Button */}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <Button
            onClick={handleNativeShare}
            variant="secondary"
            className="w-full h-10 rounded-xl gap-2 text-xs font-medium"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>सिस्टम शेयर शीट खोलें (Apple Native Share Sheet)</span>
          </Button>
        )}
      </div>

      {/* 2. Facebook Graph API Integration */}
      <div className="apple-card p-6 md:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Facebook className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white font-hindi-display">
              Facebook Graph API स्वचालित प्रकाशन
            </h3>
            <p className="text-xs text-neutral-500">
              Facebook Profile अथवा Facebook Page पर सीधे API द्वारा पोस्ट प्रकाशित करें
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="token" className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Facebook User / Page Access Token:
              </Label>
              <Input
                id="token"
                type="password"
                placeholder="उदा: EAA..."
                value={facebookToken}
                onChange={(e) => onFacebookTokenChange(e.target.value)}
                className="mt-1.5 h-10 bg-white/60 dark:bg-black/20 border-black/[0.08] dark:border-white/[0.08] rounded-xl text-xs"
              />
              <p className="text-[11px] text-neutral-400 mt-1">
                Graph API Explorer से जनरेट किया गया वैध टोकन
              </p>
            </div>

            <div>
              <Label htmlFor="pageId" className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Page ID (वैकल्पिक / Optional):
              </Label>
              <Input
                id="pageId"
                type="text"
                placeholder="पेज पर पोस्ट करने हेतु Page ID दर्ज करें"
                value={pageId}
                onChange={(e) => onPageIdChange && onPageIdChange(e.target.value)}
                className="mt-1.5 h-10 bg-white/60 dark:bg-black/20 border-black/[0.08] dark:border-white/[0.08] rounded-xl text-xs"
              />
              <p className="text-[11px] text-neutral-400 mt-1">
                खाली छोड़ने पर व्यक्तिगत प्रोफ़ाइल फीड (/me/feed) पर पोस्ट होगा
              </p>
            </div>
          </div>

          {/* Post Preview Box */}
          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/40 space-y-3">
            <div className="flex items-center justify-between text-xs text-blue-900 dark:text-blue-300 font-semibold">
              <span>पोस्ट पूर्वावलोकन (Post Preview):</span>
              <Badge variant="outline" className="text-[10px] bg-white/50 dark:bg-black/30">
                Graph API v21.0
              </Badge>
            </div>

            {customShareText ? (
              <div className="text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap line-clamp-4 font-hindi-serif">
                {customShareText}
              </div>
            ) : (
              <p className="text-xs text-neutral-400 italic">
                पहले सृजन टैब में कोई रचना तैयार करें।
              </p>
            )}

            {generatedImage && (
              <div className="mt-2">
                <span className="text-[11px] text-neutral-500 block mb-1">संलग्न पोस्टर:</span>
                <img
                  src={generatedImage}
                  alt="Attachment Preview"
                  className="max-h-24 rounded border border-black/10 dark:border-white/10"
                />
              </div>
            )}
          </div>

          <Button
            onClick={onPostToFacebook}
            disabled={isPosting || !customShareText || !facebookToken}
            className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm gap-2"
          >
            {isPosting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Facebook पर प्रकाशित हो रहा है...</span>
              </>
            ) : (
              <>
                <Facebook className="w-4 h-4" />
                <span>Facebook पर पोस्ट करें (Publish to Facebook)</span>
              </>
            )}
          </Button>
        </div>

        {/* Setup Guide */}
        <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] text-xs space-y-2">
          <h5 className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Facebook API टोकन सेटअप निर्देश:
          </h5>
          <ol className="list-decimal list-inside text-neutral-600 dark:text-neutral-400 space-y-1 ml-2 text-[11px]">
            <li>
              <a
                href="https://developers.facebook.com/tools/explorer/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5"
              >
                Facebook Graph API Explorer <ExternalLink className="w-2.5 h-2.5" />
              </a>{" "}
              पर जाएं।
            </li>
            <li>अपने Facebook Developer Account से लॉगिन करें और App चुनें।</li>
            <li>Permissions में <code>pages_manage_posts</code> एवं <code>pages_read_engagement</code> जोड़ें।</li>
            <li>'Generate Access Token' पर क्लिक कर टोकन कॉपी करें और यहाँ पेस्ट करें।</li>
          </ol>
        </div>
      </div>
    </div>
  );
};