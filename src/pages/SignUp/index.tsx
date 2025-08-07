import { yupResolver } from "@hookform/resolvers/yup";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  getUserInfosByTokenService,
  signUpService,
} from "@/api/main/mainAPI";
import ButtonH from "@/components/ButtonH";
import LinkH from "@/components/LinkH";
import TextFieldH from "@/components/TextFieldH";
import TextFieldIconH from "@/components/TextFieldH/TextFieldIconH";
import TitleH from "@/components/TitleH";
import { useSnackbar } from "notistack";
import { FormContainer, SignContainer } from "@/pages/SignIn/style";
import { Eye, EyeSlash, House } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUserInfoRedux } from "@/store/userSlice";
import type { SignUpDTO } from "@/types/dtoTypes";
import { saveTokenAPI } from "@/utils/mainUtils";
import * as yup from "yup";
import HallelLogoHD from "../../assets/logoHallelHD.png";
import { H1, H3, Label, Text } from "@/Typografies";
import DividerWithText from "@/components/DividerWIthText/DividerWithText";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Digite um e-mail válido!")
      .required("Digite um e-mail!")
      .trim(),
    password: yup.string().required("Digite a tua senha!").trim(),
  })
  .required();

const SignUp = () => {
  const navigator = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDTO>({ resolver: yupResolver(schema) });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoBack = () => {
    navigator("/");
  };

  const onSubmit = async (data: SignUpDTO) => {
    try {
      const response = await signUpService(data);
      saveTokenAPI(response.accessToken);
      const responseUser = await getUserInfosByTokenService(
        response.accessToken,
      );
      dispatch(saveUserInfoRedux(responseUser));
      enqueueSnackbar("Login realizado com sucesso!", {
        variant: "success",
      });
      navigator("/");
    } catch (error: any) {
      console.error("Can't sing up");
      enqueueSnackbar("Não foi possivel entrar, tente novamente!", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    Object.values(errors).map((item) => {
      enqueueSnackbar(item.message, { variant: "error" });
    });
  }, [errors]);

  return (
    <SignContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <H1>Login</H1>
        <H3>Bem vindo de volta</H3>
        <DividerWithText text="Entre com as suas informações" />
        <main>
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
            label="Senha"
            inputProps={{
              ...register("password"),
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
          <ButtonH mode="success">Entrar</ButtonH>
          <ButtonH mode="transparent" buttonProps={{type: "button", onClick: () => navigator("/")}}  >Voltar</ButtonH> 
          <Text>Não possui uma conta? <span>Cadastre-se aqui</span></Text>
        </footer>
      </FormContainer>
    </SignContainer>
  );
};

export default SignUp;
