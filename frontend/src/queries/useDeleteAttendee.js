import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosRes } from "../api/axiosDefaults";

export function useDeleteAttendee(eventId) {
  const queryClient = useQueryClient();

  const { mutate: deleteAttendee, isLoading: deleteAttendeeIsLoading } =
    useMutation({
      mutationFn: async (attendeeId) => {
        await axiosRes.delete(`events/event-attendees/${attendeeId}/`);
      },
      onSuccess: () => {
        try {

        queryClient.setQueryData(["events", `${eventId}`], (prevEvent) => {
          return prevEvent
            ? {
                ...prevEvent,
                attendee_id: null,
                attendee_count: prevEvent.attendee_count - 1,
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
                        attendee_id: null,
                        attendee_count: event.attendee_count - 1,
                      }
                    : event;
                }),
              };
            }
          }
          return prevEvents;
        });
      } catch (err) {
        console.log(err);}
      },
    });

  return { deleteAttendee, deleteAttendeeIsLoading };
}
