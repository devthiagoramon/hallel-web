import {
  signUpService,
  verifyAdminSituationService,
} from "@/api/main/mainAPI";
import CircularLoading from "@/components/Loadings/CircularLoading";
import TitleH from "@/components/TitleH";
import type { SignUpDTO } from "@/types/dtoTypes";
import { H2, Text } from "@/Typografies";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  IconButton,
  LinearProgress,
  TextField,
} from "@mui/material";
import { CheckIcon, CrossIcon } from "@phosphor-icons/react";
import { useSnackbar } from "notistack";
import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { saveTokenAPI } from "@/utils/mainUtils";
import { useSubscription } from "react-stomp-hooks";
import {
  AdmSignUpContainer,
  FormSignUpContainer,
  SignUpAdministratorVerification,
} from "./style";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Digite um email válido!")
      .required("Digite o email!"),
    password: yup.string().required("Digite a senha!"),
  })
  .required();

const AdmSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [verificateAdministrator, setVerificateAdministrator] =
    useState(false);
  const [loadingVerification, setLoadingVerification] =
    useState(false);
  const [successLoading, setSuccessLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [codeVerification, setCodeVerification] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useSubscription(
    `/queue/auth/admin/${codeVerification}`,
    (value) => {
      setVerificateAdministrator(true);
      setLoadingVerification(false);
      if (value) {
        setSuccessLoading(true);
        enqueueSnackbar("Validação concluida, seja bem vindo!", {
          variant: "success",
        });
        setTimeout(() => {
          saveTokenAPI(accessToken);
          navigation("/administrador");
        }, 5000);
      } else {
        setErrorLoading(false);
      }
    },
  );

  const onSubmit = async (data: SignUpDTO) => {
    try {
      const response = await signUpService(data);
      const verifyAdminSituation = await verifyAdminSituationService(
        response.accessToken,
      );
      if (!verifyAdminSituation) {
        enqueueSnackbar("E-mail ou senha incorretas!", {
          variant: "error",
        });
        return;
      }
      setCodeVerification(verifyAdminSituation.code);
      setVerificateAdministrator(true);
      setAccessToken(response.accessToken);
      setLoadingVerification(true);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("E-mail ou senha incorretas!", {
        variant: "error",
      });
    }
  };

  const statusLoadingVerification = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loadingVerification && (
          <LinearProgress sx={{width: "100%"}} variant="indeterminate" color="primary" />
        )}
        {successLoading && <CheckIcon color="#66BB6A" size={48} />}
        {errorLoading && <CrossIcon color="#F44336" size={48} />}
      </div>
    );
  };

  return (
    <AdmSignUpContainer>
      {verificateAdministrator ? (
        <SignUpAdministratorVerification>
          <H2>Verificação</H2>
          <Text>
            Mandamos um e-mail para você, clique no link que enviamos
            para verificar a sua identidade como administrador
          </Text>
          {statusLoadingVerification()}
        </SignUpAdministratorVerification>
      ) : (
        <FormSignUpContainer onSubmit={handleSubmit(onSubmit)}>
          <TitleH color="black" size="medium">
            Administrador - Login
          </TitleH>
          <TextField
            label="E-mail"
            inputProps={{ ...register("email") }}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            label="Senha"
            inputProps={{ ...register("password") }}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </IconButton>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </FormSignUpContainer>
      )}
    </AdmSignUpContainer>
  );
};

export default AdmSignUp;
