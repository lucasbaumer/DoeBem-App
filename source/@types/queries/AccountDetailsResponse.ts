export interface AccountDetailsResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  dateOfBirth: string;
  role: "Donor" | "Admin";
}