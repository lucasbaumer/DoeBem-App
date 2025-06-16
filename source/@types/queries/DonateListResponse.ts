export interface Doacao {
  id: string;
  valor: number;
  data: string;
  idDoador: string;
  nomeDoador: string;
  idHospital: string;
  nomeHospital: string;
}

export interface DoadorComDoacoes {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  phone: string;
  dataNascimento: string;
  doacoes: Doacao[];
}

export type DonateListResponse = DoadorComDoacoes[];
