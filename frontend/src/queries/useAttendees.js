import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../api/axiosDefaults";

const useAttendees = (eventId) => {
  return useQuery({
    queryKey: ["attendees", `${eventId}`],
    queryFn: async () => {
      const {data} = await axiosReq.get(`attendees/?event=${eventId}`);
      return data;
    },
  });
};

export default useAttendees;
