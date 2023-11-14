import { Request, Response } from "express";
import { ServiceRepository, ServiceUpdateOmitId } from "../interfaces/service";
import { cloudinaryService } from "../services/cloudinary.service";
import { UploadedFile } from "express-fileupload";

export class ServiceController {
  private serviceModel: ServiceRepository;

  constructor(serviceModel: ServiceRepository) {
    this.serviceModel = serviceModel;
  }

  createService = async (req: Request, res: Response) => {
    const { name, description, price } = req.body;
    const file = req.files && (req.files.file as UploadedFile);
    const buffer = file && Buffer.from(file.data);
    const img = await cloudinaryService(buffer as Buffer);

    const { message, status } = await this.serviceModel.createService({
      description,
      name,
      price,
      img,
    });

    res.status(status).json({ message });
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
      const file = req.files.file as UploadedFile;
      const buffer = file && Buffer.from(file.data);
      const imgUrl = await cloudinaryService(buffer as Buffer);

      newPropertiesService.img = imgUrl;
    }

    const { message, status } = await this.serviceModel.updateService({
      id,
      ...newPropertiesService,
    });

    return res.status(status).json({ message });
  };
}
