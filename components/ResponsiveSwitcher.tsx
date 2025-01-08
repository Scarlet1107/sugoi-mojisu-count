"use client";
import { TextProvider } from "@/context/TextContext";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const ResponsiveSwitcher = () => {
  const isMobile = useIsMobile();
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
