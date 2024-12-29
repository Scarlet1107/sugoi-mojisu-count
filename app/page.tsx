import Header from "@/components/Header";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-gray-100">
      <Header />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <LeftPanel />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <RightPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
