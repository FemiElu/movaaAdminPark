
export interface DriverFormData {
  fullName: string;
  phoneNumber: string;
  route: string;
  plateNumber: string;
  registrationNumber: string;
  nin: string;
  carModel: string;
  driversLicense: File | null | string;
  parkRegistrationNumber: string;
  numberOfSeats: string;
}

export interface Driver {
  id: string | number;
  fullName: string;
  phoneNumber: string;
  route: string;
  plateNumber: string;
  registrationNumber: string;
  nin?: string;
  carModel?: string;
  driversLicense?: string | File | null;
  parkRegistrationNumber?: string;
  numberOfSeats?: string;
  totalRevenue?: {
    monthly: number;
    daily: number[];
    yearly: number;
  };
  totalTrips?: {
    monthly: number;
    weekly: number;
    yearly: number;
  };
  turnNumber?: number;
  monthlyDue?: {
    current: number;
    history: { month: string; amount: number }[];
  };
}
