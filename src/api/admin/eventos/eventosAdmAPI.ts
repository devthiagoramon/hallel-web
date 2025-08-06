import api from "@/api/api";
import { ListEventsAdmDTO } from "@/types/admDTOTypes";
import { loadTokenAPI } from "@/utils/mainUtils";

export const listEventsAscAdmService = async (): Promise<
  ListEventsAdmDTO[] | undefined
> => {
  try {
    const response = await api.get("/administrador/eventos/asc", {
      headers: {
        Authorization: loadTokenAPI(),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't get the events from API");
  }
};

export const adicionarEventAdmService = async (data: FormData) => {
  try {
    const response = await api.post(
      "/administrador/eventos/create",
      data,
      {
        headers: {
          Authorization: loadTokenAPI(),
          "Content-Type": "multipart/form-data",
        },
      },
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
      `/administrador/eventos/${idEvento}/edit`,
      dto,
      {
        headers: {
          Authorization: loadTokenAPI(),
          "Content-Type": "multipart/form-data",
        },
      },
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
      `/administrador/eventos/${idEvento}/list`,
      {
        headers: {
          Authorization: loadTokenAPI(),
        },
      },
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
      {
        headers: {
          Authorization: loadTokenAPI(),
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("Can't delete the event from API");
  }
};
