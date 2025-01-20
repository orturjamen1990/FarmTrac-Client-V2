import { Button } from "@/components/ui/button";
import Calendar from "@/components/base/calendar";
import Lucide from "@/components/base/lucide";
import CalendarEventInfoDialog from "./components/CalendarEventInfoDialog";
import { useEffect, useState } from "react";
import CalendarEventEditorDialog from "./components/CalendarEventEditorDialog";
import { CalendarEventsRes } from "./types";
import calendarEventsService from "./services/calendarEventsService";
import { EventInput } from "@fullcalendar/core/index.js";

const Main = () => {
  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [editorDialogOpen, setEditorDialogOpen] = useState<boolean>(false);
  const [event, setEvent] = useState<any>();
  const [events, setEvents] = useState<CalendarEventsRes[]>([]);
  const [calenderEvents, setCalenderEvents] = useState<EventInput[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onEventClick = (info: any) => {
    const event = info.event as EventInput;
    const getEvent = events.find((item) => item.id === event.extendedProps?.id);
    if (!getEvent) return;
    setEvent(getEvent);
    setInfoDialogOpen(true);
  };

  const onEditEvent = () => {
    setInfoDialogOpen(false);
    setTimeout(() => {
      setEditorDialogOpen(true);
    }, 300);
  };

  const onDeleteEvent = async (eventId: number) => {
    await calendarEventsService.deleteCalendarEvent(eventId);
    await fetchData();
    onHideDialog();
  };

  const onHideDialog = () => {
    setEvent(undefined);
    setInfoDialogOpen(false);
  };

  const fetchData = async () => {
    const response = await calendarEventsService.getCalendarEvents();
    setCalenderEvents(mapCalenderEventsToEventInput(response.data.data));
    setEvents(response.data.data);
  };

  const mapCalenderEventsToEventInput = (events: CalendarEventsRes[]) => {
    return events.map((event) => {
      return {
        title: event.title,
        description: event.description,
        start: event.startTime,
        end: event.endTime,
        extendedProps: {
          id: event.id,
        },
      } as EventInput;
    });
  };

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      await fetchData();
      setIsLoading(false);
    }
    fetch();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            Calendar
          </div>
          <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            <Button onClick={() => setEditorDialogOpen(true)}>
              <Lucide icon="CopyPlus" className="stroke-[1.3] w-4 h-4 mr-3" />{" "}
              Add New Schedule
            </Button>
          </div>
        </div>
        <div className="mt-3.5 flex flex-col lg:flex-row gap-y-10 gap-x-6 justify-center items-center">
          <div className="flex flex-col w-full gap-y-7 items-center">
            <div className="flex flex-col w-full p-5 rounded-xl border bg-card text-card-foreground shadow max-w-7xl">
              {!isLoading && (
                <Calendar events={calenderEvents} eventClick={onEventClick} />
              )}
            </div>
          </div>
        </div>
      </div>
      <CalendarEventInfoDialog
        isOpen={infoDialogOpen}
        event={event}
        onClose={() => setInfoDialogOpen(false)}
        onEdit={onEditEvent}
        onDeleteEvent={onDeleteEvent}
      />
      <CalendarEventEditorDialog
        isOpen={editorDialogOpen}
        event={event}
        onClose={() => setEditorDialogOpen(false)}
        refetchEvents={fetchData}
      />
    </div>
  );
};

export default Main;
