import { GeneralResponse } from "./response";

export interface ServiceInterface {
  id?: string;
  name: string;
  description: string;
  img: string;
  price: number;
  slug?: string;
}

export interface ServiceRepository {
  createService(service: ServiceInterface): Promise<GeneralResponse>;
  getServices(): Promise<ServiceInterface[]>;
  deleteService(serviceId: string): Promise<GeneralResponse>;
  updateService({ id, ...newService }: ServiceUpdate): Promise<GeneralResponse>;
}

export type ServiceUpdate = {
  id: string;
  name?: string;
  description?: string;
  img?: string;
  price?: number;
  slug?: string;
};
export type ServiceUpdateOmitId = Omit<ServiceUpdate, "id">;
