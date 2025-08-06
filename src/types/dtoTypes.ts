import type { LocalEvento } from "./hallelTypes";
import type { ReduxUser } from "./reduxTypes";

export interface SignInDTO {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface SignUpDTO {
  email: string;
  password: string;
}

export interface EditProfileDTO extends ReduxUser {
  image?: string;
}

export interface ListEventsDTO {
  id: string;
  title: string;
  date: string;
  local_event_name: string;
  local_event_longitude: number;
  local_event_latitude: number;
  image_url: string;
}

export interface ListSorteadosDTO {
  image: string;
  nome: string;
  nomePremio: string;
}

export interface EventDTO {
  id: string;
  associadoParcipando: null;
  descricao: string;
  quantidadeMembros: number;
  maxMembros: number;
  titulo: string;
  integrantes: null;
  membroMarketing: null;
  administrador: null;
  date: string;
  localEvento?: LocalEvento;
  horario: string;
  imagem: string | null;
  participantesEspeciais: null;
  destaque: boolean;
  palestrantes: string[];
  pagamentoEntradaEventos: null;
  doacaoDinheiroEventos: null;
  doacaoObjetosEventos: null;
  valorDoEvento: null;
  valorDescontoAssociado: null;
  valorDescontoMembro: null;
  banner?: string | null;
}

export interface UserProfileInfos{
  id: string,
  name: string,
  email: string,
  phoneNumber: string,
  dateBirth: Date,
  fileImageUrl: string,
  cpf: string,
  date_view: string,
  last_access: string
}