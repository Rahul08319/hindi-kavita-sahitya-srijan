import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Image, Share2, PenTool } from "lucide-react";
import { chinesePoets } from "@/data/chinesePoets";
import { useStoryGenerator } from "@/hooks/useStoryGenerator";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { useFacebookPoster } from "@/hooks/useFacebookPoster";
import { StoryTab } from "@/components/StoryTab";
import { ImageTab } from "@/components/ImageTab";
import { SocialTab } from "@/components/SocialTab";

const Index = () => {
  const { generatedStory, isGeneratingStory, generateStory } = useStoryGenerator();
  const { generatedImage, isGeneratingImage, generateImage } = useImageGenerator();
  const { isPosting, facebookToken, setFacebookToken, postToFacebook } = useFacebookPoster();

  const handleGenerateImage = () => {
    generateImage(generatedStory);
  };

  const handlePostToFacebook = () => {
    postToFacebook(generatedStory);
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

          <TabsContent value="generate">
            <StoryTab
              generatedStory={generatedStory}
              isGeneratingStory={isGeneratingStory}
              onGenerateStory={generateStory}
            />
          </TabsContent>

          <TabsContent value="image">
            <ImageTab
              generatedImage={generatedImage}
              isGeneratingImage={isGeneratingImage}
              generatedStory={generatedStory}
              onGenerateImage={handleGenerateImage}
            />
          </TabsContent>

          <TabsContent value="social">
            <SocialTab
              generatedStory={generatedStory}
              generatedImage={generatedImage}
              isPosting={isPosting}
              facebookToken={facebookToken}
              onFacebookTokenChange={setFacebookToken}
              onPostToFacebook={handlePostToFacebook}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;