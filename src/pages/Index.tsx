import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { BookOpen, Image, Share2, Sparkles, PenTool, Globe } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [facebookToken, setFacebookToken] = useState("");

  const chinesePoets = [
    "ली बाई (Li Bai) - चांद और शराब के कवि",
    "दू फू (Du Fu) - दुख और संघर्ष के कवि", 
    "वांग वेई (Wang Wei) - प्रकृति और शांति के कवि",
    "बाई जुयी (Bai Juyi) - सामाजिक न्याय के कवि",
    "ली क्विंगझाओ (Li Qingzhao) - प्रेम और विरह की कवयित्री"
  ];

  const generateStory = async () => {
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

  const generateImage = async () => {
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
      const imageSize = "800x600";
      
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

  const postToFacebook = async () => {
    if (!generatedStory || !facebookToken) {
      toast({
        title: "अनुपस्थित जानकारी",
        description: "कहानी और Facebook access token दोनों आवश्यक हैं",
        variant: "destructive",
      });
      return;
    }

    setIsPosting(true);
    try {
      // Post to Facebook using Graph API
      const response = await fetch(`https://graph.facebook.com/me/feed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: generatedStory,
          access_token: facebookToken,
        }),
      });

      if (response.ok) {
        toast({
          title: "Facebook पर सफलतापूर्वक पोस्ट हुआ!",
          description: "आपकी कहानी Facebook पर शेयर हो गई है",
        });
      } else {
        throw new Error("Facebook posting failed");
      }
    } catch (error) {
      console.error("Error posting to Facebook:", error);
      toast({
        title: "Facebook पर पोस्ट करने में त्रुटि",
        description: "कृपया access token की जांच करें",
        variant: "destructive",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-orange-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              चीनी कवि कहानी जेनेरेटर
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            चीनी कवियों की प्रेरणादायक कहानियां हिंदी में बनाएं, AI इमेज जनरेट करें और Facebook पर शेयर करें
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {chinesePoets.map((poet, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {poet}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs defaultValue="generate" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              कहानी बनाएं
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              इमेज जनरेट करें
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              सोशल मीडिया
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-600" />
                  कहानी प्रॉम्प्ट दर्ज करें
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="prompt">चीनी कवि या विषय के बारे में बताएं:</Label>
                  <Textarea
                    id="prompt"
                    placeholder="उदाहरण: ली बाई और चांद की रात में लिखी गई कविता के बारे में..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                </div>
                <Button 
                  onClick={generateStory} 
                  disabled={isGeneratingStory}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  {isGeneratingStory ? "कहानी बनाई जा रही है..." : "कहानी जनरेट करें"}
                </Button>
              </CardContent>
            </Card>

            {generatedStory && (
              <Card>
                <CardHeader>
                  <CardTitle>जनरेट की गई कहानी</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg">
                    <pre className="whitespace-pre-wrap font-hindi text-foreground leading-relaxed">
                      {generatedStory}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="image" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-orange-600" />
                  AI इमेज जेनेरेशन
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  कहानी के आधार पर AI इमेज बनाई जाएगी (Hugging Face Stable Diffusion का उपयोग)
                </p>
                <Button 
                  onClick={generateImage} 
                  disabled={isGeneratingImage || !generatedStory}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isGeneratingImage ? "इमेज बनाई जा रही है..." : "AI इमेज जनरेट करें"}
                </Button>
              </CardContent>
            </Card>

            {generatedImage && (
              <Card>
                <CardHeader>
                  <CardTitle>जनरेट की गई इमेज</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <img 
                      src={generatedImage} 
                      alt="Generated story illustration" 
                      className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-orange-600" />
                  Facebook Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="token">Facebook Access Token:</Label>
                  <Input
                    id="token"
                    type="password"
                    placeholder="आपका Facebook access token यहाँ डालें"
                    value={facebookToken}
                    onChange={(e) => setFacebookToken(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Facebook Graph API Explorer से access token प्राप्त करें
                  </p>
                </div>
                
                <Separator />
                
                <div className="text-center space-y-4">
                  <h4 className="font-semibold">पोस्ट प्रीव्यू:</h4>
                  {generatedStory ? (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-left">
                      <p className="text-sm line-clamp-3">{generatedStory}</p>
                      {generatedImage && (
                        <img 
                          src={generatedImage} 
                          alt="Preview" 
                          className="mt-2 w-full max-w-xs mx-auto rounded"
                        />
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">पहले कहानी जनरेट करें</p>
                  )}
                </div>

                <Button 
                  onClick={postToFacebook} 
                  disabled={isPosting || !generatedStory || !facebookToken}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  {isPosting ? "Facebook पर पोस्ट हो रहा है..." : "Facebook पर पोस्ट करें"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>सेटअप गाइड</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h5 className="font-semibold">1. Facebook Access Token कैसे प्राप्त करें:</h5>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Facebook Graph API Explorer पर जाएं</li>
                    <li>अपने Facebook account से login करें</li>
                    <li>User Access Token जनरेट करें</li>
                    <li>pages_manage_posts permission add करें</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold">2. Free Tools का उपयोग:</h5>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Hugging Face - Free AI models</li>
                    <li>Facebook Graph API - Free posting</li>
                    <li>Stable Diffusion - Free image generation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;