import api from "@/api/api";
import type { ListEventsAdmDTO } from "@/types/admDTOTypes";
import { loadTokenAPI } from "@/utils/mainUtils";

export const listEventsAscAdmService = async (): Promise<
  ListEventsAdmDTO[] | undefined
> => {
  try {
    const response = await api.get("/public/event/list-all/title/asc");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't get the events from API");
  }
};

export const adicionarEventAdmService = async (data: FormData) => {
  try {
    const response = await api.post(
      "/admin/event/create",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't add the event into API");
  }
};
export const editarEventAdmService = async (
  idEvento: string,
  dto: FormData,
) => {
  try {
    const response = await api.patch(
      `/admin/event/edit/${idEvento}`,
      dto
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't add the event into API");
  }
};

export const listEventByIdAdmService = async (
  idEvento: string,
): Promise<ListEventsAdmDTO | undefined> => {
  try {
    const response = await api.get(
      `/administrador/eventos/${idEvento}/list`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't list the event by id from API");
  }
};

export const deleteEventAdmService = async (idEvento: string) => {
  try {
    const response = await api.delete(
      `/administrador/eventos/${idEvento}/delete`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Can't delete the event from API");
  }
};
