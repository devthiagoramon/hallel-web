import api from "@/api/api";
import type { EditProfileDTO } from "@/types/dtoTypes";

export const getMembroInfoService = async (token: string | null) => {
  try {
    const response = await api(
      `/public/user/profile/token/${token}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't get membro info");
  }
};

export const editMembroInfoService = async (dto: EditProfileDTO) => {
  try {
    const response = await api.put(
      `/user/edit-profile/${dto.id}`,
      dto,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't edit membro info");
  }
};

export const editMembroProfilePicture = async (
  userId: string,
  file: File,
) => {
  try {
    const data = new FormData();
    data.append("file", file);
    const response = await api.patch(
      `/user/edit-profile/image/${userId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't edit membro info");
  }
};
