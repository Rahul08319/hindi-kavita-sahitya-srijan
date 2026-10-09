import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  PenTool, 
  Palette, 
  BookOpen, 
  Share2, 
  Moon, 
  Sun, 
  Github, 
  Feather, 
  Calendar,
  Compass,
  Heart,
  Layers
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useStoryGenerator } from "@/hooks/useStoryGenerator";
import { useImageGenerator, ArtStyle } from "@/hooks/useImageGenerator";
import { useFacebookPoster } from "@/hooks/useFacebookPoster";
import { getDynamicYearData } from "@/lib/dynamicYear";

import { AppleBentoGrid } from "@/components/AppleBentoGrid";
import { StoryTab } from "@/components/StoryTab";
import { ImageTab } from "@/components/ImageTab";
import { LibraryTab } from "@/components/LibraryTab";
import { SocialTab } from "@/components/SocialTab";

const Index = () => {
  const dynamicData = getDynamicYearData();
  const [activeTab, setActiveTab] = useState("generate");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const {
    generatedStory,
    literatureDetail,
    isGeneratingStory,
    isPlayingAudio,
    generateStory,
    toggleSpeechRecitation,
    setGeneratedStory,
  } = useStoryGenerator();

  const {
    generatedImage,
    isGeneratingImage,
    selectedStyle,
    setSelectedStyle,
    generateImage,
    downloadImage,
  } = useImageGenerator();

  const {
    isPosting,
    facebookToken,
    pageId,
    setPageId,
    setFacebookToken,
    postToFacebook,
    shareViaWebShare,
    shareToWhatsApp,
    shareToTwitter,
    shareToTelegram,
    copyToClipboard,
  } = useFacebookPoster();

  // Dark Mode Initialization & Sync
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || 
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSendToArtStudio = (text: string, title?: string) => {
    setActiveTab("image");
    generateImage(text, selectedStyle, title);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] dark:bg-[#000000] dark:text-[#f5f5f7] transition-colors duration-300">
      
      {/* 1. Apple Frosted Glass Sticky Navigation Header */}
      <header className="apple-glass sticky top-0 z-50 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-rose-600 flex items-center justify-center text-white shadow-sm shadow-orange-500/20">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base md:text-lg tracking-tight font-hindi-display text-neutral-900 dark:text-white flex items-center gap-2">
                हिंदी कविता साहित्य सृजन
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  {dynamicData.currentYearDevanagari}
                </span>
              </span>
              <span className="hidden md:block text-[11px] text-neutral-500 dark:text-neutral-400 -mt-0.5">
                Apple HIG Design • Hindi Literature & AI Art Studio
              </span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="h-9 w-9 p-0 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
              title="डार्क/लाइट मोड बदलें"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </Button>

            {/* GitHub Repo Pill */}
            <a
              href="https://github.com/Rahul08319/hindi-kavita-sahitya-srijan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-medium bg-black/[0.04] dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-200 hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.06] dark:border-white/[0.08] transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        
        {/* 2. Hero Header with Apple Clarity & Deference */}
        <section className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-500/20 mb-4 animate-ambient-float">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>सृजन वर्ष {dynamicData.currentYear} • विक्रम संवत {dynamicData.vikramSamvat} • सदैव अद्यतन</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4 font-hindi-display leading-tight">
            काव्य, कल्पना और कलारूप का <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
              आधुनिक डिजिटल संगम
            </span>
          </h1>

          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-hindi-serif">
            हिंदी साहित्य के अमर कवियों, दोहों, छंदों, एवं चीनी क्लासिक्स से प्रेरित होकर नवीन रचनाएं बनाएं, 
            शाही पाण्डुलिपि शैली में यथार्थवादी पोस्टर जनरेट करें और एक क्लिक में साझा करें।
          </p>
        </section>

        {/* 3. Daily Bento Grid (Auto-updated daily for coming years!) */}
        <AppleBentoGrid
          onSelectPoemForArt={(text, title) => handleSendToArtStudio(text, title)}
          onNavigateToTab={(tab) => setActiveTab(tab)}
        />

        {/* 4. Main Interactive Tabs */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            
            {/* Apple Segmented Control Pill List */}
            <div className="flex justify-center mb-8">
              <TabsList className="p-1.5 h-auto rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-xl grid grid-cols-2 sm:grid-cols-4 gap-1 w-full max-w-2xl">
                
                <TabsTrigger
                  value="generate"
                  className="rounded-full py-2.5 px-4 text-xs font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>काव्य सृजन</span>
                </TabsTrigger>

                <TabsTrigger
                  value="image"
                  className="rounded-full py-2.5 px-4 text-xs font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>चित्रशाला</span>
                </TabsTrigger>

                <TabsTrigger
                  value="library"
                  className="rounded-full py-2.5 px-4 text-xs font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>ग्रंथावली</span>
                </TabsTrigger>

                <TabsTrigger
                  value="social"
                  className="rounded-full py-2.5 px-4 text-xs font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>साझाकरण</span>
                </TabsTrigger>

              </TabsList>
            </div>

            {/* Tab 1: Story / Literature Generator */}
            <TabsContent value="generate" className="outline-none">
              <StoryTab
                generatedStory={generatedStory}
                literatureDetail={literatureDetail}
                isGeneratingStory={isGeneratingStory}
                isPlayingAudio={isPlayingAudio}
                onGenerateStory={generateStory}
                onToggleSpeech={toggleSpeechRecitation}
                onSendToArtStudio={handleSendToArtStudio}
              />
            </TabsContent>

            {/* Tab 2: Realistic Aesthetic Canvas Art Studio */}
            <TabsContent value="image" className="outline-none">
              <ImageTab
                generatedImage={generatedImage}
                isGeneratingImage={isGeneratingImage}
                generatedStory={generatedStory}
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
                onGenerateImage={generateImage}
                onDownloadImage={downloadImage}
              />
            </TabsContent>

            {/* Tab 3: Classic Poetry & Masters Library */}
            <TabsContent value="library" className="outline-none">
              <LibraryTab
                onSelectPoemForArt={handleSendToArtStudio}
              />
            </TabsContent>

            {/* Tab 4: Social Sharing & Facebook API */}
            <TabsContent value="social" className="outline-none">
              <SocialTab
                generatedStory={generatedStory}
                generatedImage={generatedImage}
                isPosting={isPosting}
                facebookToken={facebookToken}
                pageId={pageId}
                onFacebookTokenChange={setFacebookToken}
                onPageIdChange={setPageId}
                onPostToFacebook={postToFacebook}
                onShareWeb={shareViaWebShare}
                onShareWhatsApp={shareToWhatsApp}
                onShareTwitter={shareToTwitter}
                onShareTelegram={shareToTelegram}
                onCopyText={copyToClipboard}
              />
            </TabsContent>

          </Tabs>
        </div>

      </main>

      {/* 5. Apple Minimalist Footer */}
      <footer className="mt-20 border-t border-black/[0.06] dark:border-white/[0.08] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500 dark:text-neutral-400">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="font-hindi-display font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
              हिंदी कविता साहित्य सृजन
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span>
              © 2024–{dynamicData.currentYear} सर्वहक्क सुरक्षित (All Rights Reserved)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-hindi-serif">
            <span className="italic text-neutral-400">
              "काव्यम् यशसेऽर्थकृते व्यवहारविदे शिवेतरक्षतये"
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Rahul08319/hindi-kavita-sahitya-srijan"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-600 transition-colors"
            >
              GitHub रिपॉजिटरी
            </a>
            <span className="opacity-40">•</span>
            <span>Apple Design Standards</span>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Index;