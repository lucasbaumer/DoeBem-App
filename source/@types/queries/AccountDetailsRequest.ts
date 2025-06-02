export interface AccountDetailsRequest {
  append(name: "id", value: string): void;
  append(name: "name", value: string): void;
  append(name: "email", value: string): void;
  append(name: "cpf", value: string): void;
  append(name: "phone", value: string): void;
  append(name: "dateOfBirth", value: string): void;
}
