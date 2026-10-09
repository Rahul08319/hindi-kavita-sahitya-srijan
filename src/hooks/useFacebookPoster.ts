import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const useFacebookPoster = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [facebookToken, setFacebookToken] = useState("");
  const [pageId, setPageId] = useState("");

  const copyToClipboard = async (text: string) => {
    if (!text) {
      toast({
        title: "कॉपी करने के लिए कुछ नहीं है",
        description: "पहले कोई कविता या रचना तैयार करें।",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "क्लिपबोर्ड पर कॉपी किया गया!",
        description: "रचना सफलतापूर्वक कॉपी हो गई है।",
      });
    } catch {
      toast({
        title: "कॉपी करने में विफल",
        description: "कृपया मैन्युअल रूप से कॉपी करें।",
        variant: "destructive",
      });
    }
  };

  const shareViaWebShare = async (title: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: title || "हिंदी कविता साहित्य सृजन",
          text: text,
          url: window.location.href,
        });
        toast({
          title: "साझाकरण संपन्न!",
          description: "रचना सफलतापूर्वक साझा की गई।",
        });
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error(err);
        }
      }
    } else {
      // Fallback to clipboard
      await copyToClipboard(text);
    }
  };

  const shareToWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(`${text}\n\n— हिंदी कविता साहित्य सृजन से साझा`);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

  const shareToTwitter = (text: string) => {
    const preview = text.length > 220 ? `${text.slice(0, 215)}...` : text;
    const encoded = encodeURIComponent(`${preview}\n\n#HindiPoetry #हिंदी_साहित्य`);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, "_blank");
  };

  const shareToTelegram = (text: string) => {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(window.location.href);
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, "_blank");
  };

  const postToFacebook = async (generatedStory: string) => {
    if (!generatedStory || !facebookToken) {
      toast({
        title: "अधूरी जानकारी",
        description: "Facebook पोस्ट करने के लिए रचना और Access Token दोनों अनिवार्य हैं।",
        variant: "destructive",
      });
      return;
    }

    setIsPosting(true);
    try {
      const endpoint = pageId ? `https://graph.facebook.com/${pageId}/feed` : `https://graph.facebook.com/me/feed`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `${generatedStory}\n\n#हिंदीकविता #साहित्यसृजन #HindiLiterature`,
          access_token: facebookToken,
        }),
      });

      if (response.ok) {
        toast({
          title: "Facebook पर सफलतापूर्वक प्रकाशित!",
          description: "आपकी साहित्यिक रचना Facebook पर साझा हो चुकी है।",
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || "Facebook posting failed");
      }
    } catch (error: unknown) {
      console.error("Error posting to Facebook:", error);
      toast({
        title: "Facebook प्रकाशन में त्रुटि",
        description: error instanceof Error ? error.message : "कृपया access token और permissions की जांच करें।",
        variant: "destructive",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return {
    isPosting,
    facebookToken,
    pageId,
    setPageId,
    setFacebookToken,
    postToFacebook,
    copyToClipboard,
    shareViaWebShare,
    shareToWhatsApp,
    shareToTwitter,
    shareToTelegram,
  };
};