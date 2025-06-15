import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface StoryTabProps {
  generatedStory: string;
  isGeneratingStory: boolean;
  onGenerateStory: (prompt: string) => void;
}

export const StoryTab = ({ generatedStory, isGeneratingStory, onGenerateStory }: StoryTabProps) => {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    onGenerateStory(prompt);
  };

  return (
    <div className="space-y-6">
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
            onClick={handleGenerate} 
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
    </div>
  );
};