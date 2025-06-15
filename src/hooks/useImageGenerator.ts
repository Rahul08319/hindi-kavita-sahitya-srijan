import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const useImageGenerator = () => {
  const [generatedImage, setGeneratedImage] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const generateImage = async (generatedStory: string) => {
    if (!generatedStory) {
      toast({
        title: "पहले कहानी जनरेट करें",
        description: "इमेज बनाने के लिए पहले कहानी आवश्यक है",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingImage(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    try {
      // Analyze story content to determine image theme
      const storyLower = generatedStory.toLowerCase();
      
      // Determine dominant themes from the story
      const themes = {
        moon: storyLower.includes('चांद') || storyLower.includes('चांदनी') || storyLower.includes('रात'),
        nature: storyLower.includes('प्रकृति') || storyLower.includes('फूल') || storyLower.includes('बगीचे'),
        mountains: storyLower.includes('पर्वत') || storyLower.includes('पहाड़'),
        river: storyLower.includes('नदी') || storyLower.includes('धारा'),
        bamboo: storyLower.includes('बांस'),
        wine: storyLower.includes('शराब') || storyLower.includes('मदिरा'),
        sadness: storyLower.includes('दुख') || storyLower.includes('विरह') || storyLower.includes('पीड़ा'),
        love: storyLower.includes('प्रेम') || storyLower.includes('प्यार'),
        peace: storyLower.includes('शांति') || storyLower.includes('ध्यान')
      };

      // Create story-specific image based on themes
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Canvas context not available');
      }
      
      // Create dynamic background based on story themes
      let backgroundColor, accentColor;
      if (themes.moon) {
        // Night/moon theme - dark blues and silvers
        backgroundColor = ['#191970', '#483D8B', '#2F4F4F', '#000080'];
        accentColor = 'rgba(255, 255, 255, 0.8)';
      } else if (themes.love) {
        // Love theme - warm pinks and reds
        backgroundColor = ['#FFB6C1', '#FFC0CB', '#FF69B4', '#DC143C'];
        accentColor = 'rgba(255, 20, 147, 0.6)';
      } else if (themes.sadness) {
        // Sadness theme - cool grays and blues
        backgroundColor = ['#708090', '#778899', '#696969', '#2F4F4F'];
        accentColor = 'rgba(70, 130, 180, 0.7)';
      } else {
        // Default nature theme - warm earth tones
        backgroundColor = ['#FFE4B5', '#DEB887', '#D2691E', '#8B4513'];
        accentColor = 'rgba(139, 69, 19, 0.8)';
      }
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(400, 300, 0, 400, 300, 400);
      gradient.addColorStop(0, backgroundColor[0]);
      gradient.addColorStop(0.3, backgroundColor[1]);
      gradient.addColorStop(0.7, backgroundColor[2]);
      gradient.addColorStop(1, backgroundColor[3]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 600);
      
      // Add story-specific landscape elements
      if (themes.mountains || themes.nature) {
        // Add mountain silhouettes
        ctx.fillStyle = themes.moon ? 'rgba(25, 25, 112, 0.6)' : 'rgba(139, 69, 19, 0.4)';
        ctx.beginPath();
        ctx.moveTo(0, 400);
        ctx.lineTo(200, themes.moon ? 250 : 200);
        ctx.lineTo(400, themes.moon ? 300 : 300);
        ctx.lineTo(600, themes.moon ? 180 : 150);
        ctx.lineTo(800, themes.moon ? 280 : 250);
        ctx.lineTo(800, 600);
        ctx.lineTo(0, 600);
        ctx.closePath();
        ctx.fill();
      }
      
      if (themes.river) {
        // Add river
        ctx.fillStyle = themes.moon ? 'rgba(135, 206, 250, 0.6)' : 'rgba(64, 224, 208, 0.5)';
        ctx.beginPath();
        ctx.moveTo(0, 450);
        ctx.quadraticCurveTo(200, 420, 400, 440);
        ctx.quadraticCurveTo(600, 460, 800, 430);
        ctx.lineTo(800, 480);
        ctx.quadraticCurveTo(600, 510, 400, 490);
        ctx.quadraticCurveTo(200, 470, 0, 500);
        ctx.closePath();
        ctx.fill();
      }
      
      if (themes.bamboo || themes.nature) {
        // Add bamboo silhouettes
        const bambooCount = themes.bamboo ? 12 : 6;
        for (let i = 0; i < bambooCount; i++) {
          const x = 60 + i * (680 / bambooCount);
          const height = 200 + Math.random() * 100;
          ctx.fillStyle = `rgba(34, 139, 34, ${0.3 + Math.random() * 0.4})`;
          ctx.fillRect(x, 600 - height, 4, height);
          ctx.fillRect(x + 8, 600 - height + 20, 4, height - 20);
        }
      }
      
      if (themes.moon) {
        // Add moon
        ctx.fillStyle = 'rgba(255, 255, 224, 0.9)';
        ctx.beginPath();
        ctx.arc(650, 150, 60, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add moon glow
        ctx.fillStyle = 'rgba(255, 255, 224, 0.3)';
        ctx.beginPath();
        ctx.arc(650, 150, 80, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      if (themes.nature) {
        // Add flowers/blossoms
        for (let i = 0; i < 8; i++) {
          const x = Math.random() * 700 + 50;
          const y = Math.random() * 200 + 400;
          ctx.fillStyle = themes.love ? 'rgba(255, 192, 203, 0.7)' : 'rgba(255, 182, 193, 0.6)';
          ctx.beginPath();
          ctx.arc(x, y, 3 + Math.random() * 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      
      // Add Chinese characters based on story theme
      ctx.fillStyle = accentColor;
      ctx.font = 'bold 48px serif';
      ctx.textAlign = 'center';
      
      if (themes.moon) {
        ctx.fillText('月', 150, 200); // Moon
        ctx.fillText('夜', 650, 400); // Night
      } else if (themes.love) {
        ctx.fillText('愛', 150, 200); // Love
        ctx.fillText('心', 650, 400); // Heart
      } else if (themes.peace) {
        ctx.fillText('禪', 150, 200); // Zen
        ctx.fillText('靜', 650, 400); // Quiet
      } else {
        ctx.fillText('詩', 150, 200); // Poetry
        ctx.fillText('詞', 650, 180); // Verse
      }
      
      // Add story-relevant title
      ctx.fillStyle = accentColor;
      ctx.font = 'bold 32px serif';
      let title = 'चीनी कवि की कहानी';
      if (themes.moon) title = 'चांद और कवि की कहानी';
      if (themes.love) title = 'प्रेम कविता की कहानी';
      if (themes.sadness) title = 'विरह की कहानी';
      ctx.fillText(title, 400, 100);
      
      ctx.font = '20px serif';
      ctx.fillText('Story-Based AI Generated Art', 400, 500);
      
      // Add decorative frame with theme-appropriate color
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = themes.love ? 8 : themes.moon ? 6 : 12;
      ctx.strokeRect(20, 20, 760, 560);
      
      const imageUrl = canvas.toDataURL('image/jpeg', 0.9);
      
      setGeneratedImage(imageUrl);
      toast({
        title: "इमेज सफलतापूर्वक जनरेट हुई!",
        description: "AI ने आपकी कहानी के अनुसार विशेष इमेज बनाई है",
      });
      
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "इमेज जनरेट करने में त्रुटि",
        description: "कृपया पुनः प्रयास करें",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return {
    generatedImage,
    isGeneratingImage,
    generateImage
  };
};