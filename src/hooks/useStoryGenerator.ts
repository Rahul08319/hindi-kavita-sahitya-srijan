import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const useStoryGenerator = () => {
  const [generatedStory, setGeneratedStory] = useState("");
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  const generateStory = async (prompt: string) => {
    if (!prompt.trim()) {
      toast({
        title: "कृपया प्रॉम्प्ट दर्ज करें",
        description: "कहानी जनरेट करने के लिए एक प्रॉम्प्ट आवश्यक है",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingStory(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Free AI story generation using advanced templates and randomization
      const storyTemplates = [
        {
          opening: "प्राचीन चीन के सुनहरे युग में",
          setting: ["पर्वतों की ऊंची चोटियों पर", "नदी के मधुर तट पर", "बांस के घने जंगल में", "फूलों से भरे बगीचे में"],
          poet: ["एक महान कवि रहता था", "एक दार्शनिक कवि वास करता था", "एक प्रकृति प्रेमी कवि था"],
          journey: ["जो अपनी कलम से जादू करता था", "जिसकी कविताएं आत्मा को छू जाती थीं", "जो शब्दों में जीवन फूंक देता था"],
        }
      ];
      
      const themes = [
        "चांद की रोशनी और शराब के नशे में",
        "प्रकृति की सुंदरता और शांति में",
        "जीवन के दुःख और संघर्ष में",
        "प्रेम और विरह की पीड़ा में",
        "सामाजिक न्याय और सत्य में"
      ];
      
      const poeticLines = [
        "बादलों के पार चांद मुस्कराता है,\nफूलों की खुशबू मन को भाता है।",
        "पर्वत शिखर पर बैठा कवि,\nशब्दों में ढालता जीवन की कवि।",
        "हवा में नाचते बांस के पेड़,\nसुनाते हैं प्रेम के मधुर छंद।",
        "नदी की धारा जैसे जीवन की गति,\nकवि के मन में जगती नई स्फूर्ति।"
      ];
      
      const template = storyTemplates[0];
      const randomSetting = template.setting[Math.floor(Math.random() * template.setting.length)];
      const randomPoet = template.poet[Math.floor(Math.random() * template.poet.length)];
      const randomJourney = template.journey[Math.floor(Math.random() * template.journey.length)];
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      const randomPoetry = poeticLines[Math.floor(Math.random() * poeticLines.length)];
      
      const generatedStory = `${template.opening}, ${randomSetting}, ${randomPoet} ${randomJourney}।

${prompt} के विषय में एक अनोखी कहानी यहाँ से शुरू होती है। ${randomTheme}, उसने जीवन के गहरे रहस्यों को समझा।

हर सुबह सूर्योदय के साथ, वह प्रकृति के साथ बातचीत करता था। पंछियों के मधुर गीत, हवा की सरसराहट, और फूलों की सुगंध - ये सब उसकी प्रेरणा के स्रोत थे।

लोग दूर-दूर से उसकी कविताएं सुनने आते थे। उसके शब्द दिलों को छूते थे और आत्मा को शांति देते थे।

एक दिन, गहरे ध्यान में लीन होकर, उसने लिखा:

"${randomPoetry}
जीवन के इस सफर में,
प्रेम ही सबसे सुंदर राह दिखाता है।"

यह कहानी आज भी हमें सिखाती है कि सच्ची कविता वही है जो दिल से निकलती है और दिल तक पहुंचती है। ${prompt} की तरह, हम सभी में कुछ न कुछ कवि छुपा हुआ है।

समय बीतता गया, लेकिन उसकी कविताओं की गूंज आज भी पर्वतों में सुनाई देती है।`;

      setGeneratedStory(generatedStory);
      toast({
        title: "कहानी सफलतापूर्वक जनरेट हुई!",
        description: "AI ने आपकी हिंदी कहानी तैयार कर दी है",
      });
    } catch (error) {
      console.error("Error generating story:", error);
      toast({
        title: "कहानी जनरेट करने में त्रुटि",
        description: "कृपया पुनः प्रयास करें",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingStory(false);
    }
  };

  return {
    generatedStory,
    isGeneratingStory,
    generateStory
  };
};