import { listMembrosAdmService } from "@/api/admin/membros/admMembrosAPI";
import { admRoutesObj } from "@/components/AdmSideBar/admRouteObj";
import TitleH from "@/components/TitleH";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardDashboardADM from "./components/CardDashboardADM";
import {
  BodyDashBoardAdmContainer,
  DashboardAdmContainer,
  HeaderDashBoardAdmContainer,
} from "./style";
import { validateTokenAdmin } from "@/api/main/mainAPI";
import { loadTokenAPI } from "@/utils/mainUtils";

const Administrador = () => {
  const navigation = useNavigate();
  useEffect(() => {
    async function verifyTokenADM() {
      try {
        if (!loadTokenAPI()) return;
        const isValid = await validateTokenAdmin(loadTokenAPI()!);
        if (!isValid) {
          navigation("/administrador/signup");
        }
      } catch (error) {
        navigation("/administrador/signup");
      }
    }
    verifyTokenADM();
  }, []);

  return (
    <DashboardAdmContainer>
      <HeaderDashBoardAdmContainer>
        <TitleH color="black" size="medium">
          Bem-vindo ao administrativo da Hallel
        </TitleH>
      </HeaderDashBoardAdmContainer>
      <BodyDashBoardAdmContainer>
        {admRoutesObj.map((route, index) => {
          if (index === 0) {
            return false;
          }
          return (
            <CardDashboardADM
              description={route.description || ""}
              link={route.link}
              title={route.title}
            />
          );
        })}
      </BodyDashBoardAdmContainer>
    </DashboardAdmContainer>
  );
};

export default Administrador;
