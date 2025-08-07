import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, Tooltip } from "@mui/material";
import { getUserInfosByTokenService, signInService } from "@/api/main/mainAPI";
import ButtonH from "@/components/ButtonH";
import LinkH from "@/components/LinkH";
import TextFieldH from "@/components/TextFieldH";
import TextFieldIconH from "@/components/TextFieldH/TextFieldIconH";
import TitleH from "@/components/TitleH";
import { useSnackbar } from "notistack";
import { CaretLeft, Eye, EyeSlash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { SignInDTO } from "@/types/dtoTypes";
import * as yup from "yup";
import HallelLogoHD from "../../assets/logoHallelHD.png";
import { FormContainer, SignContainer } from "./style";
import { saveTokenAPI } from "@/utils/mainUtils";
import { saveUserInfoRedux } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { H1, H3, Label, Text } from "@/Typografies";
import DividerWithText from "@/components/DividerWIthText/DividerWithText";

const schema = yup.object({
  name: yup.string().required("Digite o seu nome!").trim(),
  email: yup
    .string()
    .email("Digite um e-mail válido!")
    .required("Digite um e-mail!").trim(),
  password: yup.string().required("Digite uma senha!").trim(),
  confirmPassword: yup.string().required("Confirme a sua senha!").trim(),
}).required();

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInDTO>({ resolver: yupResolver(schema) });
  const navigator = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigator(-1);
  };

  const handleShowPassword = () => { setShowPassword(!showPassword) };

  const handleShowConfirmPassword = () => { setShowConfirmPassword(!showConfirmPassword) };

  const onSubmit = async (data: SignInDTO) => {
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Senhas incompatíveis!", { variant: "error" })
      return
    }
    try {
      const response = await signInService(data)
      const token = response.accessToken
      saveTokenAPI(token);
      const responseUser = await getUserInfosByTokenService(response.accessToken);
      dispatch(saveUserInfoRedux(responseUser));
      enqueueSnackbar("Cadastro realizado com sucesso!", {variant: "success"})
      navigator("/");
    } catch (error) {
      console.error("Can't sign in", error)
      enqueueSnackbar("Erro: Não foi possivel realizar o cadastro", {variant: "error"})
    }
  }

  useEffect(() => {
    Object.values(errors).map((item) => {
      enqueueSnackbar(item.message, { variant: "error" })
    })
  }, [errors])


  return (
    <SignContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <H1>Cadastrar</H1>
        <H3>Crie a sua conta</H3>
        <DividerWithText text="Cadastre as suas informações" />
        <main>
          <TextFieldH
            inputProps={{
              ...register("name"),
            }}
            type="contained"
            label="Nome: "
          />
          <TextFieldH
            inputProps={{
              ...register("email"),
            }}
            type="contained"
            label="E-mail: "
          />
          <TextFieldIconH
            inputContainerStyle={{
              borderColor: "${({theme}) => theme.mainColors.border}",
            }}
            endIcon={
              showPassword ? (
                <EyeSlash onClick={handleShowPassword} size={24} />
              ) : (
                <Eye onClick={handleShowPassword} size={24} />
              )
            }
            type="contained"
            label="Senha: "
            inputProps={{
              ...register("password"),
              type: showPassword ? "text" : "password",
            }}
          />
          <TextFieldIconH
            inputContainerStyle={{
              borderColor: "${({theme}) => theme.mainColors.border}",
            }}
            endIcon={
              showPassword ? (
                <EyeSlash onClick={handleShowPassword} size={24} />
              ) : (
                <Eye onClick={handleShowPassword} size={24} />
              )
            }
            type="contained"
            label="Confirmar senha: "
            inputProps={{
              ...register("confirmPassword"),
              type: showPassword ? "text" : "password",
            }}
          />
          <section>
            <div className="rigth">
              <Label>Esqueceu a senha?</Label>
            </div>
          </section>
        </main>
        <footer>
          <ButtonH mode="success">Criar conta</ButtonH>
          <ButtonH mode="transparent" buttonProps={{type: "button", onClick: () => navigator("/")}}  >Voltar</ButtonH> 
        </footer>
      </FormContainer>
    </SignContainer>
  );
};

export default SignIn;
