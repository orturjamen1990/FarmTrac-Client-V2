import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarEventsRes } from "../types";
import { Button } from "@/components/ui/button";
import {
  Trash2Icon,
  PencilIcon,
  Calendar1Icon,
  MapPinIcon,
} from "lucide-react";
import Lucide from "@/components/Base/Lucide";

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center place-content-between mt-4">
            <span className="text-xl"> Manage Event</span>
            <div className="flex flex-row gap-2 ml-2">
              <Button onClick={onEdit} variant="outline" size="icon">
                <PencilIcon />
              </Button>
              <Button
                onClick={() => onDeleteEvent(event.id)}
                variant="destructive"
                size="icon"
              >
                <Trash2Icon />
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            Here, you can see all the details, like the title, date, and time.
            Need to make changes? You can easily update the event or delete it
            right from this screen.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center">
          <Calendar1Icon className="w-6 h-6 mr-2" />
          <div className="mb-5">
            <div className="text-xl font-bold">{event?.title}</div>
            <div className="text-base font-light">{event?.description}</div>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
          <div className="ml-2.5">Starts 12th Nov, 2024</div>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div className="ml-2.5">Ends 12th Nov, 2024</div>
        </div>
        <div className="flex mt-4">
          <MapPinIcon className="w-6 h-6 mr-2" />
          <span>Location</span>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};

export default CalendarEventInfoDialog;
