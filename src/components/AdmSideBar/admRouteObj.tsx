import { Guitar, HandCoins } from "@phosphor-icons/react";
import { Calendar, House } from "phosphor-react";
import { type ReactNode } from "react";

export interface AdmRouteType {
  title: string;
  description?: string;
  link: string;
  Icon?: ReactNode;
}

export const admRoutesObj: AdmRouteType[] = [
  {
    title: "Inicio",
    link: "/administrador",
    Icon: <House size={32} />,
  },
  {
    title: "Eventos",
    link: "/administrador/eventos",
    description: "Módulo de eventos da comunidade",
    Icon: <Calendar size={32} />,
  },
  {
    title: "Doações",
    link: "/administrador/doacoes",
    description: "Módulo de doações da comunidade",
    Icon: <HandCoins size={32} />,
  },
  {
    title: "Ministérios",
    link: "/administrador/ministerios",
    description: "Módulo de ministerios da comunidade",
    Icon: <Guitar size={32} />,
  },
];
