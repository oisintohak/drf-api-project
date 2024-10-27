import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosRes } from "../api/axiosDefaults";

export function useCreateAttendee(eventId) {
  const queryClient = useQueryClient();

  const { mutate: createAttendee, isLoading: attendeeIsLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosRes.post("/attendees/", {
        event: eventId,
      });
      return data;
    },
    onSuccess: (data) => {
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
      queryClient.invalidateQueries({ queryKey: ["attendees", `${eventId}`] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { createAttendee, attendeeIsLoading };
}
