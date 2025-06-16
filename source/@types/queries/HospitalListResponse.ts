export interface Hospital {
  id: string;
  name: string;
  cnes: number;
  state: string;
  city: string;
  phone: string;
  description: string;
}

export type HospitalListResponse = Hospital[];

