import type { ListDoacaoDTO } from "./admDTOTypes";

export interface ReduxUser {
  id: string;
  name: string;
  email: string;
  fileImageUrl: string;
  cpf: string;
  dateBirth: string;
  phoneNumber: string;
}

export interface ReduxAdmDonation {
  selectedDonation: ListDoacaoDTO;
}

export interface ReduxStore {
  user: ReduxUser;
  adm_donation: ReduxAdmDonation;
}
