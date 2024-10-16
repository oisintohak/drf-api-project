import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../api/axiosDefaults";

export const useEvents = (query, date, filter) => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await axiosReq.get(
        `/events/?search=${query ? query : ""}&date=${date ? date : ""}${filter ? filter : ""}`
      );
      return data;
    },
  });
}
