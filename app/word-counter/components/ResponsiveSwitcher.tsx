"use client";
import { useState, useEffect } from "react";
import { TextProvider } from "@/context/TextContext";
import LeftPanel from "@/app/word-counter/components/LeftPanel";
import RightPanel from "@/app/word-counter/components/RightPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Loader2 } from "lucide-react";

const ResponsiveSwitcher = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const checkMobile = useIsMobile();

  useEffect(() => {
    setIsMobile(checkMobile);
  }, [checkMobile]);

  // 初回のサーバーサイド描画では、空の要素を返す
  if (isMobile === null) {
    return (
      <div className="flex justify-center space-x-4 items-center h-screen w-screen">
        <Loader2 className="animate-spin" />
        <h2 className="text-xl">ローディング中...</h2>
      </div>
    );
  }

  return (
    <TextProvider>
      {isMobile ? (
        <Tabs defaultValue="counter" className="px-4">
          <TabsContent
            value="counter"
            forceMount
            className="data-[state=inactive]:hidden w-full h-full"
          >
            <LeftPanel />
          </TabsContent>
          <TabsContent
            value="chat"
            forceMount
            className="data-[state=inactive]:hidden"
          >
            <RightPanel />
          </TabsContent>
          <TabsList className="w-full grid grid-cols-2 mt-4 fixed bottom-1 left-0">
            <TabsTrigger value="counter">文字数カウント</TabsTrigger>
            <TabsTrigger value="chat">AIチャット</TabsTrigger>
          </TabsList>
        </Tabs>
      ) : (
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={50} minSize={35}>
              <LeftPanel />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={35}>
              <RightPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </TextProvider>
  );
};

export default ResponsiveSwitcher;
