import { Request, Response } from "express";
import { ServiceRepository, ServiceUpdateOmitId } from "../interfaces/service";
import { cloudinaryService } from "../services/cloudinary.service";
import { createSlug } from "../lib/create-slug";

export class ServiceController {
  private serviceModel: ServiceRepository;

  constructor(serviceModel: ServiceRepository) {
    this.serviceModel = serviceModel;
  }

  createService = async (req: Request, res: Response) => {
    const { name, description, price } = req.body;
    const file = req.file;
    const newImg = (await cloudinaryService(file?.buffer as Buffer)) as any;
    const slug = createSlug(name);
    const { message, status } = await this.serviceModel.createService({
      description,
      name,
      price: +(+price).toFixed(2),
      img: newImg.url as string,
      slug,
    });
    console.log({ message, status });
    return res.status(status).json({ message });
  };

  getServices = async (_req: Request, res: Response) => {
    const serviceList = await this.serviceModel.getServices();

    res.status(200).json(serviceList);
  };

  deleteService = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { message, status } = await this.serviceModel.deleteService(id);

    res.status(status).json({ message });
  };

  updateService = async (req: Request, res: Response) => {
    const { ...restService } = req.body;
    const { id } = req.params;

    const newPropertiesService: ServiceUpdateOmitId = Object.fromEntries(
      Object.entries(restService).filter(([key, value]) => value !== undefined)
    );
    if (req.files) {
      const file = req.file;

      const imgUrl = (await cloudinaryService(file?.buffer as Buffer)) as any;

      newPropertiesService.img = imgUrl.url as string;
    }
    if (newPropertiesService.name) {
      const slug = createSlug(newPropertiesService.name);
      newPropertiesService.name = slug;
    }

    const { message, status } = await this.serviceModel.updateService({
      id,
      ...newPropertiesService,
    });

    return res.status(status).json({ message });
  };
}
