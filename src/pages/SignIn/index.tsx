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
import { FormContainer, LogoContainer, SignContainer } from "./style";
import { saveTokenAPI } from "@/utils/mainUtils";
import { saveUserInfoRedux } from "@/store/userSlice";
import { useDispatch } from "react-redux";

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
      <Tooltip title="Voltar">
        <IconButton onClick={handleGoBack} className="go_back">
          <CaretLeft size={32} />
        </IconButton>
      </Tooltip>
      <LogoContainer>
        <img src={HallelLogoHD} alt="Logo Hallel" />
      </LogoContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <TitleH size="large" color="white">
          Cadastro
        </TitleH>
        <main>
          <TextFieldH
            inputProps={{
              ...register("name"),
            }}
            type="outlined"
            label="Nome: "
          />
          <TextFieldH
            inputProps={{
              ...register("email"),
            }}
            type="outlined"
            label="E-mail: "
          />
          <TextFieldIconH
            inputContainerStyle={{ borderColor: "#FAFAFA" }}
            endIcon={
              showPassword ? (
                <EyeSlash onClick={handleShowPassword} size={24} />
              ) : (
                <Eye onClick={handleShowPassword} size={24} />
              )
            }
            type="outlined"
            label="Senha"
            inputProps={{
              ...register("password"),
              type: showPassword ? "text" : "password"
            }}
          />
          <TextFieldIconH
            inputContainerStyle={{ borderColor: "#FAFAFA" }}
            endIcon={
              showPassword ? (
                <EyeSlash onClick={handleShowConfirmPassword} size={24} />
              ) : (
                <Eye onClick={handleShowConfirmPassword} size={24} />
              )
            }
            type="outlined"
            label="Confirmar senha"
            inputProps={{
              ...register("confirmPassword"),
              type: showConfirmPassword ? "text" : "password"
            }}
          />
          {/* <section>
            <FormControlLabel control={<Checkbox sx={{color: "#FAFAFA"}}/>} label="Lembre-me"/>
            <LinkH to='/'>Esqueceu a senha?</LinkH>
          </section> */}
          <ButtonH
            containerStyle={{
              width: "80%",
              justifySelf: "center",
              marginTop: "2rem",
            }}
            buttonProps={{ type: "submit" }}
            mode="success"
          >
            Continuar
          </ButtonH>
        </main>
        <footer>
          <label>
            * Ao continuar, você aceita nossos{" "}
            <LinkH to="/">
              Termos de condições e Política de privacidade.
            </LinkH>
          </label>
        </footer>
      </FormContainer>
    </SignContainer>
  );
};

export default SignIn;
