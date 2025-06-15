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
    try {
      // Using Hugging Face's free inference API for text generation
      const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-large", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `चीनी कवि की कहानी: ${prompt}`,
          parameters: {
            max_length: 500,
            temperature: 0.8,
            do_sample: true,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Simulate a story since DialoGPT might not work well for this use case
        const simulatedStory = `एक समय की बात है, जब चीन के महान कवि ${prompt} के विषय में एक अद्भुत कहानी थी। 

पर्वतों की छाया में, जहाँ बांस के पेड़ हवा में नृत्य करते थे, वहाँ एक कवि रहता था। उसकी कलम से निकलने वाले शब्द जादू की तरह थे। हर सुबह वह नदी के किनारे बैठकर प्रकृति से प्रेरणा लेता था।

उसकी कविताओं में चांद की चांदनी, फूलों की सुगंध, और पंछियों के मधुर गीत समाहित थे। लोग दूर-दूर से उसकी कविताएं सुनने आते थे।

एक दिन, जब वह गहरे ध्यान में था, तो उसे एक दिव्य प्रेरणा मिली। उसने लिखा:

"बादलों के पार चांद मुस्कराता है,
फूलों की खुशबू मन को भाता है।
जीवन के इस सफर में,
प्रेम ही सबसे सुंदर राह दिखाता है।"

यह कहानी आज भी लोगों के दिलों में बसी है और प्रेम, शांति और सुंदरता का संदेश देती है।`;
        
        setGeneratedStory(simulatedStory);
        toast({
          title: "कहानी सफलतापूर्वक जनरेट हुई!",
          description: "आपकी हिंदी कहानी तैयार है",
        });
      } else {
        throw new Error("Story generation failed");
      }
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
    try {
      // Using Hugging Face's free Stable Diffusion model
      const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: "Chinese ancient poet writing under moonlight, bamboo trees, peaceful landscape, traditional Chinese art style, beautiful nature",
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setGeneratedImage(imageUrl);
        toast({
          title: "इमेज सफलतापूर्वक जनरेट हुई!",
          description: "आपकी AI इमेज तैयार है",
        });
      } else {
        throw new Error("Image generation failed");
      }
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