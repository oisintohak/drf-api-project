import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosRes } from "../api/axiosDefaults";

export function useCreateAttendee(eventId) {
  const queryClient = useQueryClient();

  const { mutate: createAttendee, isLoading: attendeeIsLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosRes.post("events/event-attendees/", {
        event: eventId,
      });
      return data;
    },
    onSuccess: (data) => {
      try {

        queryClient.setQueryData(["events", `${eventId}`], (prevEvent) => {
          return prevEvent
            ? {
                ...prevEvent,
                attendee_id: data.id,
                attendee_count: prevEvent.attendee_count + 1,
              }
            : prevEvent;
        });
        queryClient.setQueryData(["events"], (prevEvents) => {
          if (prevEvents) {
            if (typeof prevEvents.results?.map === "function") {
              return {
                ...prevEvents,
                results: prevEvents.results.map((event) => {
                  return event.id === eventId
                    ? {
                        ...event,
                        attendee_id: data.id,
                        attendee_count: event.attendee_count + 1,
                      }
                    : event;
                }),
              };
            }
          }
          return prevEvents;
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return { createAttendee, attendeeIsLoading };
}
