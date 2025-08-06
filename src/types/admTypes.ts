export type TipoDoacaoAdm = "dinheiro" | "objeto";
export type TipoDoadoresAdm = "anonimo" | "membro";
export type TipoOcasiaoAdm = "nenhum" | "evento" | "retiro";
export type StatusDoacaoAdm = "pendente" | "finalizado" | "entregue";

export const StatusDoacao = {
  ERROR: "ERROR",
  PENDENTE: "PENDENTE",
  FINALIZADO: "FINALIZADO",
  ENTREGUE: "ENTREGUE",
} as const;

export type StatusDoacao = typeof StatusDoacao[keyof typeof StatusDoacao];
