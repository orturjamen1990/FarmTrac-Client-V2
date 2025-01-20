import axios from "@/api/axios";
import { AxiosResponseWrapper } from "@/types/global";
import {
  CalendarEventsRes,
  UpdateCalendarEventReq,
  CreateCalendarEventReq,
} from "../types";

const CALENDAR_EVENTS_RESOURCE = "calendar-events";

function getCalendarEvents(): AxiosResponseWrapper<CalendarEventsRes[]> {
  const url = `/${CALENDAR_EVENTS_RESOURCE}/all`;
  return axios.get(url);
}

function getCalendarEventById(
  id: number
): AxiosResponseWrapper<CalendarEventsRes> {
  const url = `/${CALENDAR_EVENTS_RESOURCE}/${id}`;
  return axios.get(url);
}

function deleteCalendarEvent(id: number) {
  const url = `/${CALENDAR_EVENTS_RESOURCE}/${id}`;
  return axios.delete(url);
}

function updateCalendarEvent(id: number, request: UpdateCalendarEventReq) {
  const url = `/${CALENDAR_EVENTS_RESOURCE}/${id}`;
  return axios.put(url, request);
}

function createCalendarEvent(request: CreateCalendarEventReq) {
  const url = `/${CALENDAR_EVENTS_RESOURCE}/add`;
  return axios.post(url, request);
}

export default {
  getCalendarEvents,
  getCalendarEventById,
  deleteCalendarEvent,
  updateCalendarEvent,
  createCalendarEvent,
};
