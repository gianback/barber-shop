import { pool } from "../../config/mysql";
import { GeneralResponse } from "../../interfaces/response";
import {
  ServiceInterface,
  ServiceUpdate,
  ServiceUpdateOmitId,
} from "../../interfaces/service";

export class ServiceModelMysql {
  static async createService(
    service: ServiceInterface
  ): Promise<GeneralResponse> {
    try {
      await pool.query("INSERT INTO service SET ?", [service]);

      return {
        status: 201,
        message: "Service created",
      };
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY") {
        return {
          status: 400,
          message: `Service ${service.name} already exists`,
        };
      }

      throw new Error("Something went wrong creating the service with MYSQL");
    }
  }

  static async getServices(): Promise<ServiceInterface[]> {
    try {
      const findServices = await pool.query<ServiceInterface[]>(
        "SELECT * FROM service"
      );

      return findServices;
    } catch (error: any) {
      throw new Error(`Error: ${error.sqlMessage}`);
    }
  }

  static async deleteService(serviceId: string): Promise<GeneralResponse> {
    try {
      await pool.query("DELETE FROM services WHERE id = ?", [serviceId]);

      return {
        status: 200,
        message: "Service deleted",
      };
    } catch (error: any) {
      console.log({ error });
      throw new Error(`Error: ${error.sqlMessage}`);
    }
  }

  static async updateService({
    id,
    ...newPost
  }: ServiceUpdate): Promise<GeneralResponse> {
    let queryEntries = "";

    for (let key in newPost) {
      queryEntries += `${key} = ${newPost[key as keyof ServiceUpdateOmitId]}, `;
    }
    queryEntries = queryEntries.slice(0, -2);

    try {
      await pool.query(`UPDATE service SET ${queryEntries} WHERE id = ?`, [id]);

      return {
        status: 200,
        message: "Service updated",
      };
    } catch (error: any) {
      console.log({ error });

      throw new Error(`Error: ${error.sqlMessage}`);
    }
  }
}
