import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/api/user";

const useFetchCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
};

export default useFetchCurrentUser;
