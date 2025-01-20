import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarEventsRes } from "../types";
import Lucide from "@/components/base/lucide";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  event: CalendarEventsRes;
  onDeleteEvent: (id: number) => Promise<void>;
};
const CalendarEventInfoDialog = ({
  isOpen,
  onClose,
  event,
  onEdit,
  onDeleteEvent,
}: ComponentProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          <Lucide icon="Calendar" className="w-6 h-6 mr-2" />
          <div className="mb-5">
            <div className="text-xl font-bold">{event?.title}</div>
            <div className="text-base font-light">{event?.description}</div>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-success/70"></div>
          <div className="ml-2.5">Starts 12th Nov, 2024</div>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-danger/70"></div>
          <div className="ml-2.5">Ends 12th Nov, 2024</div>
        </div>
        <div className="flex mt-4">
          <Lucide icon="Calendar" className="w-5 h-5 mr-2" />
          <span>Location</span>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};

export default CalendarEventInfoDialog;
