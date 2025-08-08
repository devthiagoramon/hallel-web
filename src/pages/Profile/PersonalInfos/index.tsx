import { yupResolver } from "@hookform/resolvers/yup";
import {
  editMembroInfoService,
  editMembroProfilePicture,
} from "@/api/user/userAPI";
import ButtonH from "@/components/ButtonH";
import TextFieldH from "@/components/TextFieldH";
import TextFieldSelectImageH from "@/components/TextFieldH/TextFieldSelectImageH";
import dayjs from "dayjs";
import { PaperPlaneTilt } from "phosphor-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserPhotoRedux,
  saveUserInfoRedux,
  selectUser,
} from "@/store/userSlice";
import type { EditProfileDTO } from "@/types/dtoTypes";
import { formatarCPF, formatarTelefone } from "@/utils/masks";
import * as yup from "yup";
import { PersonalInfosContainer } from "./style";
import { useListProfileInfos } from "@/hooks/useListProfileInfos";
import { LinearProgress } from "@mui/material";
import { saveTokenAPI } from "@/utils/mainUtils";

const schema = yup
  .object({
    name: yup.string().required("Digite o seu nome!"),
    email: yup.string().email().required("Digite o seu e-mail!"),
    dateBirth: yup.string().nullable(),
    phoneNumber: yup.string().nullable(),
    cpf: yup.string().nullable(),
  })
  .required();
const PersonalInfos = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const listUserInfosQuery = useListProfileInfos();

  const userInfos = listUserInfosQuery.data;
  const isLoading = listUserInfosQuery.isLoading;

  useMemo(() => {
    if (!!userInfos) {
      dispatch(saveUserInfoRedux(userInfos));
    }
  }, [userInfos]);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      cpf: formatarCPF(user.cpf),
      dateBirth: user.dateBirth
        ? dayjs(user.dateBirth).toISOString()
        : null,
      phoneNumber: formatarTelefone(user.phoneNumber),
    },
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: any) => {
    const dto: EditProfileDTO = {
      ...data,
      dateBirth: dayjs(data.dateBirth).toDate(),
      cpf: data.cpf && data.cpf.replace(/\D/g, ""),
      phoneNumber: data.phoneNumber && data.phoneNumber.replace(/\D/g, ""),
      id: user.id,
    };

    console.log(data.dateBirth)

    try {
      const response = await editMembroInfoService(dto);
      saveTokenAPI(response.token.accessToken);
      dispatch(saveUserInfoRedux(response.profile));
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(
    null,
  );

  const handleInputCPFChange = (event: any) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    const maskedValue = formatarCPF(inputValue);
    setValue("cpf", maskedValue);
  };

  const handleInputTelefoneChange = (event: any) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    const maskedValue = formatarTelefone(inputValue);
    setValue("phoneNumber", maskedValue);
  };

  useEffect(() => {
    async function editProfilePicture() {
      if (selectedImage == null) return;
      try {
        const response = await editMembroProfilePicture(
          user.id,
          selectedImage,
        );
        if (!!response) {
          saveTokenAPI(response.token.accessToken);
          dispatch(editUserPhotoRedux(selectedImage));
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (selectedImage) {
      editProfilePicture();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  // Caso do reload da pagina, ainda salvar as infos do usuário
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("cpf", formatarCPF(user.cpf));
      setValue(
        "dateBirth",
        user.dateBirth
          ? dayjs(user.dateBirth).format("YYYY-MM-DD")
          : null,
      );
      setValue("email", user.email);
      setValue("phoneNumber", formatarTelefone(user.phoneNumber));
    }
  }, [user]);

  return (
    <PersonalInfosContainer onSubmit={handleSubmit(onSubmitHandler)}>
      {isLoading ? <LinearProgress /> : false}
      <TextFieldH
        label="Nome"
        type="contained"
        inputProps={{ ...register("name") }}
      />
      <TextFieldH
        label="E-mail"
        type="contained"
        inputProps={{ ...register("email") }}
      />
      <TextFieldH
        label="CPF"
        type="contained"
        inputProps={{
          ...register("cpf"),
          onChange: (e) => handleInputCPFChange(e),
          placeholder: "111.222.333-44",
        }}
      />
      <TextFieldH
        label="Data de nascimento"
        type="contained"
        inputProps={{ ...register("dateBirth"), type: "date" }}
      />
      <TextFieldSelectImageH
        label="Editar foto do perfil"
        setValue={setSelectedImage}
      />
      <TextFieldH
        label="Telefone"
        type="contained"
        inputProps={{
          ...register("phoneNumber"),
          type: "phone",
          placeholder: "(92) 99999-1111",
          onChange: (e) => handleInputTelefoneChange(e),
        }}
      />
      <ButtonH
        containerStyle={{
          width: "90%",
          padding: 0,
          height: "100%",
          alignSelf: "center",
          justifySelf: "center",
        }}
        mode="secondary"
        endIcon={
          <PaperPlaneTilt style={{ marginRight: 16 }} size={24} />
        }
      >
        Atualizar
      </ButtonH>
    </PersonalInfosContainer>
  );
};

export default PersonalInfos;
