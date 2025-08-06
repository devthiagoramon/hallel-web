import AdmWrapper from "@/components/AdmWrapper";
import AdmMinisterios from "@/pages/Administrador/AdmMinisterios";
import AdmAdicionarMinisterio from "@/pages/Administrador/AdmMinisterios/AdmAdicionarMinisterio";
import AdmEditarMinisterio from "@/pages/Administrador/AdmMinisterios/AdmEditarMInisterio";
import { Route, Routes } from "react-router-dom";

const AdmMinisterioRoutes = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AdmWrapper>
                            <AdmMinisterios />
                        </AdmWrapper>
                    }
                />
                <Route
                    path="adicionar"
                    element={
                        <AdmWrapper>
                            <AdmAdicionarMinisterio />
                        </AdmWrapper>
                    }
                />
                <Route
                    path="/editar/:idMinisterio"
                    element={
                        <AdmWrapper>
                            <AdmEditarMinisterio />
                        </AdmWrapper>
                    }
                />
            </Routes>
        </>
    );
};

export default AdmMinisterioRoutes;
