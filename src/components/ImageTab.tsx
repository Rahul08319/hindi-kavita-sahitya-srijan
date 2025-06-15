import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

interface ImageTabProps {
  generatedImage: string;
  isGeneratingImage: boolean;
  generatedStory: string;
  onGenerateImage: () => void;
}

export const ImageTab = ({ generatedImage, isGeneratingImage, generatedStory, onGenerateImage }: ImageTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5 text-orange-600" />
            AI इमेज जेनेरेशन
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            कहानी के विषय और भावनाओं के आधार पर विशेष AI इमेज बनाई जाएगी
          </p>
          <Button 
            onClick={onGenerateImage} 
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
    </div>
  );
};