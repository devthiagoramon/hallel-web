import api from "@/api/api";
import type { SignInDTO, SignUpDTO, UserProfileInfos } from "@/types/dtoTypes";
import { loadTokenAPI } from "@/utils/mainUtils";

export const signInService = async (dto: SignInDTO) => {
  try {
    const response = await api.post("/auth/sign-up", {
      name: dto.name,
      email: dto.email,
      password: dto.password
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserInfosByTokenService = async (token: string) : Promise<UserProfileInfos> => {
  try{
    const response = await api.get(`/public/user/profile/token/${token}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.description);
  }
}

export const signUpService = async (dto: SignUpDTO) => {
  try {
    const response = await api.post("/auth/login", dto);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.description);
  }
};

export const isTokenExpiredService = async () => {
  try {
    const token = loadTokenAPI();
    const response = await api.get(
      `/auth/validate-token?token=${token}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
