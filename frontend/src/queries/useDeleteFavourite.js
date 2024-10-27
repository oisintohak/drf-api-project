import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosRes } from "../api/axiosDefaults";

export function useDeleteFavourite(eventId) {
  const queryClient = useQueryClient();

  const { mutate: deleteFavourite, isLoading: deleteFavouriteIsLoading } =
    useMutation({
      mutationFn: async (favouriteId) => {
        await axiosRes.delete(`favourites/${favouriteId}/`);
      },
      onSuccess: () => {
        queryClient.setQueryData(["events", `${eventId}`], (prevEvent) => {
          return prevEvent
            ? {
                ...prevEvent,
                favourite_id: null,
                favourite_count: prevEvent.favourite_count - 1,
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
                        favourite_id: null,
                        favourite_count: event.favourite_count - 1,
                      }
                    : event;
                })
              }
              
            }
          }
          return prevEvents;
        });
      },
    });

  return { deleteFavourite, deleteFavouriteIsLoading };
}
