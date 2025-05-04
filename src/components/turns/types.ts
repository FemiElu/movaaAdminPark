
import { Driver } from "../driver-form/types";

export interface Turn {
  id: string;
  driverId: string;
  driverName: string;
  phoneNumber: string;
  route: string;
  departureDate: string;
  departureTime: string;
  turnNumber: string | number;
  numberOfPassengers: number;
}

export interface TurnFormData {
  driverId: string;
  route: string;
  departureDate: Date;
  departureTime: string;
  numberOfPassengers: number;
}

export interface RouteGroup {
  route: string;
  turns: Turn[];
}
