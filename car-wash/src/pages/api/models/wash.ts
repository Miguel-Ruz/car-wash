export interface Wash {
  id: string;
  clientName: string
  vehicleType: string
  licensePlate: string
  washType: string
  paymentType: string
  status: string;
  createdAt: Date;
  washer?: {
    name: string;
  }
}