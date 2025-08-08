import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "../queryConsts";
import { getMembroInfoService } from "@/api/user/userAPI";
import { loadTokenAPI } from "@/utils/mainUtils";

export const useListProfileInfos = () => {
    return useQuery({
        queryKey: [QUERIES.PROFILE_INFOS],
        queryFn: async () => {
            return await getMembroInfoService(loadTokenAPI());
        }
    })
}