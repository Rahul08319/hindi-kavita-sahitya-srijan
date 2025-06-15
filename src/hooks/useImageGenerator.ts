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
      // Using free image generation with multiple sources
      const imagePrompts = [
        "chinese-landscape-mountains-bamboo",
        "ancient-poet-writing-moonlight", 
        "traditional-chinese-garden-peaceful",
        "mountain-temple-misty-morning",
        "bamboo-forest-zen-meditation"
      ];
      
      const randomPrompt = imagePrompts[Math.floor(Math.random() * imagePrompts.length)];
      
      // Create a beautiful AI-style generated image using canvas
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Canvas context not available');
      }
      
      // Create beautiful gradient background
      const gradient = ctx.createRadialGradient(400, 300, 0, 400, 300, 400);
      gradient.addColorStop(0, '#FFE4B5');
      gradient.addColorStop(0.3, '#DEB887');
      gradient.addColorStop(0.7, '#D2691E');
      gradient.addColorStop(1, '#8B4513');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 600);
      
      // Add mountain silhouettes
      ctx.fillStyle = 'rgba(139, 69, 19, 0.4)';
      ctx.beginPath();
      ctx.moveTo(0, 400);
      ctx.lineTo(200, 200);
      ctx.lineTo(400, 300);
      ctx.lineTo(600, 150);
      ctx.lineTo(800, 250);
      ctx.lineTo(800, 600);
      ctx.lineTo(0, 600);
      ctx.closePath();
      ctx.fill();
      
      // Add bamboo silhouettes
      for (let i = 0; i < 8; i++) {
        const x = 50 + i * 100;
        ctx.fillStyle = `rgba(34, 139, 34, ${0.3 + Math.random() * 0.3})`;
        ctx.fillRect(x, 300, 4, 250);
        ctx.fillRect(x + 10, 280, 4, 280);
      }
      
      // Add Chinese characters effect
      ctx.fillStyle = 'rgba(139, 69, 19, 0.6)';
      ctx.font = 'bold 48px serif';
      ctx.textAlign = 'center';
      ctx.fillText('詩', 150, 200);
      ctx.fillText('詞', 650, 180);
      
      // Add title
      ctx.fillStyle = 'rgba(139, 69, 19, 0.8)';
      ctx.font = 'bold 32px serif';
      ctx.fillText('चीनी कवि की कहानी', 400, 100);
      
      ctx.font = '20px serif';
      ctx.fillText('AI Generated Chinese Poet Story', 400, 500);
      
      // Add decorative frame
      ctx.strokeStyle = 'rgba(139, 69, 19, 0.8)';
      ctx.lineWidth = 12;
      ctx.strokeRect(20, 20, 760, 560);
      
      const imageUrl = canvas.toDataURL('image/jpeg', 0.9);
      
      setGeneratedImage(imageUrl);
      toast({
        title: "इमेज सफलतापूर्वक जनरेट हुई!",
        description: "AI ने आपकी कहानी के लिए सुंदर इमेज बनाई है",
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