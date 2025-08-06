import { StatusDoacao } from "./admTypes";
import type { LocalEvento } from "./hallelTypes";

export interface LoginAdmDTO {
  email: string;
  senha: string;
}

export interface ListEventsAdmDTO {
  id: string;
  titulo: string;
  descricao: string;
  date: Date;
  fileImageUrl: string;
  banner: string;
  localEvento: LocalEvento;
  destaque: boolean;
  horario: string;
  palestrantes: string[];
  valorDoEvento: number;
  ministeriosAssociados: string[];
  escalasMinisterioIds: string[];
}

export interface LocationMapType {
  lat?: number;
  lng?: number;
}

export interface AddEditEventAdmDTO {
  titulo: string;
  descricao: string;
  date: Date;
  localEvento: LocalEvento;
  destaque: boolean;
  valorDoEvento?: string;
  ministeriosAssociados?: string[];
}

export interface MembroResponseListDTO {
  id: string;
  nome: string;
  email: string;
  imagem: string;
}

export interface DoacaoObjetoDTO {
  nameObject: string;
  quantidade: number;
}

export interface CriarEditarDoacaoDTO {
  isAnonimo?: boolean;
  idDonator?: string;
  nameDonator?: string;
  telefoneDonator?: string;
  emailDonator?: string;
  valor?: number;
  date?: Date;
  dateEntregue?: Date;
  isObjeto?: boolean;
  nameObjeto?: string;
  status?: StatusDoacao;
  idEvento?: string;
  idRetiro?: string;
}

export interface ListDoacaoDTO {
  id: string;
  idDonator: string;
  nameDonator: string;
  telefoneDonator: string;
  emailDonator: string;
  valor: number;
  date: Date;
  dateEntregue: Date;
  nameObjeto: string;
  status: StatusDoacao;
  idEvento: string;
  idRetiro: string;
  objeto: boolean;
  anonimo: boolean;
}

export interface MembroResponse {
  id: string;
  nome: string;
  email: string;
  statusMembro: string;
  roles: string[];
  idade: number;
  imagem: string;
}

export interface ListMinisterioRawDTO {
  id: string;
  nome: string;
  coordenadorId: string;
  viceCoordenadorId: string;
  descricao: string;
  imagem: string;
  objetivos: string[];
}

export interface ListMinisterioRawV2DTO {
  id: string;
  nome: string;
  coordenadorId: string;
  viceCoordenadorId: string;
  descricao: string;
  fileImageUrl: string;
  objetivos: string[];
  hasRepertorio: boolean;
  hasMusic: boolean;
  hasDance: boolean;
}

export interface ListMinisterioDTO {
  id: string;
  nome: string;
  coordenador: MembroResponse;
  viceCoordenador: MembroResponse;
  descricao: string;
  fileImageUrl: string;
  objetivos: string[];
}

export interface ListMembroMinisterioDTO {
  id: string;
  membro: {
    id: string;
    nome: string;
    email: string;
    statusMembro: "ATIVO" | "INATIVO";
    roles: {
      id: string;
      name: string;
    }[];
    idade: number;
    imagem: string;
  };
  ministerio: {
    id: string;
    nome: string;
    coordenadorId: string;
    viceCoordenadorId: string;
    descricao: string;
    fileImageUrl: string;
    objetivos: string[];
  };
  funcaoMinisterio: {
    id: string;
    ministerioId: string;
    nome: string;
    descricao: string;
    icone: string;
    cor: string;
  }[];
}

export interface MinisterioAdmDTO {
  nome: string;
  descricao: string;
  imagem: string;
  objetivos: string[];
  coordenadorId: string;
  viceCoordenadorId: string;
}

export interface MinisterioAdmDTOV2 {
  nome: string;
  descricao: string;
  objetivos: string[];
  coordenadorId: string;
  viceCoordenadorId: string;
  hasRepertorio?: boolean;
  hasMusic?: boolean;
  hasDance?: boolean;
}
