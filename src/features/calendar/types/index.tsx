export interface CalendarEventsReq {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
}

export interface CalendarEventsRes {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  vechicleId?: number;
  growingAreaId?: number;
}

export type CreateCalendarEventReq = Omit<CalendarEventsReq, "id">;
export type UpdateCalendarEventReq = CalendarEventsReq;
