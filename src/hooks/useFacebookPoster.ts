import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const useFacebookPoster = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [facebookToken, setFacebookToken] = useState("");

  const postToFacebook = async (generatedStory: string) => {
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

  return {
    isPosting,
    facebookToken,
    setFacebookToken,
    postToFacebook
  };
};