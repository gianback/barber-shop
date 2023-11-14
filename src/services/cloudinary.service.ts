import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../config/dotenv";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME ?? "",
  api_key: CLOUDINARY_API_KEY ?? "",
  api_secret: CLOUDINARY_API_SECRET ?? "",
});

export const cloudinaryService = async (image: Buffer): Promise<string> => {
  try {
    return new Promise((res, rej) => {
      const theTransformStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (err: any, result: any) => {
          if (err) return rej(err);
          res(result);
        }
      );
      const str = Readable.from(image);
      str.pipe(theTransformStream);
    });
  } catch (error) {
    throw new Error("ERROR CLOUDINARY SERVICE");
  }
};
