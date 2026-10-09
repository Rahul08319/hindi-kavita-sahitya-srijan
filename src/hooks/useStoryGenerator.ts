import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export interface GeneratedLiterature {
  title: string;
  category: string;
  rasa: string;
  muse: string;
  content: string;
  summary: string;
  rhymes?: string[];
  vocabulary?: { word: string; meaning: string }[];
  meterNotes?: string;
}

export const useStoryGenerator = () => {
  const [generatedStory, setGeneratedStory] = useState("");
  const [literatureDetail, setLiteratureDetail] = useState<GeneratedLiterature | null>(null);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.9); // optimal cadence for poetry
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop speech if unmounted
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const generateStory = async (
    prompt: string,
    options?: {
      category?: string;
      rasa?: string;
      muse?: string;
    }
  ) => {
    const topic = prompt.trim() || "प्रकृति, अंतर्मन और जीवन का सत्य";
    const category = options?.category || "कविता";
    const rasa = options?.rasa || "शांत रस";
    const muse = options?.muse || "दिनकर व निराला शैली";

    setIsGeneratingStory(true);

    // Stop ongoing audio
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }

    // Realistic synthesis delay with animation
    await new Promise((resolve) => setTimeout(resolve, 1400));

    try {
      let title = "";
      let verses = "";
      let summary = "";
      let meterNotes = "";
      let vocabulary: { word: string; meaning: string }[] = [];
      let rhymes: string[] = [];

      if (category === "दोहा") {
        title = `अमृत दोहावली: ${topic}`;
        verses = `माटी कहे कुम्हार से, समझ सकै तो जान।\nजो बीता सो स्वप्न था, वर्तमान पहचान॥\n\nमन की मैली चादरिया, धोवे निर्मल नीर।\nशब्द बाण जब छूटिगे, वेधत अंतःशरीर॥\n\nप्रेम बिना सब शून्य है, ज्ञान बिना अंधियार।\n${topic} में खोज ले, जग का सार अपार॥`;
        summary = `यह दोहावली जीवन की अनित्यता, अंतःकरण की शुद्धि और '${topic}' के माध्यम से परम सत्य को खोजने का संदेश देती है।`;
        meterNotes = "पारंपरिक दोहा छंद (१३-११ मात्राएं, गुरु-लघु अंत्य तुकबंदी)";
        vocabulary = [
          { word: "चादरिया", meaning: "मन का आवरण अथवा शरीर" },
          { word: "वेधत", meaning: "गहराई तक भेदना" },
          { word: "अंधियार", meaning: "अज्ञान का अंधकार" },
        ];
        rhymes = ["जान-पहचान", "नीर-शरीर", "अंधियार-अपार"];
      } else if (category === "ग़ज़ल") {
        title = `ग़ज़ल: ${topic} का उजाला`;
        verses = `चिराग़ जलते रहे शाम से सहर की तरफ़,\nनज़र जो उट्ठी तिरी तो गए जिगर की तरफ़॥\n\nसफ़र में धूप तो होगी जो चल सको तो चलो,\nकदम बढ़े हैं मिरे जब भी रहगुज़र की तरफ़॥\n\nये ख़ामोशी भी कभी दास्तां सुनाती है,\nजो ध्यान जाए कभी दिल के इक हुनर की तरफ़॥\n\n${topic} का ये तसव्वुर निखर गया ऐसे,\nकि जैसे चाँद उतर आए बामो-दर की तरफ़॥`;
        summary = `जीवन-यात्रा की धूप-छांव और '${topic}' की अनुभूति को कोमल लयात्मक शेरों में पिरोया गया है।`;
        meterNotes = "बह़र-ए-हज़ज (मुफ़ाईलुन मुफ़ाईलुन), रदीफ़: 'की तरफ़'";
        vocabulary = [
          { word: "रहगुज़र", meaning: "रास्ता अथवा मार्ग" },
          { word: "तसव्वुर", meaning: "कल्पना अथवा आत्मिक ध्यान" },
          { word: "बामो-दर", meaning: "छत और दरवाज़ा / घर-आँगन" },
        ];
        rhymes = ["सहर", "जिगर", "रहगुज़र", "हुनर", "दर"];
      } else if (category === "कहानी") {
        title = `साहित्यिक कथा: ${topic} की खोज`;
        verses = `प्राचीन काल की बात है, जब विंध्याचल की तराई में बहती निर्मल नदी के तट पर एक एकांत कुटीर थी। वहाँ एक साधक-कवि वास करता था, जिसके हृदय में '${topic}' का गहरा मंथन चल रहा था।\n\nप्रभात की सुनहरी किरणें जब पलाश के वनों को छूतीं, तब वह अपनी भोजपत्र की पाण्डुलिपि पर शब्द उकेरता। वह जानता था कि जो भाव अंतःकरण के ताप से नहीं तपते, वे कभी अमर साहित्य नहीं बनते।\n\nएक संध्या, जब बादलों ने अंबर को सिंदूरी आभा से नहला दिया, एक थका हुआ पथिक उसकी कुटी पर आया। पथिक ने पूछा— "हे कवि, संसार में सबसे बड़ा ऐश्वर्य क्या है?"\n\nकवि ने मंद मुस्कान के साथ अपनी लिखी पंक्तियाँ सुनाईं:\n"जिसने अपने भीतर के मौन को पहचान लिया, और पराई पीड़ा को अपनी आंख का आंसू बना लिया, वही जीवन का सम्राट है।"\n\nयह सुनकर पथिक का चित्त शांत हो गया। ${topic} का यह बोध सदियों तक उस अंचल में गूंजता रहा।`;
        summary = `यह लघु कथा अंतर्मुखी साधना, परोपकार और '${topic}' के दार्शनिक स्वरूप को उजागर करती है।`;
        meterNotes = "भावप्रधान गद्य-काव्य (Lyric Prose) शैली";
        vocabulary = [
          { word: "भोजपत्र", meaning: "प्राचीन काल में लेखन हेतु प्रयुक्त वृक्ष की छाल" },
          { word: "अंतःकरण", meaning: "हृदय, मन और अंतरात्मा का सम्मिलित स्वरूप" },
          { word: "चित्त", meaning: "चेतना और एकाग्र मन" },
        ];
      } else {
        // कविता (Poetry - Default)
        title = `काव्य सृजन: ${topic}`;
        verses = `अंबर की नीरवता चीर,\nउठती जब कोई अंतर-पीर,\nकलम उठाता मौन विहग-सा,\nबहता निर्मल भाव-समीर।\n\nशिखर-शिखर पर धूप सुनहरी,\nघाट-घाट पर नदी गंभीर,\n${topic} का यह नव आह्वान,\nमिटा रहा मन का सब धीर।\n\nन हम रुकेंगे, न हम झुकेंगे,\nअग्नि-शिखा सम दीप जलेंगे,\nतिमिर चीर कर नूतन पथ पर,\nप्राण-स्पंदन संग चलेंगे!\n\nशब्द नहीं केवल ये स्पंदन,\nहैं युग-चेतना का अभिनंदन,\nजब तक श्वासों में कविता है,\nहोता रहेगा अमर समर्पण!`;
        summary = `यह ओजस्वी रचना '${topic}' को केंद्र में रखकर नव-स्फूर्ति, अडिग संकल्प और काव्य-साधना का आह्वान करती है।`;
        meterNotes = "मुक्त छंद व तुकांत चतुष्पदी (AABB छंद संरचना)";
        vocabulary = [
          { word: "नीरवता", meaning: "गहरा सन्नाटा / एकांत शांति" },
          { word: "विहग", meaning: "पक्षी / मुक्त चेतना" },
          { word: "तिमिर", meaning: "अंधकार" },
          { word: "स्पंदन", meaning: "जीवन की आंतरिक धड़कन" },
        ];
        rhymes = ["चीर-पीर-समीर", "गंभीर-धीर", "जलेंगे-चलेंगे", "अभिनंदन-समर्पण"];
      }

      const generatedStoryFull = `${title}\n\nविधा: ${category} | रस: ${rasa} | शैली: ${muse}\n\n${verses}\n\nभावार्थ:\n${summary}`;

      const detail: GeneratedLiterature = {
        title,
        category,
        rasa,
        muse,
        content: verses,
        summary,
        meterNotes,
        vocabulary,
        rhymes,
      };

      setGeneratedStory(generatedStoryFull);
      setLiteratureDetail(detail);

      toast({
        title: "काव्य रचना संपन्न!",
        description: `"${title}" सफलतापूर्वक सृजित हुई।`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "सृजन में त्रुटि",
        description: "कृपया पुनः प्रयास करें।",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingStory(false);
    }
  };

  const toggleSpeechRecitation = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast({
        title: "ऑडियो उपलब्ध नहीं",
        description: "आपका ब्राउज़र स्पीच सिंथेसिस का समर्थन नहीं करता।",
        variant: "destructive",
      });
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToRead = literatureDetail ? `${literatureDetail.title}। ${literatureDetail.content}` : generatedStory;
    if (!textToRead) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utteranceRef.current = utterance;

    // Detect Hindi voice if available
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang.startsWith("hi") || v.lang.includes("IN"));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    utterance.lang = "hi-IN";
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  }, [isPlayingAudio, literatureDetail, generatedStory, speechRate]);

  return {
    generatedStory,
    literatureDetail,
    isGeneratingStory,
    isPlayingAudio,
    speechRate,
    setSpeechRate,
    generateStory,
    toggleSpeechRecitation,
    setGeneratedStory,
  };
};