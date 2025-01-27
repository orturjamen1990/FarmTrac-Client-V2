import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ContentSectionProps {
  title: string;
  desc: string;
  children: React.JSX.Element;
}

export default function ContentSection({
  title,
  desc,
  children,
}: ContentSectionProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-none">
        <h2 className="text-base font-semibold leading-7">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">{desc}</p>
      </div>
      <Separator className="my-4 flex-none" />
      <ScrollArea className="-mx-4 flex-1 scroll-smooth px-4 md:pb-16">
        <div className="lg:max-w-xl -mx-1 px-1.5">{children}</div>
      </ScrollArea>
    </div>
  );
}
