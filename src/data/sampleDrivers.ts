
import { Driver } from "@/components/driver-form/types";

// Enhanced sample data for drivers with more varied entries
export const sampleDrivers: Driver[] = [
  {
    id: 1,
    fullName: "Folajimi Mathew",
    phoneNumber: "08162444568",
    route: "Lagos",
    plateNumber: "IKJ - 672 - JUG - 736",
    registrationNumber: "368367362782627",
    parkRegistrationNumber: "PRK-2023-001",
    nin: "12345678901",
    carModel: "Toyota Hiace 2019",
    driversLicense: "DL-567890123.pdf",
    totalRevenue: {
      monthly: 345000,
      daily: [12000, 15000, 11000, 14000, 18000, 9000, 8000],
      yearly: 4150000,
    },
    totalTrips: {
      monthly: 45,
      weekly: 12,
      yearly: 530,
    },
    turnNumber: 1,
    monthlyDue: {
      current: 25000,
      history: [
        { month: "January", amount: 25000 },
        { month: "February", amount: 25000 },
        { month: "March", amount: 25000 },
        { month: "April", amount: 25000 },
      ]
    }
  },
  {
    id: 2,
    fullName: "Samuel Adeyemi",
    phoneNumber: "09023456789",
    route: "Lagos",
    plateNumber: "LND - 345 - XYZ - 901",
    registrationNumber: "567890123456789",
    parkRegistrationNumber: "PRK-2023-002",
    nin: "23456789012",
    carModel: "Toyota Coaster 2020",
    driversLicense: "DL-678901234.pdf",
    totalRevenue: {
      monthly: 280000,
      daily: [9000, 12000, 10000, 11000, 13000, 8000, 7000],
      yearly: 3360000,
    },
    totalTrips: {
      monthly: 38,
      weekly: 10,
      yearly: 456,
    },
    turnNumber: 2,
    monthlyDue: {
      current: 25000,
      history: [
        { month: "January", amount: 25000 },
        { month: "February", amount: 25000 },
        { month: "March", amount: 25000 },
        { month: "April", amount: 25000 },
      ]
    }
  },
  {
    id: 3,
    fullName: "Chioma Okonkwo",
    phoneNumber: "07034567890",
    route: "Abuja",
    plateNumber: "KJA - 234 - ABC - 567",
    registrationNumber: "123456789012345",
    parkRegistrationNumber: "PRK-2023-003",
    nin: "34567890123",
    carModel: "Mercedes Sprinter 2018",
    driversLicense: "DL-789012345.pdf",
    totalRevenue: {
      monthly: 310000,
      daily: [10500, 13000, 12000, 12500, 14000, 9500, 8500],
      yearly: 3720000,
    },
    totalTrips: {
      monthly: 42,
      weekly: 11,
      yearly: 504,
    },
    turnNumber: 3,
    monthlyDue: {
      current: 25000,
      history: [
        { month: "January", amount: 25000 },
        { month: "February", amount: 25000 },
        { month: "March", amount: 25000 },
        { month: "April", amount: 25000 },
      ]
    }
  },
  {
    id: 4,
    fullName: "Ibrahim Mohammed",
    phoneNumber: "08098765432",
    route: "Ibadan",
    plateNumber: "ABC - 123 - DEF - 456",
    registrationNumber: "987654321098765",
    parkRegistrationNumber: "PRK-2023-004",
    nin: "45678901234",
    carModel: "Nissan Civilian 2021",
    driversLicense: "DL-890123456.pdf",
    totalRevenue: {
      monthly: 290000,
      daily: [9500, 12500, 10500, 11500, 13500, 8500, 7500],
      yearly: 3480000,
    },
    totalTrips: {
      monthly: 40,
      weekly: 10,
      yearly: 480,
    },
    turnNumber: 4,
    monthlyDue: {
      current: 25000,
      history: [
        { month: "January", amount: 25000 },
        { month: "February", amount: 25000 },
        { month: "March", amount: 25000 },
        { month: "April", amount: 25000 },
      ]
    }
  },
  {
    id: 5,
    fullName: "Blessing Okafor",
    phoneNumber: "09087654321",
    route: "Lagos",
    plateNumber: "BEN - 456 - LGA - 789",
    registrationNumber: "135792468024680",
    parkRegistrationNumber: "PRK-2023-005",
    nin: "56789012345",
    carModel: "Toyota Hiace 2020",
    driversLicense: "DL-901234567.pdf",
    totalRevenue: {
      monthly: 320000,
      daily: [11000, 14000, 12000, 13000, 15000, 9000, 8000],
      yearly: 3840000,
    },
    totalTrips: {
      monthly: 44,
      weekly: 11,
      yearly: 528,
    },
    turnNumber: 5,
    monthlyDue: {
      current: 25000,
      history: [
        { month: "January", amount: 25000 },
        { month: "February", amount: 25000 },
        { month: "March", amount: 25000 },
        { month: "April", amount: 25000 },
      ]
    }
  }
];
