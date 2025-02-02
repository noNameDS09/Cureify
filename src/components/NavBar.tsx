'use client'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, House, PanelsTopLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter()
  return (
    <Tabs defaultValue="tab-1" className="flex justify-center items-center py-2 backdrop-blur-sm bg-slate-100"> 
      <ScrollArea>
        <TabsList className="mb-0 mt-1 gap-1 bg-transparent">
          <TabsTrigger
            value="tab-1"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            onClick={()=> router.push("/")}
          >
            {/* <House
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            /> */}
            Home
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            onClick={()=> router.push("/aboutus")}
          >
            {/* <PanelsTopLeft
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            /> */}
            About Us
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            onClick={()=> router.push("/chatbot")}
          >
            {/* <Box
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            /> */}
            ChatBot
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {/* <TabsContent value="tab-1">
        <p className="p-4 pt-1 text-center text-xs text-muted-foreground">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="p-4 pt-1 text-center text-xs text-muted-foreground">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab-3">
        <p className="p-4 pt-1 text-center text-xs text-muted-foreground">Content for Tab 3</p>
      </TabsContent> */}
    </Tabs>
  );
}
