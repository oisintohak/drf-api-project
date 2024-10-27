import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../api/axiosDefaults";

const useEvent = (id) => {
  return useQuery({
    queryKey: ["events", `${id}`],
    queryFn: async () => {
      const { data } = await axiosReq.get(`events/${id}/`);
      return data;
    },
  });
};

export default useEvent;
