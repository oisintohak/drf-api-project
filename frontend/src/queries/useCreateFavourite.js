import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosRes } from "../api/axiosDefaults";

export function useCreateFavourite(eventId) {
  const queryClient = useQueryClient();

  const { mutate: createFavourite, isLoading: favouriteIsLoading } =
    useMutation({
      mutationFn: async () => {
        const { data } = await axiosRes.post("events/event-favourites/", {
          event: eventId,
        });
        return data;
      },
      onSuccess: (data) => {
        queryClient.setQueryData(["events", `${eventId}`], (prevEvent) => {
          return prevEvent
            ? {
                ...prevEvent,
                favourite_id: data.id,
                favourite_count: prevEvent.favourite_count + 1,
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
                        favourite_id: data.id,
                        favourite_count: event.favourite_count + 1,
                      }
                    : event;
                }),
              };
            }
          }
          return prevEvents;
        });
      },
    });

  return { favouriteIsLoading, createFavourite };
}
