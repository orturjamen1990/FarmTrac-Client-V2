import "@/assets/css/vendors/full-calendar.css";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { CalendarOptions } from "@fullcalendar/core";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { ReactElement, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { format } from "date-fns";
import Lucide from "../Lucide";

type Props = {
  events: CalendarOptions["events"];
  eventClick?: CalendarOptions["eventClick"];
  onAddEvent: VoidFunction;
};

const GridViews = {
  Day: "timeGridDay",
  Week: "timeGridWeek",
  Month: "dayGridMonth",
  List: "listWeek",
} as const;

type GridViewsValue = (typeof GridViews)[keyof typeof GridViews];

function Main({ events, eventClick, onAddEvent }: Props) {
  const options: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    droppable: true,
    headerToolbar: false,
    initialDate: "2024-01-01",
    navLinks: true,
    editable: true,
    dayMaxEvents: true,
    events,

    drop: function (info) {
      if (
        document.querySelectorAll("#checkbox-events").length &&
        (document.querySelectorAll("#checkbox-events")[0] as HTMLInputElement)
          ?.checked
      ) {
        (info.draggedEl.parentNode as HTMLElement).remove();
        if (
          document.querySelectorAll("#calendar-events")[0].children.length == 1
        ) {
          document
            .querySelectorAll("#calendar-no-events")[0]
            .classList.remove("hidden");
        }
      }
    },
    eventClick,
  };
  const calendarRef = useRef<FullCalendar>();
  const [displayDate, setDisplayDate] = useState("");

  const handlePreviousClick = () => {
    const calendarAPI = calendarRef?.current?.getApi();
    calendarAPI?.prev();
  };

  const handleNextClick = () => {
    const calendarAPI = calendarRef?.current?.getApi();
    calendarAPI?.next();
  };

  const handleDayViewClick = (view: GridViewsValue) => {
    const calendarAPI = calendarRef?.current?.getApi();
    calendarAPI?.changeView(view);
  };

  const handleTodayClick = () => {
    const calendarAPI = calendarRef?.current?.getApi();
    calendarAPI?.today();
  };

  // Function to fetch and set the current date
  const updateCurrentDate = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const view = calendarApi.view;
      const viewType = view.type;
      const start = view.currentStart; // Start date of the view
      const end = view.currentEnd; // End date of the view

      let formattedDate = "";

      if (viewType === "timeGridDay") {
        // Format for day view
        formattedDate = format(start, "MMMM d, yyyy");
      } else if (viewType === "dayGridMonth") {
        // Format for month view
        formattedDate = format(start, "MMMM yyyy");
      } else if (viewType === "timeGridWeek" || viewType === "dayGridWeek") {
        // Format for week view
        formattedDate = `${format(start, "MMM d")} – ${format(end, "d, yyyy")}`;
      }

      setDisplayDate(formattedDate);
    }
  };

  // Trigger when the calendar's view changes
  const handleDatesSet = () => {
    updateCurrentDate();
  };

  useEffect(() => {
    updateCurrentDate(); // Set initial date
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-lg ring-1 ring-slate-900/10">
      <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
        <div>
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            <time dateTime="2022-01">{displayDate}</time>
          </h1>
        </div>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
              <div
                className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300"
                aria-hidden="true"
              />
              <button
                onClick={handlePreviousClick}
                type="button"
                className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={handleTodayClick}
                type="button"
                className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
              >
                Today
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
              <button
                onClick={handleNextClick}
                type="button"
                className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <ButtonGroup className="hidden md:ml-4 md:flex md:items-center">
            <Button
              onClick={() => handleDayViewClick("timeGridDay")}
              variant="outline"
            >
              Day
            </Button>
            <Button
              onClick={() => handleDayViewClick("timeGridWeek")}
              variant="outline"
            >
              Week
            </Button>
            <Button
              onClick={() => handleDayViewClick("dayGridMonth")}
              variant="outline"
            >
              Month
            </Button>
            <Button
              onClick={() => handleDayViewClick("listWeek")}
              variant="outline"
            >
              List
            </Button>
          </ButtonGroup>
          <div className="ml-6 h-6 w-px bg-gray-300" />
          <Button onClick={onAddEvent}>
            <Lucide icon="CopyPlus" className="stroke-[1.3] w-4 h-4 mr-3" /> Add
            Event
          </Button>
        </div>
      </header>
      <FullCalendar
        ref={calendarRef}
        {...options}
        aspectRatio={1.8}
        datesSet={handleDatesSet}
        // dayCellContent={({ date }) => {
        //   const today = new Date();
        //   const isToday =
        //     date.getFullYear() === today.getFullYear() &&
        //     date.getMonth() === today.getMonth() &&
        //     date.getDate() === today.getDate();

        //   // Return the props for FullCalendar's day number
        //   return {
        //     props: {
        //       class: isToday
        //         ? "bg-orange-500 text-white rounded-full px-2"
        //         : "",
        //     },
        //     text: date.getDate(), // Ensure the date number is displayed
        //   };
        // }}
      />
    </div>
  );
}

export default Main;
