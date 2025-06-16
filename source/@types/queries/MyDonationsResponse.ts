export interface MyDonation {
  id: string;
  value: number;
  date: string;
  hospitalId: string;
  hospitalName: string;
}

export interface MyDonationsResponse {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  dateOfBirth: string;
  donations: MyDonation[];
}
