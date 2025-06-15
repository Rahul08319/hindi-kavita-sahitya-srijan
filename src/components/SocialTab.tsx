import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Globe } from "lucide-react";

interface SocialTabProps {
  generatedStory: string;
  generatedImage: string;
  isPosting: boolean;
  facebookToken: string;
  onFacebookTokenChange: (token: string) => void;
  onPostToFacebook: () => void;
}

export const SocialTab = ({ 
  generatedStory, 
  generatedImage, 
  isPosting, 
  facebookToken, 
  onFacebookTokenChange, 
  onPostToFacebook 
}: SocialTabProps) => {
  return (
    <div className="space-y-6">
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
              onChange={(e) => onFacebookTokenChange(e.target.value)}
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
            onClick={onPostToFacebook} 
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
    </div>
  );
};