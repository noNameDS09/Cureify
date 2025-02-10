'use client'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
            Home
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            onClick={()=> router.push("/chatbot")}
          >
            ChatBot
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Tabs>
  );
}
