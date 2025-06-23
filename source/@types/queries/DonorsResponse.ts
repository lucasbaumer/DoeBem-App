export interface Donor {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  dateOfBirth: string;
}

export type DonorsResponse = Donor[];